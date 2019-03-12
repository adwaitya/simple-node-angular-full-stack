A playground for Docker with Express and MongoDB.

# Development
 Cloning the repo
`$ git clone https://github.com/adwaitya/node-restapi-sample.git`
 Installing dependencies
 `$ npm install`
  Running scripts
Action	Usage
Starting development mode	
`npm start`
Linting code
`npm run build`
# Docker
Building an image
`$ docker-compose build`
Running a container 
`$ docker-compose up`
Stopping a container
`$ docker-compose down`
# Features 
 1. JWT TOKEN Authentication And Authorization
 2. User can update, delete the profile.
 3. User can create the profile.
 4. User can see the profile details.

# Rest API
### Sign In
`POST /v1/auth/signin`  


### User Service
Method	Endpoint	Description
`GET	/v1/api/users	Retrieves a list of users`
`POST /v1/api/users/	Create a new user`
`Get	/v1/api/users/id	Retrieves a specific user`
`PUT	/v1/api/users/	Updates user`
`DELETE	/v1/api/users/:id	Deletes user`

# Author
Adwaitya Sadhukhan

# License
ISC