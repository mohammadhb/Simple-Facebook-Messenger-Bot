class Model {

  constructor(statusClient,dataClient){

    this.statusClient = statusClient;
    this.dataClient = dataClient;

    this._status = null;
    this.user = {};

    this.expireTime = 60*60*2;//2h

  }

  get firstname(){
    return this.user.firstname;
  }
  set firstname(value){
        
    if(value){

      console.log("setting user",this.user);

      if(this.user){
        this.user.firstname = value;
      }else {
        this.user = {
          firstname:value
        };
      }

      console.log({
        id:this.id,
        firstname:this.user.firstname,
        ...this.user
      });

      this.dataClient.set(
        this.id,
        JSON.stringify({
          firstname:this.user.firstname,
          ...this.user
        }),
        "EX",
        this.expireTime
      );
    }

  }

  get birthdate(){
    return this.user.birthdate;
  }
  set birthdate(value){
        
    if(value){

      if(this.user){
        this.user.birthday = value;
      }else {
        this.user = {
          birthday:value
        };
      }
      this.dataClient.set(
        this.id,
        JSON.stringify({
          birthday:this.user.birthdate,
          ...this.user
        }),
        "EX",
        this.expireTime
      );
    }

  }

  async setId(value){

    console.log("setId",value);

    if(value){

      this.id=value;
      this.user = JSON.parse(await this.dataClient.getAsync(value));
      this._status = await this.statusClient.getAsync(value);

    }
        
  }

  get status(){
    return this._status;
  }
  set status(value){

    console.log("status",this.id,value);

    this._status = value;
    this.statusClient.set(
      this.id,
      value,
      "EX",
      this.expireTime
    );

  }

}

module.exports = Model;