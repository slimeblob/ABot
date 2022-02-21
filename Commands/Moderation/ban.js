const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    aliases: [],
   run: async(client, message, args) => {
if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send(
        `❌ You need ban permission to use this command.`
      );
     const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member)
        return message.channel.send(`❌ Please provide a valid user.`)
        if(member === message.member)
        return message.channel.send(`❌ You cannot ban yourself..`)
     /*   if(member.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send(`You cannot ban someone with an equal or higher role`)*/
 //    let User = message.guild.member(member);
        if(!member.bannable)
        return message.channel.send(`❌ I cannot ban that user`);
        let reason = args.slice(1).join(' ');
        if(!reason) reason = '`None`';
        if(reason.length > 1024) reason = reason.slice(0, 1021) + '...';
        await member.ban({ reason: reason });

        const embed = new MessageEmbed()
        .setTitle('Banned!')
        .setDescription(`${member} was banned!`)
        .addField('**Reason**', `${reason}`)
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('GREEN');

        message.channel.send({ embeds: [embed] })
    }
}