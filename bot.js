const { prefix } = require("./config.json");
const { token } = require("./secrets");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const Filter = require("bad-words");
const filter = new Filter();

client.once("ready", () => {
  console.log(new Date());
  console.log("Ready!");
});

client.on("message", (message) => {
  if (filter.isProfane(message.content)) {
    message.reply("Language!");
    return;
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  console.log(message.author.username + ": " + message.content); //log what was said to bot
  const args = message.content.slice(prefix.length).split(/\s+/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (true) {
      reply += `\n the proper usage would be: \'${prefix}${command.name} ${command.usage}`;
    }

    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(token);
