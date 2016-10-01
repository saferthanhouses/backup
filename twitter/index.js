const twitter = require('twitter')
const startTwitterListener = require('./twitterListener')
const twitConfig = require('../config').twitter
const utils = require('./utils')

const client = new twitter(twitConfig)

const botController = require('./twitterBot')(client)

/* early pipeline
i. start listener for tweets
ii. filter stream to only tweets with backup in hashtags
iii. check that we haven't weighed in on the relevant reply before
iv. check that this might actually be an instance of hatespeech
*/

startTwitterListener(client)
  .pipe(utils.removeFirst)
  .pipe(utils.testingReply)
  .pipe(utils.hashTagsOnly)
  .pipe(utils.parseData)  
  .pipe(utils.dbCheck)
  .pipe(botController.combatRespondedTo)
  .pipe(botController.dbTheRequester)
  .pipe(utils.test)
  // do some checking of the context to acertain whether this is really hate speech

  // then we have a point of contact that we can respond to

  // here is the bot