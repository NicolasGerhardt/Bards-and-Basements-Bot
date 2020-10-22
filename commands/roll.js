const rollHelper = require("./roll/rollhelper");

module.exports = {
  name: "roll",
  description: "Roll dice",
  args: true,
  usage:
    "Roll dice with standard 'd' notation. You will have to add your mods yourself.  Examples d20, 2d6, 30d4, etc.",
  execute(message, args) {
    const rollCommand = rollHelper.mapArgstoRollCommand(args);

    try {
      rollHelper.validate(rollCommand);
    } catch (error) {
      return message.reply(error.message);
    }

    const dice = rollHelper.buildDice(rollCommand);

    let rolls = [];
    let totalRoll = 0;

    for (let i = 0; i < dice.quantity; i++) {
      rolls.push(rollHelper.rollDieWithsides(dice.sides));
      totalRoll += rolls[i];
    }

    message.channel.send("Each roll: [" + rolls.join("][") + "]");
    message.channel.send("Total roll: " + totalRoll);
    
    if (dice.sides == 20) {
      rolls.forEach((roll) => {
        rollHelper.critCheers(message, dice.sides, roll);
      });
    }
  },
};
