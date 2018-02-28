const Express = require('express');
const router = Express.Router();
const watsonCtrl = require('./../controller/watson-controller');

router.route('/conversation')
    .post(watsonCtrl.sendConversation);

router.route('/tts')
    .post(watsonCtrl.tts);

module.exports = router;