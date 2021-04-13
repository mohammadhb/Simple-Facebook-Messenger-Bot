const 
    user = require('./user'),
    weather = require('./weather');

function router(route){

    const actions = [
        ...user,
        ...weather
    ]

    return actions.find((action)=>action.route==route);

}

function mainService(user){

    //Register before any Actions
    if(!user.firstname || !user.birthday){

        const action = router('/user/register');
        action.service(user,action.previous,action.next)
        //Cache route
        //send to router

    }

    console.log(user)

    //Send to Main Menu
    //send main menu

}



module.exports = mainService;