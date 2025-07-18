# Stage 1: Build the Spring Boot JAR
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy only backend (Spring Boot) code
COPY server/ .

# Build the Spring Boot JAR
RUN mvn clean package -DskipTests

# Stage 2: Run the built JAR
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
