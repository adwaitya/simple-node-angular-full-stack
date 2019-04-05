# node-rest-api-sample

This is a boilerplate to build a full stack web application using Angular 7, Node JS, Express JS and MongoDB. It is also configured with tslint, typescript .

- [node-rest-api-sample](#node-rest-api-sample)
  - [Introduction](#introduction)


## Introduction

This is a simple full stack application with a   [Node.js](https://nodejs.org/en/) , [Express](https://expressjs.com/) and mongoDB backend. Client side code is written in Angular 7 and the backend API is written using express. 


# Features 
 1. JWT TOKEN Authentication And Authorization
 2. User can update, delete the profile.
 3. User can create the profile.
 4. User can see the profile details.
 5. Role Base Authorization 

# Rest API
### Sign In
`POST /v1/auth/signin`  


### User Service
Method	Endpoint	Description 
1. `GET	/v1/api/users	Retrieves a list of users`.
2. `POST /v1/api/users/	Create a new user`
3. `Get	/v1/api/users/id	Retrieves a specific user`
4. `PUT	/v1/api/users/	Updates user`
5. `DELETE	/v1/api/users/:id	Deletes user`

### Unit Test 
1. npm test




# Author
Adwaitya Sadhukhan

# License
ISC