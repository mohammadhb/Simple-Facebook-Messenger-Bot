'use strict';

const router = require('./router');

try{

    router.start();

}catch(error){

    //Error on Listening
    process.exit(0);
    
}