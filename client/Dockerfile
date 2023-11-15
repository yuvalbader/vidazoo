
# # Use the official Node.js image
# FROM node:14-alpine

# # Set the working directory
# WORKDIR /Users/test/Documents/Yuval/developer/client

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the React app
# RUN npm run build

# # Set the command to run your production-ready React app
# CMD ["npm", "start"]
# Use the official Node.js image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build
