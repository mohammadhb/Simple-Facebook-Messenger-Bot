class Model {

  constructor(statusClient,dataClient){

    this.statusClient = statusClient;
    this.dataClient = dataClient;

    this._status = null;
    this._user = null;

    this.expireTime = 60*60*2;//2h

  }

  get firstname(){
    return this.user.firstname;
  }
  set firstname(value){
        
    if(value){

      if(this.user){
        this.user.firstname = value;
      }else {
        this.user = {
          firstname:value
        };
      }
      
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

    if(value){

      this.id=value;
      this._user = JSON.parse(await this.dataClient.getAsync(value));
      this._status = await this.statusClient.getAsync(value);

    }
        
  }

  get user(){
    return this._user;
  }

  set user(value){
    this._user=value;
  }

  async init(id,user){

    this.id=id;
    this._user=user;

  }

  get status(){
    return this._status;
  }
  set status(value){

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