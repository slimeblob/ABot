console.log(`Node ${process.version}!`)
const fs = require("fs");
const ms = require("ms");
const express = require("express");
const app = express();
const PREFIX = ";";
const db = require("quick.db")
const Discord = new require("discord.js");
const secrets = require("./secrets.json");//bru doesnt care 
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

client.commands = new Discord.Collection();
client.db = require("discord.js");
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./Commands");

["Command"].forEach(handler => {
  require(`./Structures/${handler}`)(client);
});

client.once('ready', () => {
  console.log(`${client.user.tag} is ready`)
})

client.on('messageCreate', async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(PREFIX)) return;
  if(!message.guild) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));
  if(command) command.run(client, message, args)
})

process.on('unhandledRejection', err => {
  console.log(`Unhandled promise rejection: ${err.message}.`);
  console.log(err);
});

app.get("/", (req, res) => {
	res.send("System is currently online!");//uwu no uwu me
});
app.listen(3000, () => {
	console.log("Server Started!");
});

client.login(secrets.discord.bottoken)