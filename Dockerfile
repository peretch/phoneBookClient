FROM node:12

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/phone_book_client

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build

# Running the app
EXPOSE 3000
CMD [ "npm", "start" ]