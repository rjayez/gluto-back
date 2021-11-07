let express = require('express');
let router = express.Router();
const client = require('../bot/bot')
const {io} = require('../services/socket')
const {sha256} = require("js-sha256")
const {getWeekSchedule} = require('../services/twitchApi');
const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:3000"
}

router.get('/notif', (req, res, next) => {
    res.send("Test Api Notif twitch")
    console.log("la notif")
    io.emit("notif", "emit apres l'appel GET");
})

router.post('/notif', (req, res, next) => {

    console.log("notif !!", req.body);

    if(req.body?.subscription?.status === 'webhook_callback_verification_pending'){
        verifyTwitchSubSignature(req.headers, req.body);
        res.send(req.body.challenge);
    } else if(req.body?.subscription?.status === 'enabled') {
        const event = req.body.event;
        console.log("Notif reçu !", event)
        io.emit("notif", { pseudo : req.body.event.user_name});
        // client.say("letetryl", `T'as vu ${event.user_name}, ça fait rien ;)`);
        client.say("letetryl", `Arrête de jouer ${event.user_name} !`);
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
    const signature = headers["twitch-eventsub-message-signature"];
    console.log(signature)
    const messageId = headers["twitch-eventsub-message-id"];
    const messageTimestamp = headers["twitch-eventsub-message-timestamp"];
    const message = messageId + messageTimestamp + body;
    console.log(process.env.TWITCH_EVENTSUB_SECRET)
    const hmacMessage = sha256.hmac(process.env.TWITCH_EVENTSUB_SECRET, message);
    console.log(hmacMessage);


}

module.exports = router;