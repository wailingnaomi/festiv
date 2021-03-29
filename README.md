#  Festiv
![Mockup](https://github.com/Aidan98/Project-Tech/blob/master/Assets/images/mockup.png)

Hi there!

Welcome to our project Festiv. Festiv is a dating app where you can find people based on what kind of music you like. Register an account and log in to start liking (or disliking).

## Features
### Aidan
I built my feature according to the following job story:
> When I use the dating application for the first time, I want to be able to create an account so I can create my profile.

** Topic **
[Link to topic](https://github.com/wailingnaomi/festiv/wiki/%F0%9F%93%B0-Topics/_edit)

### Naomi
> When I am looking for a match, I want to search on interests, so that I get a list of possible matches.

**Topic**
Link to topic wiki

## Install Festiv
### Clone the repo
You can install Festiv either by downloading the ZIP, or alternatively if you prefer cloning it in the CLI; you should run the following code:
### CLI
`git clone https://github.com/wailingnaomi/festiv.git`
### Install dependencies
By running `npm install` in the folder the clone is in you will be able to install all our dependencies.

### Run Festiv
The server will run on port 8000 byusing `npm start`.

### Set up your .env
Set up your .env file for a MongoDB connection, the file should include the following:

```
DB_NAME = <NAME OF YOUR DATABASE>
DB_URL = <THE URL OF YOUR MONGO DATABASE>
DB_USERNAME = <YOUR USERNAME>
DB_PASS = <YOUR_PASSWORD>
SESSION_SECRET= <YOUR SECRET>
```  

## Sources
* Node Js Routes In Separate File Using Express https://xpertphp.com/node-js-routes-in-separate-file-using-express/
* How to write smarter Routing with Express and Node.js https://betterprogramming.pub/how-to-write-smarter-routing-with-express-and-node-js-4cc53bbc55e5
* How to modularize routes with the Express Router https://medium.com/@catherinelau/how-to-modularize-routes-with-the-express-router-5ce46f9bb2bd
* Keeping API routing clean with Express Routers https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
* MongoDB using NOT and AND together https://stackoverflow.com/questions/24092984/mongodb-using-not-and-and-together
* MongoDB Manual: $en https://docs.mongodb.com/manual/reference/operator/query/ne/
* MongoDB Manual: $and https://docs.mongodb.com/manual/reference/operator/query/and/
* Stackoverflow: https://stackoverflow.com/questions/16841323/making-gradient-background-fill-page-with-css/16841457
