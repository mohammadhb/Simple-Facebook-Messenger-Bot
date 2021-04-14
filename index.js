"use strict";

require("dotenv").config();
const router = require("./router");

try{

  router.start(3000);

}catch(error){

  //Error on Listening
  process.exit(0);
    
}