class Model {

    constructor(statusClient,dataClient){

        this.statusClient = statusClient;
        this.dataClient = dataClient;

        this.status = null;
        this.user = null;

        this.expireTime = 60*60*2;//2h

    }

    get firstname(){
        return this.user.firstname;
    }
    set firstname(value){
        this.user.firstname = value;
    }

    get birthday(){
        return this.user.birthday;
    }
    set birthday(value){
        this.user.birthday = value;
    }

    async setId(value){

        if(value){
            this.user = await this.dataClient.getAsync(value);
            this.status = await this.statusClient.getAsync(value);
        }
        
    }

    // get status(){
    //     return this.messages;
    // }
    // set status(value){
    //     this.status = value;
    // }

}

module.exports = Model;