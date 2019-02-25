FROM node:latest

LABEL author="Adwaitya Sadhukhan"

# Create Directory for the Container
WORKDIR /src


# Copy the files we need to our new Directory
ADD . /src



# Grab dependencies and transpile src directory to dist
RUN npm install 

EXPOSE 8443

# Start the server
ENTRYPOINT ["npm", "start"]
