const description_db = require('../db/description');

module.exports = (args, msg) => {
    if (!args || args.length <= 0) {
        return;
    }

    const fullName = args.join(' ');
    description_db(fullName, desc => {
        if (!desc) {
            return msg.channel.send(`Sorry partner, I don't have any notes on that monster.`)
        }

        msg.channel.send(desc);
    });
};