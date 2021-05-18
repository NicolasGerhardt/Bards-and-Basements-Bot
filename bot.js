//////////////////////////////////// Constants

const { prefix } = require("./config.json");
const { token } = require("./secrets/token");

const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();

BindCommands();

//////////////////////////////////// Events

client.once("ready", () => { Log("Ready!~") });

client.on("message", (message) => { processMessage(message) });

//////////////////////////////////// Functions

function BindCommands() {
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }
}

function Log(message) {
  console.log(`${new Date()}:${message}`);
}

function GetMessageCommand(message) {
  var words = message.content.slice(prefix.length).toLowerCase().split(/\s+/);
  return {
    name: words.shift(),
    args: words,
  };
}

function processMessage(message) {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  
  Log(`${message.author.username}:${message.content}`);

  const messageCommand = GetMessageCommand(message);

  if (!client.commands.has(messageCommand.name)) return;

  const command = client.commands.get(messageCommand.name);

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (true) {
      reply += `\n the proper usage would be: \'${prefix}${command.name} ${command.usage}`;
    }

    return message.channel.send(reply);
  }

  try {
    command.execute(message, messageCommand.args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
}

//////////////////////////////////// Connect to Discord

client.login(token);