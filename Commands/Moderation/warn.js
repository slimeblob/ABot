const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = "BLUE"
const db = require('quick.db');

module.exports = {
  name: "warn",
  aliases: [],
  run: async (client, message, args) => {
   
   if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        `❌ You need Manage messages permission to use this command.`
      );

        const user = message.mentions.members.first();

        if (!user) {
            return message.channel.send(
                'Please Mention the person to who you want to warn - warn @mention <reason>'
            );
        }

        if (message.mentions.users.first().bot) {
            return message.channel.send('You cannot warn bots');
        }

        const reason = args.slice(1).join(' ');

        if (!reason) {
            return message.channel.send(
                'Please provide reason to warn `-warn @mention <reason>`'
            );
        }

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if (warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(
                `You have been warned in **${message.guild.name}** for ${reason}`
            );
            await message.channel.send(
                `You warned **${
                    message.mentions.users.first().username
                }** for ${reason}`
            );
        } else if (warnings !== null) {
            db.add(`warnings_${message.guild.id}_${user.id}`, 1);

            user.send(
                `You have been warned in **${message.guild.name}** for ${reason}`
            );

            await message.channel.send(
                `You warned **${
                    message.mentions.users.first().username
                }** for ${reason}`
            );

            message.delete;
        }
    }
};