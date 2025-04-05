# frontend/Dockerfile

# Build stage
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage using Nginx
FROM nginx:alpine

# Copy built assets from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
