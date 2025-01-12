import tensorflow as tf
import numpy as np
import os
import cv2

train_dir = 'clothing-dataset-small-master/train/'
test_dir = 'clothing-dataset-small-master/test/'
val_dir = 'clothing-dataset-small-master/validation/'
class_names = ['pants', 't-shirt', 'skirt', 'dress', 'shorts', 'shoes', 'hat', 'longsleeve', 'outwear', 'shirt']
num_classes = len(class_names)
batch_size = 32

# Define a function to load and preprocess an image
def preprocess_image(image_path):
    image = tf.io.read_file(image_path)
    image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.resize(image, (224, 224))
    image = tf.cast(image, tf.float32) / 255.0
    return image

# Define a function to load and preprocess a dataset with one-hot encoded labels
def load_dataset_one_hot(folder):
    data = []
    labels = []
    for i, class_name in enumerate(class_names):
        class_dir = os.path.join(folder, class_name)
        file_names = [os.path.join(class_dir, f) for f in os.listdir(class_dir)]
        labels.extend([tf.one_hot(i, num_classes)] * len(file_names))
        data.extend(file_names)
    dataset = tf.data.Dataset.from_tensor_slices((data, labels))
    dataset = dataset.shuffle(buffer_size=len(data))
    dataset = dataset.map(lambda x, y: (preprocess_image(x), y))
    return dataset

# Load the dataset with one-hot encoded labels
train_dataset = load_dataset_one_hot(train_dir).batch(batch_size=batch_size)
test_dataset = load_dataset_one_hot(test_dir).batch(batch_size=batch_size)
val_dataset = load_dataset_one_hot(val_dir).batch(batch_size=batch_size)

# Load the pre-trained VGG16 model
base_model = tf.keras.applications.VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False

# Add a new classification head to the base model
inputs = tf.keras.Input(shape=(224, 224, 3))
x = base_model(inputs, training=False)
x = tf.keras.layers.GlobalAveragePooling2D()(x)
x = tf.keras.layers.Dense(512, activation='relu')(x)
x = tf.keras.layers.Dropout(0.5)(x)
predictions = tf.keras.layers.Dense(num_classes, activation='softmax')(x)

# Create the new model
model = tf.keras.models.Model(inputs=inputs, outputs=predictions)

# Compile the model with categorical crossentropy loss and Adam optimizer
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train the model with early stopping and learning rate reduction
early_stop = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5)
reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=2)
history = model.fit(train_dataset, epochs=50, validation_data=val_dataset, callbacks=[early_stop, reduce_lr])

# Evaluate the model on the test data
test_loss, test_accuracy = model.evaluate(test_dataset)
print('Test loss:', test_loss)
print('Test accuracy:', test_accuracy)

# Save the trained model to a file
model.save('vgg16Model.h5')
