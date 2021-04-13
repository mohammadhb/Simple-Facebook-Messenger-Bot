const {Redis} = require('./redis/index.js');
let redisController = null;

let redis = async ()=>{

    if(redisController) {
        return redisController;
    }
    redisController = new Redis();
    await redisController.init();
    return redisController;

}

module.exports = {
    Cacher:redis,
}