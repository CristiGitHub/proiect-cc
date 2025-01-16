# Stage 1: Build the Angular application
FROM node:16 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular application source code
COPY . .

# Build the application for production
RUN npm run build --prod

# Stage 2: Serve the Angular application using Nginx
FROM nginx:alpine

# Copy the built application from the builder stage
COPY --from=builder /app/dist/hephasteus-frontend /usr/share/nginx/html

# Copy a custom Nginx configuration if needed
# Uncomment if you have a custom nginx.conf
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port Nginx will use
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]