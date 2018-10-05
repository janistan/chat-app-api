const Express = require('express');
const router = Express.Router();
const watsonCtrl = require('./../controller/watson-controller');

router.route('/conversation')
    .post(watsonCtrl.sendConversation);

module.exports = router;