const express = require('express');
const router = express.Router();
var LOGGER = require('log4js').getLogger("routes");



/* GET home page. */
router.get('/', get_data_details, function(req, res, next) {

    let data = req.data_details;

    try {
        if (!req.session.sc) {
            res.render('pages/home/security_check');
        } else {
            res.redirect('/dashboard');
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/security_check', function(req, res, next) {

    if (req.body.code == "Etiop") {
        req.session.sc = true;
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }
});

router.get('/dashboard', get_data_details, function(req, res, next) {
    var data = req.data_details;

    data.title = "Dashboard";
    data.page_id = "home-index";
    data.plugins.push("jquery_ui-interactions", "sticky", "socketio", "bootbox");
    data.page_assets.css = true;
    data.page_assets.js = false;
    data.page_assets.js_module = true;
    data.breadcrumb.push();

    res.render('index', data);
});

router.get('/react', get_data_details, function(req, res, next) {
    var data = req.data_details;

    data.title = "React";
    data.page_id = "react-index";
    data.plugins.push("react");
    data.page_assets.css = true;
    data.page_assets.js = false;
    data.page_assets.js_module = false;
    data.page_assets.js_babel = true;
    data.breadcrumb.push();

    res.render('index', data);
});

module.exports = router;