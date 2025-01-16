# Step 1: Build the application using Maven
FROM --platform=linux/amd64 maven:3.9.0-eclipse-temurin-17 AS builder

# Set the working directory inside the builder container
WORKDIR /app

# Copy only the pom.xml first to leverage the dependency cache
COPY pom.xml .

# Copy the rest of the project files
COPY src ./src

# Package the application (skip tests for faster builds)
RUN mvn clean package -T 1C -DskipTests

# Step 2: Run the application
FROM --platform=linux/amd64 eclipse-temurin:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8086

# Start the application
CMD ["java", "-jar", "app.jar"]
