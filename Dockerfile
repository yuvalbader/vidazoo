# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the client code to the container
COPY client ./client

# Build the client
RUN npm run build client

# Copy the server code to the container
COPY server ./server

# Build the server
RUN npm run build --prefix server

# Expose port 8080
EXPOSE 8080

# Start the server
CMD ["npm", "start", "--prefix", "server"]
