let redis = require("redis");

const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

let models = {
    user:require('./models/user.model'),
}

class Redis {

    constructor(){

        this._models = {};

    }

    async init(){

        try{
            
            const status = await this.createClient(0),data = await this.createClient(1);
            this._models['user'] = new models.user(status,data);

        }catch(error){

            console.error("An Error has been occured");
            console.error(error);

        }

    }

    addModel(name,model){

        this._models[name]=model;

    }

    get models(){

        return this._models;

    }

    async createClient(dbNum){

        return new Promise((resolve,reject)=>{

            let client = redis.createClient();

            client.select(dbNum,()=>{

                console.log(`Redis started DBNUM=${dbNum}`);
                resolve(client);

            });

            client.on("error", function (error) {

                console.error("Error on Redis Selecting Database : ");
                console.error(error);

                resolve(error);

            }); 

        });
    
    }


}

module.exports = {
    Redis
};
