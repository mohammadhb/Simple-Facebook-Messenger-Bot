# Messenger

## A Simple Facebook Bot Messenger

<img alt="Sample demo of The Messenger Bot" src="./example.gif" width="270" height="480">

## Table of Contents

- [Introduction](#introduction)
- [Technical Features](#technical-features)
- [Directory Layout](#directory-layout)
- [Getting Started](#getting-started)
- [Building a Service](#building-a-service)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Tests](#tests)
- [Documents](#documents)

### Introduction:

It's a Service-Based Facebook bot that can be developed easily.

You just need to add your own service and it will be discovered ([Build a Service](#building-a-service)).


### Technical Features:

Here are additional **Key Technical Features** implemented into this project.
- [x] **Repository Pattern :** Implemented a single integrated DAO API that is exposed to serve the different purpose of operating on data.
- [x] **Service Discovery Pattern and Being Service-Based :** This Bot is based on a variety of Services that is Implemented in this platform by default ( e.g. Register, Weather). Also developer can add Any Services with minimum effort by just Adding the config and their service-plugin into the Service section.
- [x] **Caching Data :** For performance purposes, I used Redis to cache the data it became more faster with caching methods ( From 100ms to 4ms On my Personal System )
- [x] **Automatic Database Configuration Selection :** You can select your own Database you just need to change the **DATABASE** variable in **.env** and you're good to go!

## Directory Layout

```
root
├── config              # Configurations
├── constants           # Constant Variables
├── controllers         # Router Controllers
├── repository          # DAO Repository
├── middlewares         # Express middlewares
├── databases           # Database Core
|    |── mongodb        # Mongoose for MongoDB
|    |── postgresql     # Sequelize for Postgresql
|    └── redis          # Redis Client for Caching
├── router              # Routes and Router
|    |──conversation    # Facebook Webhooks routes
|    └── message        # Messages routes
├── requests            # Third party libraries/services
├── services            # Service Discovery and Services
|    |── user           # User Service
|    |── weather        # Weather Service
|    └── example        # An Example Service to be added by you
├── tests               # Tests
└── utils               # Utility and Handy Functions
```

### Getting Started:

To get the project running first start to clone the project and then follow the instructions :

1. install the requirements                                 ([Installation](#installation))
2. Configure the project                                    ([Configuration](#configuration))
3. Integrate and Develop any Services you need*             ([Building a Service](#building-a-service))
4. Run the Project                                          ([Usage](#usage))
5. For any more information about End-Points Checkout here* ([Documents](#documents))

*Optional Instruction

### Building a Service:

You can build a service following by these steps:
> On this example we are just saying a `Hello!` and `Bye!!` to a `Registred` user

1. Create a folder in `services` in the `root` of the project (e.g. `example-service`)
2. Create your services in each seperate file (e.g. `subservice1.js`,`subservice2.js`) we will call it `subservice.js` for the sake of example and `subservice.js` and import your library and write ur services like below :

Sub-Service function params

```javascript
function(
  user,// instance of "User" model in database models
  message,// message sent by user
  quick_response,//response of quick reply sent by user (is "null" if doesn't exist)
  routes,//routes that defined in the sub-service export array
  returnToManager//returns to Service Manager for further processes
){
  //Process the message & quick_response
  //Update user state to be proceed [Required to be Proceed]
  //Call the returnToManager to get back to Service Manager Immidiately
  //etc.
}
```

subservice.js

```javascript
const { User } = require("../../repository");
const {
  messenger: { sendMessageWithSeenAndTyping },
  //Add your request to third-party services here like -> example: { exampleRequest }
} = require("../../requests");

async function sayHello(user, message, quick_response, routes, returnToManager) {
  const userRepository = new User(user);
  try {
    // make your calls to the requests here like -> await exampleRequest();
    await sendMessageWithSeenAndTyping(user.sender_id, "Hello!");
    await userRepository.updateState(routes.next); // Update the user state and set it the next route so the user can proceed.
  } catch (error) {
    //Error of the messenger and Databases
  }
}

async function sayBye(user, message, quick_response, routes, returnToManager) {
  const userRepository = new User(user);
  try {
    // make your calls to the requests here like -> await exampleRequest();
    await sendMessageWithSeenAndTyping(user.sender_id, "Where do you live?");
    await userRepository.updateState(routes.next); // Update the user state and set it the next route so the user can proceed.
  } catch (error) {
    //Error of the messenger and Databases
  }
}
```
3. Export your Sub-Services at the end of the file in this format:

```javascript
module.exports = Array(
  {
    title: String,              //Title of your Service
    route: String,              //Current route of the sub-service ( attention: it should not conflict with other routes of other service and sub-services; For best practice you can follow this pattern for your routes -> /SERVICE_NAME/SUB_SERVICE_FUNCTION_NAME)
    routes: {
      previous: String,
      next: String,
      //Add other routes if you need one here ( an empty string means that it will get "automatically" processed if he's registred then will get to the main menu otherwise it will go to the Registration process )
    },
    service: askCity,
    hidden: false,              //To be hide or not in the Main Menu
  },
  //Add other sub-services if needed here
);
```
4. The final `subservice.js` would be like this:

```javascript
const { User } = require("../../repository");
const {
  messenger: { sendMessageWithSeenAndTyping },
  //Add your request to third-party services here like -> example: { exampleRequest }
} = require("../../requests");

async function sayHello(user, message, quick_response, routes, returnToManager) {
  const userRepository = new User(user);
  try {
    // make your calls to the requests here like -> await exampleRequest();
    await sendMessageWithSeenAndTyping(user.sender_id, "Hello!");
    await userRepository.updateState(routes.next); // Update the user state and set it the next route so the user can proceed.
  } catch (error) {
    //Error of the messenger and Databases
  }
}

async function sayBye(user, message, quick_response, routes, returnToManager) {
  const userRepository = new User(user);
  try {
    // make your calls to the requests here like -> await exampleRequest();
    await sendMessageWithSeenAndTyping(user.sender_id, "Where do you live?");
    await userRepository.updateState(routes.next); // Update the user state and set it the next route so the user can proceed.
  } catch (error) {
    //Error of the messenger and Databases
  }
}
    
module.exports = [
  {
    title: "Say Hello and Bye",
    route: "/weather/sayHello",
    routes: {
      previous: "",
      next: "/weather/sayBye",
    },
    service: sayHello,
    hidden: false,
  },
  {
    title: "",
    route: "/weather/sayBye",
    routes: {
      previous: "/weather/sayHello",
      next: "",
    },
    service: sayBye,
    hidden: true,
  },
];
```

4. Then create a `index.js` file in root of your service directory and require and export all of your subservices in an Array:
```javascript
module.exports=[
  require('./subservice'),
  // require('./subservice1'),
  // require('./subservice2')
]
```

### Installation:

- Install required packages

```shell script
npm i
```

### Configuration

- Copy and modify .env file for Environment Variables

```shell script
cp .env.example .env
```

- Configuration Table in `.env` File :

1. Messenger Configurations

Configuration Key | Title | Description
----------------- | ----- | -----------
`MESSENGER_BOT_VERIFICATION_TOKEN` | Verification token | Messenger bot settings on Facebook when Verifying URL callback
`MESSENGER_BOT_ACCESS_TOKEN` | Access token | Messenger bot settings on Facebook when Generating Access Token

2. Database Configurations

Configuration Key / Category | Title | Description
----------------- | ----- | -----------
**General** | - | -
`DATABASE` | Database Type | You can select either `MONGODB` or `POSTGRESQL` but anything else would endup on `MONGODB`
**Postgresql** | - | -
`POSTGRESQL_DATABASE_NAME` | Database Name | The database you are connecting to
`POSTGRESQL_DATABASE_HOST` | Database Host | The IP or name of the host that database is on it
`POSTGRESQL_DATABASE_PORT` | Database Port | Database Port
`POSTGRESQL_DATABASE_USER` | Database Username | Database Username
`POSTGRESQL_DATABASE_PASS` | Database Password | Database Password
**Postgresql Test Environment** | - | -
`POSTGRESQL_TEST_DATABASE_NAME` | Database Name | The database you are connecting to
`POSTGRESQL_TEST_DATABASE_HOST` | Database Host | The IP or name of the host that database is on it
`POSTGRESQL_TEST_DATABASE_PORT` | Database Port | Database Port
`POSTGRESQL_TEST_DATABASE_USER` | Database Username | Database Username
`POSTGRESQL_TEST_DATABASE_PASS` | Database Password | Database Password
**MongoDB** | - | -
`MONGODB_DATABASE_NAME` | Database Name | The database you are connecting to
`MONGODB_DATABASE_HOST` | Database Host | The IP or name of the host that database is on it
`MONGODB_DATABASE_PORT` | Database Port | Database Port
`MONGODB_DATABASE_USER` | Database Username | Database Username
`MONGODB_DATABASE_PASS` | Database Password | Database Password
**MongoDB Test Environment** | - | -
`MONGODB_TEST_DATABASE_NAME` | Database Name | The database you are connecting to
`MONGODB_TEST_DATABASE_HOST` | Database Host | The IP or name of the host that database is on it
`MONGODB_TEST_DATABASE_PORT` | Database Port | Database Port
`MONGODB_TEST_DATABASE_USER` | Database Username | Database Username
`MONGODB_TEST_DATABASE_PASS` | Database Password | Database Password
**Redis** | - | -
`REDIS_DATABASE_NAME` | Database Name | The database you are connecting to
`REDIS_DATABASE_HOST` | Database Host | The IP or name of the host that database is on it
`REDIS_DATABASE_PORT` | Database Port | Database Port
`REDIS_DATABASE_USER` | Database Username | Database Username
`REDIS_DATABASE_PASS` | Database Password | Database Password
**Redis Test Environment** | - | -
`REDIS_TEST_DATABASE_NAME` | Database Name | The database you are connecting to
`REDIS_TEST_DATABASE_HOST` | Database Host | The IP or name of the host that database is on it
`REDIS_TEST_DATABASE_PORT` | Database Port | Database Port
`REDIS_TEST_DATABASE_USER` | Database Username | Database Username
`REDIS_TEST_DATABASE_PASS` | Database Password | Database Password

3. Router Configurations
Configuration Key / Category | Title | Description
----------------- | ----- | -----------
**Weather** | - | -
`ROUTER_PORT` | Listen Port | Port that router will listen on

4. Service Configurations
Configuration Key / Category | Title | Description
----------------- | ----- | -----------
**Weather** | - | -
`WEATHER_SERVICE_API_KEY` | API Key | API Key of the "Weather" Service
**Service1** | - | -
`SERVICE1_SERVICE_API_KEY` | API Key | API Key of the "Service1" Service
`SERVICE1_SERVICE_EXAMPLE` | Example variable | Example variable of the "Service1" Service

### Usage

- Run the project

```shell script
npm start
```

- For the development purposes

```shell script
npm i -g nodemon
npm run dev
```

- For the deployment purposes

```shell script
docker-compose up -d
```


### Tests

- Run the tests

```shell script
npm test
```

- For coverage run

```shell script
npm run coverage
```

### Documents

- For generate and serve documents

```shell script
npm run doc
```
