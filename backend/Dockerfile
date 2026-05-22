# ── Stage 1: Build ─────────────────────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests -B

# ── Stage 2: Runtime (imagem enxuta para produção/OCI) ─────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app
RUN addgroup -S cispar && adduser -S cispar -G cispar
COPY --from=build /app/target/*.jar app.jar
USER cispar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
