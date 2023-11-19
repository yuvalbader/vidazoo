# Use the official Node.js image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 3001

# Set the command to run your Node.js server
CMD ["npm", "start"]