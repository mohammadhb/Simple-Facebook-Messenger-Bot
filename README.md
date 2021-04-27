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

1. Database Configurations

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
