# Messenger
## A Simple Facebook Bot Messenger

<img alt="Sample demo of The Messenger Bot" src="./example.gif" width="270" height="480">

### Installation:

- Install required packages
```shell script
npm i
```
- Copy and modify .env file for Environment Variables
```shell script
cp .env.example .env
```

### Configuration
- Put the Access Token in the `MESSENGER_BOT_ACCESS_TOKEN`  in `.env` file
- Put the Verify Token in the `MESSENGER_BOT_VERIFY_TOKEN`  in `.env` file

### Usage

Run the project
```shell script
npm start
```

For the development perposes
```shell script
npm i -g nodemon
npm run dev
```

For the deployment perposes
```shell script
docker-compose up -d
```


### Tests

Run the tests
```shell script
npm test
```

For coverage run
```shell script
npm run coverage
```

### Documents

For generate and serve documents
```shell script
npm run doc
```