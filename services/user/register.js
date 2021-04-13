const {sendMessageWithSeenAndTyping} = require('../../requests/index');

async function register(user,previous,next){

    console.log('Register');
    try{
	    await sendMessageWithSeenAndTyping(user.id,"Ok, What's your name?");
    }catch(error){
        console.error(error);
    }
    

}

async function getFirstName(user,previous,next){

    try{
	    await sendMessageWithSeenAndTyping(user.id,"Ok, What's your birthday date?");
    }catch(error){
        console.error(error);
    }

}

async function getBirthday(user,previous,next){

    try{
	    await sendMessageWithSeenAndTyping(user.id,"Done");
    }catch(error){
        console.error(error);
    }

}


module.exports = [
    {
        title:'Register',
        route:'/user/register',
        fallbackRoute:'',
        service:register,
        hidden:true
    },
    {
        title:'Register',
        route:'/user/register/getFirstName',
        next:'/user/register/getBirthday',
        previous:'',
        service:getFirstName,
        hidden:true
    },
    {
        title:'Register',
        route:'/user/register/getBirthday',
        next:'',
        previous:'user/register/getFirstName',
        service:getBirthday,
        hidden:true
    },
]