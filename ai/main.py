import tensorflow as tf
import numpy as np
import cv2
from minio import Minio
import io
import os
import imghdr
from typing import Dict
import matplotlib.pyplot as plt


import numpy as np
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import sys
# Load the saved model

# arg1 = sys.argv[1]

vgg16_model = tf.keras.models.load_model('vgg16Model.h5')
mobilenet2_model = tf.keras.models.load_model('mobileNetV2Model.h5')
sequential_model = tf.keras.models.load_model('sequentialModel.h5')

# Make predictions on a test set using each model


# Load the image and preprocess it for the model
# image = cv2.imread(arg1)
# image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
# image = cv2.resize(image, (224, 224))
# data = np.array([image]) / 255.0


# Classify the image using the model
class_names = ['pants', 't-shirt', 'skirt', 'dress', 'shorts', 'shoes', 'hat' , 'longsleeve' , 'outwear' ,'shirt']

# print((mobilenet2_predictions))
# print(np.argmax(mobilenet2_predictions))
threshold = 0.6  # Set the probability threshold

def prediction(data):
    vgg16_predictions = vgg16_model.predict(data)
    mobilenet2_predictions = mobilenet2_model.predict(data)
    sequential_predictions = sequential_model.predict(data)
    probabilities = vgg16_predictions + mobilenet2_predictions + sequential_predictions  # Combine the predictions

    mask = probabilities > threshold  # Create a boolean mask for the predictions above the threshold
    filtered_probabilities = probabilities[mask]  # Filter the probabilities based on the mask
    filtered_classes = np.arange(len(class_names))[mask.reshape(-1)]  # Get the indices of the filtered classes
    print(filtered_classes)
    if len(filtered_classes) > 0:
        max_index = np.argmax(filtered_probabilities)
        predicted_class_index = filtered_classes[max_index]
        predicted_class = class_names[predicted_class_index]
        print('The object in the image is a', predicted_class)
        return predicted_class
    else:
        print('No object detected above the probability threshold')
        return



# Load the pre-trained model
vgg16_model = tf.keras.models.load_model('vgg16Model.h5')
mobilenet2_model = tf.keras.models.load_model('mobileNetV2Model.h5')
sequential_model = tf.keras.models.load_model('sequentialModel.h5')

app = FastAPI()
max_size = 1000  # Set the maximum dimension you want for the resized image


minio_client = Minio(
    "localhost:9000",
    access_key="admin",
    secret_key="adminadmin",
    secure=False,
)

bucket_name = "clothes"

def resize_image(image_bytes, max_size):
    image_format = imghdr.what(None, h=image_bytes)  # Determine the image format
    print(image_format)
    print("!!!!!!!!!!!!!!!!!!!!!!!!!")
    if image_format not in ['png', 'jpeg', 'jpg', 'bmp']:
        raise ValueError(f"Unsupported image format: {image_format}. Please use 'png', 'jpeg', 'jpg', or 'bmp'.")

    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_UNCHANGED)

    if image is None:
        raise ValueError("The input image could not be decoded. Please check the image format and content.")

    height, width = image.shape[:2]
    if max(height, width) > max_size:
        scale = max_size / max(height, width)
        new_width, new_height = int(scale * width), int(scale * height)
        resized_image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)
    else:
        resized_image = image

    if image_format == 'jpg':
        image_format = 'jpeg'

    _, buffer = cv2.imencode(f'.{image_format}', resized_image)
    return io.BytesIO(buffer)

# def resize_image(image_bytes, max_size):
#     image_array = np.frombuffer(image_bytes, dtype=np.uint8)
#     image = cv2.imdecode(image_array, cv2.IMREAD_UNCHANGED)
#
#     if image is None:
#         raise ValueError("The input image could not be decoded. Please check the image format and content.")
#
#     height, width = image.shape[:2]
#     if max(height, width) > max_size:
#         scale = max_size / max(height, width)
#         new_width, new_height = int(scale * width), int(scale * height)
#         resized_image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)
#     else:
#         resized_image = image
#
#     _, buffer = cv2.imencode('.png', resized_image)
#     return io.BytesIO(buffer)



def read_image(image: bytes) -> np.ndarray:
    resized_image_bytes = resize_image(image, max_size)
    image = Image.open(resized_image_bytes)
    img = image
    img = np.array(img)  # Convert the PIL.Image object to a NumPy array
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (224, 224))
    data = np.array([img]) / 255.0
    return data

@app.get("/savePhoto/")
async def classify_image(image_url: str, category: str) -> bool:
    try:
        data = minio_client.get_object(bucket_name, image_url)
        content = io.BytesIO(data.read())
        content.seek(0)
        file_extension = os.path.splitext(image_url)[1]
        file_path = f'clothing-dataset-small-master/train/{category}/{image_url}'
        print(file_path)

        with open(file_path, 'wb') as fileoutput:
            fileoutput.write(content.read())
        return True
    except Exception as e:
        return False




@app.get("/classify/")
async def classify_image(image_url: str) -> str:
    data = minio_client.get_object(bucket_name, image_url)
    content = io.BytesIO(data.read())
    content.seek(0)
    img_array = read_image(content.getvalue())
    predictions = prediction(img_array)
    if predictions:
        return predictions
    else:
        return 'empty'

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
