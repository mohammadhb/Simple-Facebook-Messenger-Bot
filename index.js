"use strict";

require("dotenv").config();

const router = require("./router");
const database = require("./databases");

try{

  database.persistant.start();
  router.start(3000);

}catch(error){

  //Error on Listening
  process.exit(0);
    
}