const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = "BLUE"
const db = require('quick.db');

module.exports = {
  name: "warnings",
  aliases: [],
  run: async (client, message, args) => {
    
 if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        `❌ You need Manage messages permission to use this command.`
      );
const user = message.mentions.members.first() || message.author;

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

    message.channel.send(`${user} have **${warnings}** warning(s)`);
  }
};
