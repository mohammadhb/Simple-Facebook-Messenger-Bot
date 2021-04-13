class Model {

    constructor(statusClient,dataClient,messageClient){

        this.status = null;
        this.user = null;
        this.messages = null;

        this.statusClient = statusClient;
        this.dataClient = dataClient;
        this.messageClient = messageClient;

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

    get messages(){
        return this.messages;
    }
    set messages(value){
        this.user.birthday = value;
    }

    get user(user){

        const userString = JSON.stringify(user);
        return this.dataClient.setAsync(user.id,userString,'EX',this.expireTime);

    }

    set status(user){

        const userString = JSON.stringify(user);
        return this.dataClient.setAsync(user.id,userString,'EX',this.expireTime);

    }

    get status(){
        return this.messages;
    }
    set status(value){
        this.status = value;
    }

    

    

}

module.exports = Model;