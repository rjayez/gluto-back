const tmi = require('tmi.js');
require('dotenv').config();

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    identity:{
        username: 'GlutoBot',
        password: `oauth:${process.env.BOT_OAUTH_TOKEN}`
    },
    channels: [
        'letetryl',
        'romanus89'
    ]
});

client.on('message', async (channel, context, message) => {
    // console.log('channel', {
    //     channel,
    //     user: context.username,
    //     message
    // });
});

client.on('message', async (channel, tags, message, self) => {
    if(message.toLowerCase() === '!test'){
        console.log("tags", tags);
    }

    if(message.toLowerCase() === '!bot'){
        await client.say(channel, "C'est un bot en plein apprentissage !");
    }

    if(message.toLowerCase() === '!cri'){
        await client.say(channel, "Bouh !");
    }

    if(message.toLowerCase() === '!chaise'){
        await client.say(channel,  "C'EST UNE CHAISE, BORDEL !");
    }

    if(message.toLowerCase() === '!banc'){
        await client.say(channel,  "C'EST UN BANC, BORDEL !");
    }

    if(message.toLowerCase() === '!debile'){
        await client.say(channel,  "Tetryl, tyé fada, couillon !");
    }


    if(message.toLowerCase() === '!romanusdodo'){
        await client.say(channel, "J'ai pas assez dormi !");
    }

    if(message.toLowerCase() === '!zireael'){
        await client.say(channel, "Nik toi Zireael !");
    }

    if(message.toLowerCase() === '!romanus'){
        await client.say(channel, "Pas touche à Romanus !");
    }

    if(message.toLowerCase() === '!nik'){
        await client.say(channel, `Nique toi ${tags?.["display-name"]} !`);
    }

    if(message.toLowerCase() === '!frites'){
        await client.say(channel, `C'est l'heure des frites !`);
    }

    if(message.toLowerCase() === '!joue'){
        await client.say(channel, `Tais-toi et joue !`);
    }

    if(message.toLowerCase() === '!digestif'){
        await client.say(channel, `Je vous conseille la Menthe Pastille, c'est fait par un pharmacien !`);
    }


});

module.exports = client;