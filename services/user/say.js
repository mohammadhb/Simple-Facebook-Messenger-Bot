function sayName(){

}

function sayDaysUntilBirthday(){

}

module.exports = [
  {
    title:"Say My Name!",
    route:"/user/say/name",
    routes: {
      next: "",
    },
    service: sayName,
    hidden: false,
  },
  {
    title:"Say Days Until My Birthday",
    route:"/user/say/daysUntilBirthday",
    routes: {
      next: "",
    },
    service: sayDaysUntilBirthday,
    hidden: false,
  }
];