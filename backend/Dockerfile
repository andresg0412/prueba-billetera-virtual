FROM node:20

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

# Expose port
EXPOSE 5001
EXPOSE 5002

# Start the application
CMD ["npm", "start"]

