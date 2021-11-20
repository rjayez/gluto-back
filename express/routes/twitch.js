let express = require('express');
let router = express.Router();
const client = require('../bot/bot')
const {io} = require('../services/socket')
const {sha256} = require("js-sha256")
const {getWeekSchedule} = require('../services/twitchApi');
const cors = require('cors');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const MESSAGE_POINTS = [
    `Ah ! T'aimes jouer avec ce point de chaine %s !`,
    "`Arrête de jouer %s !",
    "T'as vu %s, ça fait rien ;)",
    "%s, tu aimes dépenser des points de chaine pour rien."
]


const corsOptions = {
    origin: "http://localhost:3000"
}

router.get('/notif', (req, res, next) => {
    res.send("Test Api Notif twitch")
    console.log("la notif")
    io.emit("notif", "emit apres l'appel GET");
})

router.post('/notif', (req, res, next) => {

    // Vérifie que le message provient bien de Twitch avec le bon secret
    if(!verifyTwitchSubSignature(req.headers, req.body)){
        console.log("Rejeté");
        res.sendStatus(403);
        return;
    }

    const randomMessage = getRandomInt(MESSAGE_POINTS.length);
    if(req.body?.subscription?.status === 'webhook_callback_verification_pending'){
        console.log("verification pending")
            res.sendStatus(204);
    } else if(req.body?.subscription?.status === 'enabled') {
        const event = req.body.event;
        console.log("Notif reçu !", event)
        io.emit("notif", { pseudo : req.body.event.user_name});
        client.say("letetryl", MESSAGE_POINTS[randomMessage].replace("%s", event.user_name));
        res.sendStatus(204);
    }


})

router.get('/schedule', cors(corsOptions),function (req, res) {
    const leTetrylId = 438950402;
        getWeekSchedule(leTetrylId)
            .then(data => res.send(data));
})

function verifyTwitchSubSignature(headers, body) {
    // TODO finaliser la verification
    const HMAC_PREFIX = "sha256=";
    const messageId = headers["twitch-eventsub-message-id"];
    const messageTimestamp = headers["twitch-eventsub-message-timestamp"];
    const signature = headers["twitch-eventsub-message-signature"];
    const message = messageId + messageTimestamp + JSON.stringify(body);

    //get Hmac
    const hmacMessage = HMAC_PREFIX + sha256.hmac(process.env.TWITCH_EVENTSUB_SECRET, message);

    return hmacMessage === signature;

}

module.exports = router;