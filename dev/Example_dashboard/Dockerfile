FROM node:10-alpine
# We use the official image as a parent image.
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# Set the working directory.
WORKDIR /home/node/app
# Copy the file from your host to your current location.
COPY package*.json ./
USER node
# Run the command inside your image filesystem.
RUN npm install
COPY --chown=node:node . .

RUN ./node_modules/.bin/ng build
# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 3000
# Run the specified command within the container.
CMD [ "node", "server.js" ]
