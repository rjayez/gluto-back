let express = require('express');
let router = express.Router();
const client = require('../bot/bot')
const {io} = require('../services/socket')
const {sha256} = require("js-sha256")
const {getWeekSchedule, getStreamPresent} = require('../services/twitchApi');
const cors = require('cors');

const LE_TETRYL_ID = 438950402;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const TEST_REWARD_ID = "0a111137-52d4-405e-a510-70731abf8fcc";

const MESSAGE_POINTS = [
    "Ah ! T'aimes jouer avec ce point de chaine %s !",
    "Arrête de jouer %s !",
    "T'as vu %s, ça fait rien ;)",
    "%s, tu aimes dépenser des points de chaine pour rien."
]

const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification_pending';

const corsOptions = {
    origin: ["http://localhost:3000","https://gluto-back.herokuapp.com"]
}

router.get('/notif', (req, res, next) => {
    res.send("Test Api Notif twitch")
    console.log("la notif")
    io.emit("notif", "emit apres l'appel GET");
})

router.post('/notif', (req, res, next) => {

    // Vérifie que le message provient bien de Twitch avec le bon secret
    if (!verifyTwitchSubSignature(req.headers, req.body)) {
        console.log("Rejeté");
        return res.sendStatus(403);
    }
    console.log("BODY", req.body);
    const randomMessage = getRandomInt(MESSAGE_POINTS.length);

    // Vérification d'une subscription d'event twitch
    if (req.body?.subscription?.status === MESSAGE_TYPE_VERIFICATION) {
        // Notification message types
        console.log("Verification pending")
        return res.status(200).send(req.body.challenge);
    }

    if (req.body?.subscription?.status === 'enabled') {
        const event = req.body.event;
        console.log("Notif reçu !")
        io.emit("notif", {pseudo: req.body.event.user_name});
        if(TEST_REWARD_ID === event?.reward?.id){
            client.say("letetryl", MESSAGE_POINTS[randomMessage].replace("%s", event.user_name));
        }
        return res.sendStatus(204);
    }
})

router.get('/schedule', cors(corsOptions), function (req, res) {

   return getWeekSchedule(LE_TETRYL_ID)
        .then(data => res.send(data));
})

router.get('/stream', cors(corsOptions), function(req, res){
    return getStreamPresent(LE_TETRYL_ID)
        .then(data => res.send(data));
})

function verifyTwitchSubSignature(headers, body) {

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