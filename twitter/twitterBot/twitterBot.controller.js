const through = require('through')
const chalk = require('chalk')
const utils = require('./twitterBot.utils.js')
// benefits of turning this into a class?
module.exports = function(client){
  return {
    combatRespondedTo: through(function(post){
      let self = this
      let replyToStatusId = post.in_reply_to_status_id || null
      if (replyToStatusId){
        let message = utils.generateOffenderMessage()
        client.post('statuses/update', 
          {
            status: message, 
            in_reply_to_status_id: replyToStatusId
          },  
          function(error, tweet, response) {
            if(error) return console.log(error);
            console.log(chalk.blue("backupBot successfully mobilized", message))
            self.queue(post)
          }
        );
      }
    }),
    dbTheRequester: through(function(post){
      console.log("post", post)
      let self = this
      let replyToScreenName = post.in_reply_to_screen_name || null
      let requester = post.user.screen_name;
      let message = `Hey ${requester}, backUpBot here, thanks for getting in touch and for standing up against hate speech. Remember that hate speech is motivated by fear and misunderstanding. Will get in touch with someone who can help`
      client.post('direct_messages/new', {screen_name: requester, text: message}, function(err, tweet, res){
        if (err) console.log(err);
        console.log(chalk.magenta(`directed messaged ${requester}`))
        self.queue(post)
      })
    })
  }
}
