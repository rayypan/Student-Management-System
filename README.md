# Student Management System

[Architecture](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=studmansys-api.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1--w-ihbGWe5R9kW6kMTllijR0F8DIggN%26export%3Ddownload)


## Backend

The `application.properties` loads variables from environment. These are to be provided during runtime. In Render, these will be provided in the `Dashboard`. For other platforms, it'll vary, so see docs specific to that platform (e.g. AWS/Heroku/Vercel (if Vercel ever adds support for docker or Spring)).

This app builds using a 2 stage Dockerfile which is apparently supported by Render.
- Stage 1: Compile backend to JAR (done when building the image).
- Stage 2: Start the JAR as an app (happens in the container).

Example of how to run using docker:
```bash
cd backend
docker build -t backend ./
docker run --env-file secrets.env -e PORT=10000 -p 8080:10000 backend
```

## Frontend

The frontend will be built using a Github Actions workflow and then hosted directly to Firebase.

## Warning:

The following needs to be updated:
- Server env: `SERVER_ORIGIN`: once server is deployed
- Server env: `WEBAPP_ORIGIN`: once frontend is deployed
- Frontend: `src/appOrigin.js`: once Firebase hosting URL is obtained.
- Frontend: `src/serverOrigin.js`: once server is deployed and server URL is obtained.

These updates are to be (or have been) automated in the Github Actions workflow.
