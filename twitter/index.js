const startTwitterListener = require('./twitterListener')
const utils = require('./utils')


/* early pipeline
i. start listener for tweets
ii. filter listeners to only hashtags
iii. check that we haven't weighed in on the relevant reply before
iv. check that this might actually be an instance of hatespeech
*/

startTwitterListener()
  .pipe(utils.removeFirst)
  .pipe(utils.testingReply)
  .pipe(utils.hashTagsOnly)
  .pipe(utils.parseData)
  





/*
if the startTwitterListener returns a stream, we can pipe these
into small programs that perform computation on the stream
and then use event emitters to trigger 'non-streamy' things ... 
*/

