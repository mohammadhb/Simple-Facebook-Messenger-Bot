class Model {

    constructor(client){

        this.cache = {};

        this.client = client;
        this.expireTime = 60*60*2;//2h

    }

    async readFromCache(key){

        // const data = JSON.stringify(value);
        // return this.client.getAsync(key,data,'EX',this.expireTime);

        return new Promise((
            (resolve)=>{

                let result;

                if(!this.cache[key]){
                    try{
                        result = await this.client.getAsync(key,data,'EX',this.expireTime);
                    }catch(error){
                        throw new Error("Couldn't read from Cache");
                    }
                } else {
                    result = this.cache[key];
                }

                resolve(result)

            },
            (reject)=>{

            }
        ))

    }

    updateCache(key,value){

        this.data[key] = value; 
        const data = JSON.stringify(value);
        return this.client.setAsync(key,data,'EX',this.expireTime);

    }


}

module.exports = Model;