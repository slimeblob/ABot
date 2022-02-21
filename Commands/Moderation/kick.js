const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    aliases: [],
   run: async(client, message, args) => {
if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.channel.send(
        `❌ You need kick permission to use this command.`
      );

let target = message.mentions.members.first();

    if (!target) {
      return message.channel.send(
        `❌ Please mention the person who you want to kick.`
      );
    }
    if (target.id === message.guild.ownerId) {
      return message.channel.send("❌ You cannot kick the Owner.");
    }
    if (target.id === message.author.id) {
      return message.channel.send(
        `You cannot kick yourself`
      );
    }
     if (target.id === client.user.id) {
      return message.channel.send(`Please Don't Kick Me ;-;`);
     }

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No Reason.";

    const embed = new MessageEmbed()
      .setTitle("KICKED!")
      .setColor("RED")
      .setThumbnail(target.user.displayAvatarURL)
      .setDescription(
        `Reason: ${reason} \nUser: ${target} \nModerator: ${message.member}`
      )
      .setTimestamp();

    message.channel.send({embeds: [embed]});

    target.kick(args[0]);
  },
};