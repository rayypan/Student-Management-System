# Stage 1: Build the application

# Build using Java 21 JDK
# The app uses lower Java version, so this is fine :)
FROM eclipse-temurin:21 AS build

# Switch working dir to /app
WORKDIR /app

# Copy only required stuff
# - Maven wrapper (this runs Maven)
# - This is the list of dependencies for the app
# - The config for Maven itself
# - THe main app code
COPY backend/mvnw    ./
COPY backend/pom.xml ./
COPY backend/.mvn    ./.mvn

RUN chmod +x ./mvnw

# Maven: Download dependencies
# NOTE: Don't copy source before installing dependencies
RUN ./mvnw dependency:go-offline -B

# Maven: Build a JAR from source
# NOTE: Don't copy source before installing dependencies
COPY backend/src ./src
RUN ./mvnw clean package -DskipTests

# -----------------------------------------------------------------------

# Stage 2: Run the application

# Run using Java 21 JRE
# The app uses lower Java version, so this is fine :)
FROM eclipse-temurin:21-jre

# Switch working dir to /app
WORKDIR /app

# Copy built JAR from the "build" stage
COPY --from=build /app/target/*.jar ./app.jar

# Expose the port (Render uses PORT environment variable, so this will be ignored in prod)
EXPOSE 8080

# Run the application
# Use the PORT environment variable that Render provides
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
