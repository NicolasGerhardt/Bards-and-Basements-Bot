import rollHelper from "./roll/rollhelper";

module.exports = {
  name: "roll",
  description: "Roll dice",
  args: true,
  usage:
    "[number of dice]d[number of sides on dice][+/-][single mondifer] \n--Note: each number must be a 3-digit whole number to work",
  execute(message, args) {
    let rollString = rollHelper.buildRollString(args);

    try {
      rollHelper.validate(rollString);
    } catch (error) {
      return message.reply(error.message);
    }

    let rollArray = rollHelper.buildRollArray(rollString);

    let rolls = [];
    let totalRoll = 0;

    if (rollArray[0] && rollArray[1] != "pi") {
      for (let i = 0; i < rollArray[0]; i++) {
        rolls.push(Math.floor(Math.random() * Math.floor(rollArray[1])) + 1);
        totalRoll += rolls[i];
      }
    } else if (rollArray[1] == "pi") {
      rolls.push(Math.random() * Math.PI + 1);
      totalRoll += rolls[0];
    } else {
      rolls.push(Math.floor(Math.random() * Math.floor(rollArray[1])) + 1);
      totalRoll += rolls[0];
    }

    if (rollArray[2] && rollArray[2] != "pi") {
      totalRoll += parseInt(rollArray[2]);
    } else if (rollArray[2] && rollArray[2] == "pi") {
      totalRoll += Math.PI;
    }

    if (rollArray[1] == 20 && (rollArray[0] == "" || rollArray[0] == 1)) {
      // rolling single d20
      let r = Math.floor(Math.random() * Math.floor(3));
      if (rolls[0] == 1) {
        // nat 1
        if (r == 0) {
          message.reply("uh oh...");
        } else if (r == 1) {
          message.reply("nuts...");
        } else if (r == 2) {
          message.reply("better luck next time...");
        }
      } else if (rolls[0] == 20) {
        // nat 20
        if (r == 0) {
          message.reply("dope");
        } else if (r == 1) {
          message.reply("what are the odds?");
        } else if (r == 2) {
          message.reply("go you!");
        }
      }
    }

    message.channel.send("Each roll: [" + rolls.join("][") + "]");
    message.channel.send("Total roll: " + totalRoll);
  },
};
