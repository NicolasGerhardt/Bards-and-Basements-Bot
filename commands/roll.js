module.exports = {
    name: 'roll',
    description: 'Roll dice',
    args: true,
    usage: '[number of dice]d[number of sides on dice][+/-][single mondifer] \n--Note: each number must be a 3-digit whole number to work',
    execute(message, args) {
        let rollStr = '';
        if (args.length > 1) {
            rollStr = args.join('').toLowerCase();
        } else {
            rollStr = args[0].toLowerCase();
        }
        
        const regex = new RegExp(/^\d{0,3}d(\d{1,3}|pi)([\+\-](\d{1,3}|pi)){0,1}$/); // RegEx of valid roll string

        if (!regex.test(rollStr)) {
            return message.reply(`'${rollStr}' is not a properly formated roll`);
        }

        let rollArr = rollStr.toLowerCase().split(/[d\+\-]/);

        //console.log(rollArr);

        let rolls = [];
        let totalRoll = 0;

        if (rollArr[0] && rollArr[1] != 'pi') {
            for (let i = 0; i < rollArr[0]; i++) {
                rolls.push(Math.floor(Math.random() * Math.floor(rollArr[1])) + 1);
                totalRoll += rolls[i];
            }
        } else if (rollArr[1] == 'pi') {
            rolls.push((Math.random() * Math.PI) + 1);
            totalRoll += rolls[0];
        } else {
            rolls.push(Math.floor(Math.random() * Math.floor(rollArr[1])) + 1);
            totalRoll += rolls[0];
        }

        if(rollArr[2] && rollArr[2] != 'pi') {
            totalRoll += parseInt(rollArr[2]);
        } else if (rollArr[2] && rollArr[2] == 'pi') {
            totalRoll += Math.PI;
        }

        if(rollArr[1] == 20 && (rollArr[0] == '' || rollArr[0] == 1)) { // rolling single d20
                let r = Math.floor(Math.random() * Math.floor(3));
                if (rolls[0] == 1) { // nat 1
                    if (r == 0) {
                        message.reply('uh oh...');
                    } else if (r == 1) {
                        message.reply('nuts...');
                    } else if (r == 2) {
                        message.reply('better luck next time...')
                    }
                } else if (rolls[0] == 20) { // nat 20
                    if (r == 0) {
                        message.reply('dope');
                    } else if (r == 1) {
                        message.reply('what are the odds?')
                    } else if (r == 2) {
                        message.reply('go you!')
                    }
                }
        }

        message.channel.send('Each roll: [' + rolls.join('][') + ']');
        message.channel.send('Total roll: ' + totalRoll);

    },
}