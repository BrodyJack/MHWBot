const weakness_db = require('../db/weakness');

module.exports = (args, msg) => {
    if (!args || args.length <= 0) {
        return;
    }

    const fullName = args.join(' ');
    weakness_db(fullName, weaknesses => {
        if (!weaknesses) {
            return msg.channel.send(`Sorry partner, I don't have any notes on that monster.`)
        }

        const reply = buildMessage(weaknesses);
        msg.channel.send(reply);
    });
};

const buildMessage = weaknesses => {
    return `
\`\`\`
🔥 : ${weaknesses.weakness_fire}
💧 : ${weaknesses.weakness_water} 
❄ : ${weaknesses.weakness_ice}
⚡ : ${weaknesses.weakness_thunder} 
🐲 : ${weaknesses.weakness_dragon} 
☣️ : ${weaknesses.weakness_poison}
💤 : ${weaknesses.weakness_sleep}
♿ : ${weaknesses.weakness_paralysis}
💥 : ${weaknesses.weakness_blast}
💫 : ${weaknesses.weakness_blast}
\`\`\`
`;
};
