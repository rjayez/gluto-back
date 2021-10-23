let express = require('express');
let router = express.Router();


router.get('/notif', (req, res, next) => {
    res.send("Test Api Notif twitch")
})

router.post('/notif', (req, res, next) => {

})

module.exports = router;