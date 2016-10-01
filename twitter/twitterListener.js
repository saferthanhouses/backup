const through = require('through')
const emitStream = require('emit-stream')
const chalk = require('chalk')

const targetHashtags = ["backup", "BACKUP", "BackUp", "backUP"]

const startListeners = (client) => {
  console.log(chalk.green("starting listeners"))
  const reqStream = client.stream('statuses/filter', {track: targetHashtags.join(',')});

  reqStream.on('error', function(error) {
    throw error;
  });

  return emitStream(reqStream)
}

module.exports = startListeners