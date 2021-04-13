const 
  user = require("./user"),
  weather = require("./weather");

const cacheUtil = require("../utils/cache");

function router(route){

  const actions = [
    ...user,
    ...weather
  ];

  return actions.find((action)=>action.route==route);

}

async function mainService(user,message){

  const userCache = await cacheUtil.getUserFromCache(user.id);

  console.log(user,message,userCache.status);

  if(userCache.status){

    const action = router(userCache.status);
    return action.service(user,message,action.routes);

  }

  //Register before any Actions
  if(!user.firstname || !user.birthday){

        
    const action = router("/user/register");
    console.log(action);
    return action.service(user,message,action.routes);

  }

  console.log(user);

  //Send to Main Menu
  //send main menu

}



module.exports = mainService;