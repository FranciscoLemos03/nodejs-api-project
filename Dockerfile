# Initialize in alpine that is a reduced version for node 22
FROM node:22-alpine AS builder 

# Create page to execute all the project in one folder
WORKDIR /app

# Copy all the project to the folder except the files/folders on .dockerignore
COPY . ./

# Install every dependency in package-lock
RUN npm ci --only=production

EXPOSE 3333

CMD ["node", "src/server.ts"]