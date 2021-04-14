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

// async function showMainmenu(userCache,message){

//   // console.log("user",user)
//   const actions = [
//     ...user,
//     ...weather
//   ];

//   console.log(actions
//     .filter(action=>!action.hidden)
//     .map(action=>{
//       return {
//         key:action.title,
//         value:action.route
//       };
//     }));

//   await sendMessageWithSeenAndTyping(
//     userCache.id,
//     "Choose what do you want to do now?",
//     actions
//       .filter(action=>!action.hidden)
//       .map(action=>{
//         return {
//           key:action.title,
//           value:action.route
//         };
//       })
//   );

// }

async function mainService(userData,user,message){

  const userCache = await cacheUtil.getUserFromCache(user.id);

  if(userCache.status){

    const action = router(userCache.status);
    return action.service(user,message,action.routes);

  }else{

    const action = router("/user/register");
    return action.service(user,message,action.routes);

  }
  
  //showMainmenu(user,message);

}



module.exports = mainService;