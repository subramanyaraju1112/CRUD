# Stage 1: Build the application
FROM node:18-alpine as builder

# Set the base directory as an environment variable
ENV BASE_DIR /var/applications

# Create the working directory
RUN mkdir -p $BASE_DIR

# Set the working directory
WORKDIR $BASE_DIR

# Copy only package.json and package-lock.json for npm install
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application source code
# COPY . .

##################################################
# Stage 2: Create a smaller production-ready image
FROM node:18-alpine
ARG USER=node

# Set the base directory as an environment variable
ENV BASE_DIR /var/applications

# Create the working directory
# RUN mkdir -p $BASE_DIR

# Set the working directory
WORKDIR $BASE_DIR

# Copy only the built artifacts from the builder stage
COPY --chown=${USER}:${USER} . .
COPY --from=builder --chown=$USER:$USER ${BASE_DIR}/node_modules ${BASE_DIR}/node_modules
# COPY --chown=$USER:$USER . .

# Set the user for running the application
USER node

# Set the NODE_ENV environment variable
# ENV NODE_ENV $NODE_ENV

# Start the application
CMD npm run $NODE_ENV
