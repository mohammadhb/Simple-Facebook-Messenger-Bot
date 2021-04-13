"use strict";

require("dotenv").config();
const router = require("./router");

try{

  router.start(3000);

}catch(error){

  console.log(error);
  //Error on Listening
  process.exit(0);
    
}