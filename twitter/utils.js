const data = {
  
}

const through = require('through')

module.exports = exports = {}

// slash off that awkward 0th index 
exports.removeFirst = through(function(data){
  this.queue(data[1])
})

// just for testing - only let through tweets we've published
exports.testingReply = through(function(data){
  if (data.user && data.user.screen_name === 'gotYourBackBot'){
    this.queue(data)
  }
})

// only pass on tweets with hastag - backup
exports.hashTagsOnly = through(function(data){
  let hashTagPresent = 
    data.entities.hashtags && 
    data.entities.hashtags
        .map( ht => ht.text.toLowerCase())
        .includes("backup")
  if (hashTagPresent){
    this.queue(data)
  }
})

exports.parseData = through(function(data){
  let {
    created_at, 
    id, 
    text, 
    user, 
    retweeted_status, 
    in_reply_to_status_id,
    geo,
    entities
  } = data

  let subUser = { name, screen_name, location, description } = user || {}

  retweeted_status = retweeted_status ? {
    id: retweeted_status.id,
    created_at: retweeted_status.created_at,
    text: retweeted_status.text
  } : {}

  Object.assign(subSet, {user: subUser, retweeted_status})
  console.log("subSet", subSet)
})
