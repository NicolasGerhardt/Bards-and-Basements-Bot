module.exports = {
  validate(rollString) {
    // RegEx of valid roll string
    const regex = new RegExp(/^\d{0,3}d(\d{1,3}|pi)([\+\-](\d{1,3}|pi)){0,1}$/);

    if (!regex.test(rollString)) {
      throw new Error(`'${rollString}' is not a properly formated roll`);
    }
  },
  buildRollString(args) {
    if (args.length > 1) {
      return args.join("").toLowerCase();
    }
    return (output = args[0].toLowerCase());
  },
  buildRollArray(rollString) {
    return rollString.toLowerCase().split(/[d\+\-]/);
  },
};
