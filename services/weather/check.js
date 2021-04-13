function check(){

}

function askCity(){

}

function queryCities(city){

}

function getWeather(cityId){

}

module.exports = [
    {
        title:'How\'s the Weather?',
        route:'/weather/askCity',
        nextRoute:'/weather/queryCities',
        previousRoute:'',
        service:askCity,
        hidden:false
    },
    {
        title:'',
        route:'/weather/queryCities',
        nextRoute:'/weather/queryCities',
        previousRoute:'',
        service:queryCities,
        hidden:true
    },
    {
        title:'',
        route:'/weather/queryCities',
        nextRoute:'/weather/selectCity',
        previousRoute:'',
        service:selectCity,
        hidden:true
    },
    {
        title:'',
        route:'/weather/selectCity',
        nextRoute:'/weather/getWeather',
        previousRoute:'',
        service:getWeather,
        hidden:true
    }
]