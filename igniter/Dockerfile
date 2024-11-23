FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the script into the container
COPY igniter.js ./

# Run the script when the container starts
CMD ["node", "igniter.js"]
