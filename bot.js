//////////////////////////////////// Constants

const { prefix } = require("./config.json");
const { token } = require("./secrets/token");

const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();

BindCommands();

const Filter = require("bad-words");
const filter = new Filter();

//////////////////////////////////// Events

client.once("ready", Log("Ready!"));

client.on("message", processMessage(message));

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
  var words = message.content.slice(prefix.length).split(/\s+/).toLowerCase();
  return {
    name: words.unshift(),
    args: words,
  };
}

function CheckForBadWords() {
  if (filter.isProfane(message.content)) {
    message.reply("That's a bad word.");
    return;
  }
}

function processMessage(message) {
  CheckForBadWords();

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  Log(`${message.author.username}:${message.content}`);

  const messageCommand = GetMessageCommand(message);

  if (!client.commands.has(messageCommand.name)) return;

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
}

//////////////////////////////////// Connect to Discord

client.login(token);
