FROM node:14

# Create app directory
WORKDIR /app

# Copy package files and install dependencies first (for better caching)
COPY package.json package-lock.json* ./

RUN npm install

# Copy rest of the app source files
COPY . .

# Expose default React port
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
