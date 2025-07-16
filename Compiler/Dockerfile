# Use official Node.js base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first
COPY package*.json ./
ENV PORT=8000
ENV FRONTEND_URL=http://localhost:5173

# Install Node.js dependencies
RUN npm install

# Add compilers and tools
RUN apk update && apk add --no-cache \
    g++ \
    openjdk17 \
    python3 \
    py3-pip

# Copy rest of your app
COPY . .

# Expose the port (if needed — or remove EXPOSE if it's just a worker)
EXPOSE 8000
# Start the app
CMD ["node", "index.js"]
