const reddb = require("../../db.js")
const axios = require("axios")
const Discord = require("discord.js")

module.exports = {
  name: "profile",
  aliases: [],
  run: async(client, message, args) => {

    let userobj = message.mentions.members.first() || message.author;

    let author = message.author; 
      
    reddb.get(userobj.id, async function(err2, out2){
      var user = JSON.parse(out2)
      if (err2){
message.reply("You do not have any data yet.")
      }

      let embed = new Discord.MessageEmbed()
        .setTitle(`Profile of ${userobj.tag}!`)
        .setDescription(`Linked: ${user.linked}\nBanned: ${user.banned}\nRoblox User ID: ${user.linkid}\nProfile URL: https://www.roblox.com/users/${user.linkid}/profile`) 
     // .setFooter("Note: if the Profile URL id undefined, that means the user does not have his account linked.")

      message.reply({ embeds: [embed] })
    
    });
  }
}