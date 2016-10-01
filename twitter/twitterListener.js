const through = require('through')
const emitStream = require('emit-stream')
const twitter = require('twitter')
const chalk = require('chalk')
const twitConfig = require('../config').twitter
const client = new twitter(twitConfig)
// use request to make http req to twitter streaming
// api and keep connection open.

const targetHashtags = ["backup", "BACKUP", "BackUp", "backUP"]
// possibly have to get a bunch of tweet streams

// track data:
// responds to event.quoted_status 
// event.text


const startListeners = () => {
  console.log(chalk.green("starting listeners"))
  const reqStream = client.stream('statuses/filter', {track: targetHashtags.join(',')});

  // reqStream.on('data', function(event) {
  //   console.log(event)
  // })
  reqStream.on('error', function(error) {
    throw error;
  });
  return emitStream(reqStream)
}

// is how to get the request stream
// const streamingRes = request.get(streamingUrl)

// http.get(...)

// and combine them into one

// const tweetEE = emitStream(streamingRes)


// on data from twitter emit an event from the stream
// use this event to make a response
// const tweetEE.on('data', )

// const getTweetContext = () => {}

// kick everything off here - what interface will we return? 
// a stream? 
// an event emitter?

module.exports = startListeners









/* Notes:
creating an interface with which 
organisations like Global Alert, community leaders and other organisations
can be present at the point of contact

Collecting contextual data -
what contextual data twitter give us? 

Create a response 'pipeline' through which new services can easily be
integrated. 
Input -> */
