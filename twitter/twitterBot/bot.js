const through = require('through')
const chalk = require('chalk')

module.exports = function(client){
  return {
    combatRespondedTo: through(function(post){
      let self = this
      let replyToStatusId = post.in_reply_to_status_id || null
      let replyToScreenName = post.in_reply_to_screen_name || null
      if (replyToStatusId && replyToScreenName){
        let message = `@${replyToScreenName}, why you gotta hate??`
        client.post('statuses/update', {status: message, in_reply_to_status_id: replyToStatusId},  function(error, tweet, response) {
          if(error) console.log(error);
          // console.log(tweet);  // Tweet body. 
          // console.log(response);  // Raw response object. 
          console.log(chalk.blue("backupBot successfully mobilized", message))
          self.queue(post)
        });
      }
    }),
    dbTheRequester: through(function(post){
      let self = this
      let replyToScreenName = post.in_reply_to_screen_name || null
      let requester = post.user.screen_name;
      let message = `Hey ${requester}, backUpBot here, thanks for getting in touch and helping to stand up for yourself.`
      client.post('direct_messages/new', {screen_name: requester, text: message}, function(err, tweet, res){
        if (err) console.log(err);
        console.log(chalk.magenta(`directed messaged ${requester}`))
        self.queue(post)
      })
    })
  }
}
