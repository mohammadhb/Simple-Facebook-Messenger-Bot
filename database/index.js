const {Redis} = require('./redis/index.js');
let redisController = null;

//Router Controller
let start = (config)=>{

    redisController = Redis;

}

module.exports = {
    start,
    redis:redisController,
    
}