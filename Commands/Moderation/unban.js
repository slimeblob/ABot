const { MessageEmbed } = require('discord.js');
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
    name: 'unban',
    aliases: [],
    run: async(client, message, args) => {
          try {
            if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send(
        `❌ You need BAN permission to use this command.`
      );
              const id = args[0];
              if(!rgx.test(id))
              return message.channel.send(`❌ Please provide a valid user.`)
              const bannedUsers = await message.guild.bans.fetch();
              const user = bannedUsers.get(id).user;
              if(!user)
              return message.channel.send(`❌ Error has occured`)
              let reason = args.slice(1).join(' ');
              if(!reason) reason = '`None`';
              if(!reason.length > 1024) reason = reason.slice(0, 1021) + '...';

              await message.guild.members.unban(user, reason)
              const embed = new MessageEmbed()
              .setTitle('Unbanned!')
              .setDescription(`${user.tag} was unbanned.`)
              .addField('**Reason**', `${reason}`)
              .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
              .setColor('GREEN');
              message.channel.send({ embeds: [embed] })

         } catch (err) {
             console.log(err)
         }
    }
}