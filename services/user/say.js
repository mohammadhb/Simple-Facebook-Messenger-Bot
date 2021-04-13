function sayName(){

}

function sayDaysUntilBirthday(){

}

module.exports = [
    {
        title:'Say My Name!',
        route:'/user/name',
        fallbackRoute:'',
        service:sayName,
        hidden:false
    },
    {
        name:'Say Days Until My Birthday',
        route:'/user/daysUntilBirthday',
        fallbackRoute:'',
        service:sayDaysUntilBirthday,
        hidden:false
    }
]