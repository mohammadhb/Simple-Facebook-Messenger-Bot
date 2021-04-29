"use strict";

require("dotenv").config();

const router = require("./router");
const database = require("./databases");

const {
  common: { router_port }
} = require("./config");

async function start(){

  try {
    await database.temporary.start();
    await database.persistant.start();
    router.start(router_port);
  } catch (error) {
    //Error on Listening
    process.exit(0);
  }

}

start();

