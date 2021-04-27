const {
  messenger: { sendMessageWithSeenAndTyping },
} = require("../requests");

const fs = require("fs"),
  path = require("path");

function discoverServices() {
  const services = fs
    .readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file.slice(-3) !== ".js") // Return all the folder in the current folder
    .map((folder) => path.join(__dirname, folder)) // Normilize the service path
    .map((path) => require(path)); // Require the service path

  return services.reduce((prev, curr) => prev.concat(curr), []);
}

function router(route) {
  const services = discoverServices();
  return services.find((service) => service.route == route);
}

function mainmenu(user) {
  try {
    sendMessageWithSeenAndTyping(
      user.sender_id,
      `${user.firstname}, What else i can do for you?`,
      discoverServices()
        .filter((service) => !service.hidden)
        .map((service) => {
          return {
            key: service.title,
            value: service.route,
          };
        })
    );
  } catch (e) {
    console.log(e.response.data);
  }
}

async function serviceManager(user, message, quick_response) {
  if (user.state) {
    const action = router(user.state);
    return action.service(user, message, quick_response, action.routes, serviceManager);
  } else if (!user.firstname) {
    const action = router("/user/register");
    return action.service(user, message, quick_response, action.routes, serviceManager);
  } else if (quick_response) {
    const action = router(quick_response);
    return action.service(user, message, quick_response, action.routes, serviceManager);
  }

  return mainmenu(user);
}

module.exports = serviceManager;