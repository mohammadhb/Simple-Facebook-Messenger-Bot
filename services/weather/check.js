function check(){

}

function askCity(user,previous,next){

}

function queryCities(user,previous,next,{city}){

}

function selectCity(user,previous,next,{city}){

}

function getWeather(user,previous,next,{cityId}){

}

module.exports = [
  {
    title:"How's the Weather?",
    route:"/weather/askCity",
    next:"/weather/queryCities",
    previous:"",
    service:askCity,
    hidden:false
  },
  {
    title:"",
    route:"/weather/queryCities",
    next:"/weather/queryCities",
    previous:"",
    service:queryCities,
    hidden:true
  },
  {
    title:"",
    route:"/weather/queryCities",
    next:"/weather/selectCity",
    previous:"",
    service:selectCity,
    hidden:true
  },
  {
    title:"",
    route:"/weather/selectCity",
    next:"/weather/getWeather",
    previous:"",
    service:getWeather,
    hidden:true
  }
];