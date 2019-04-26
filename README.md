# simple-node-angular-full-stack

This is a boilerplate to build a full stack web application using Angular 7, Node JS, Express JS and MongoDB. It is also configured with tslint, typescript .

- [node-rest-api-sample](#node-rest-api-sample)
  - [Introduction](#introduction)
    - [Development mode](#development-mode)
  - [Quick Start](#quick-start)  
  - [Features](#features)
    - [RestAPI](#restAPI)
    - [UserService](#userService)
  

## Introduction

This is a simple full stack application with a   [Node.js](https://nodejs.org/en/) , [Express](https://expressjs.com/) and mongoDB backend. Client side code is written in Angular 7 and the backend API is written using express. 


### Development mode

In the development mode, we will have 2 servers running. The front end code will be ng served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.


## Quick Start

```bash
# Clone the repository
git clone https://github.com/adwaitya/simple-angular-full-stack

# Go inside the directory
cd simple-angular-full-stack

# Install dependencies for Node Server and Start server
cd node-rest-api
npm i 
npm start

# Start angular client
cd angular-client
npm i 
npm start
```

## Features 
 1. JWT TOKEN Authentication And Authorization
 2. User can update, delete the profile.
 3. User can create the profile.
 4. User can see the profile details.
 5. Role Base Authorization 

### RestAPI
`POST /v1/auth/signin`  


### UserService
Method	Endpoint	Description 
1. `GET	/v1/api/users	Retrieves a list of users`.
2. `POST /v1/api/users/	Create a new user`
3. `Get	/v1/api/users/id	Retrieves a specific user`
4. `PUT	/v1/api/users/	Updates user`
5. `DELETE	/v1/api/users/:id	Deletes user`

## Unit Test 
1. npm test




## Author
Adwaitya Sadhukhan

## License
ISC
