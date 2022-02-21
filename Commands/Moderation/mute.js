const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'mute',
    aliases: [],
    run: async(client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        `❌ You need Manage messages permission to use this command.`
      );
      const member = message.mentions.members.first();
        let time = args[1];
        const reason = args.slice(2).join(' ');
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')

        if (!member) return message.reply('Who am i gonna mute?');
        if (!time) return message.reply('Say the time!');
        if (!reason) return message.reply('What is the reason?');

        if (member.id === message.author.id) return message.reply('You cant mute your self!')
        if (member.id === client.id) return message.reply('You cant mute me!')

        if (!role) {
            try {
                message.channel.send('No muted role.. making one..!')
                let muterole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        permissions: [],
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send(
                    new MessageEmbed()
                    .setDescription('Muted role has sucessfully been created')
                    .setColor("GREEN")
                )
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (member.roles.cache.has(role2)) return message.reply('User is already muted..')


        await member.roles.add(role2)
        message.channel.send(`${member.user.username} has been muted for ${ms(ms(time))}\nReason: ${reason}`)

        setTimeout(() => {
            member.roles.remove(role2)
        }, ms(time))
    }
}