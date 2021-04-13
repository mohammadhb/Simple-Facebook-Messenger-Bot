class Model {

    constructor(statusClient,dataClient,messageClient){

        this.status = null;
        this.user = null;

        this.statusClient = statusClient;
        this.dataClient = dataClient;

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

    get user(user){

        const userString = JSON.stringify(user);
        return this.dataClient.setAsync(user.id,userString,'EX',this.expireTime);

    }

    set status(user){

        const userString = JSON.stringify(user);
        return this.dataClient.setAsync(user.id,userString,'EX',this.expireTime);
        // await this.emailVerificationClient.delAsync(key);

    }

    get status(){
        return this.messages;
    }
    set status(value){
        this.status = value;
    }

}

module.exports = Model;