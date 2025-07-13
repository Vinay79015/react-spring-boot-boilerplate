# Use OpenJDK base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy your JAR file (adjust if needed)
COPY target/*.jar app.jar

# Run the application
CMD ["java", "-jar", "app.jar"]
