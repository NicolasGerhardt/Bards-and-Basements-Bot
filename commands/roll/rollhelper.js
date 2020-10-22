module.exports = {
  validate(rollString) {
    // RegEx of valid roll string
    const regex = new RegExp(/^\d{0,3}d(\d{1,3}|🥧)$/);

    if (!regex.test(rollString)) {
      throw new Error(`'${rollString}' is not a properly formated roll`);
    }
  },
  mapArgstoRollCommand(args) {
    var output = args[0];
    output += args.length > 1 ? args.join("") : "";
    return output.toLowerCase().trim();
  },
  buildDice(rollCommand) {
    const dIndex = rollCommand.indexOf("d");
    return {
      quantity: dIndex == 0 ? 1 : rollCommand.substring(0, dIndex),
      sides: rollCommand.substring(dIndex + 1),
    };
  },
  rollDieWithsides(sides) {
    if (sides == "🥧") return Math.PI;

    return Math.ceil(Math.random() * sides);
  },
  critCheers(message, sides, roll) {
    if (roll == sides) {
      switch (this.rollDieWithsides(3)) {
        case 1:
          message.reply("dope");
          break;
        case 2:
          message.reply("what are the odds?");
          break;
        case 3:
          message.reply("go you!");
          break;
      }
    }
  },
};
