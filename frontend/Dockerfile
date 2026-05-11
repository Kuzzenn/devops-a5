# frontend/Dockerfile

FROM node:20-alpine AS build
# 'AS build' names this stage to reference it later
 
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
 
# Build React app > outputs static HTML/CSS/JS to /app/build/
# CI=false prevents React from treating warnings as errors
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN CI=false npm run build
 

# This image does NOT contain Node.js or source code
FROM nginx:alpine
 
# Copy ONLY the built output from Stage 1
COPY --from=build /app/build /usr/share/nginx/html
 
# Copy custom nginx config for React Router 
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

