// designing backend services - architecture? Controller / Factories etc?
// thiking about this through unix design - is the controller exposing api? 
// the factory network calls? utils internal?

const twitterBot = require('./twitterBot.controller.js')

module.exports = (client) => {
  return twitterBot(client)
}