const express = require('express');
const router = express.Router();

router.post('/logger', function (req, res, next) {
    var params = req.body;

    (params.logs).forEach(log => {
        if (log.level == 'trace') {
            frontApp.trace(log);
        } else if (log.level == 'debug') {
            frontApp.debug(log);
        } else if (log.level == 'info') {
            frontApp.info(log);
        } else if (log.level == 'warn') {
            frontApp.warn(log);
        } else if (log.level == 'error') {
            frontApp.error(log);
        }
    });

    res.send(true);

});

module.exports = router;
