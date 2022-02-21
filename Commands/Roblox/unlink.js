const reddb = require("../../db.js")

module.exports = {
  name: "unlink",
  aliases: [],
  run: async (client, message, args) => {
    reddb.get(message.author.id, function(err,out){

      reddb.set(message.author.id, JSON.stringify({linked: false, banned: false, linkid: 'NONE'}), function(){})
      message.reply("Successfully unlinked your account!")
    })
  }
}