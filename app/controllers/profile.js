var express = require('express');
var router = express.Router();
var validator = require('validator');
router.get('/', get_data_details, function(req, res, next) {

    let data = req.data_details;

    try {
        if (!req.session.sc) {
            res.render('pages/home/security_check');
        } else {
            res.redirect('profile');
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/security_check', function(req, res, next) {

    if (req.body.code == "Etiop") {
        req.session.sc = true;
        res.redirect('profile');
    } else {
        res.redirect('/');
    }
});

/* GET users listing. */
router.get('/profile',get_data_details, function(req, res, next) {
    var data = req.data_details;

    data.title = "Profile";
    data.page_id = "home-profile";
    data.plugins.push("jquery_ui-interactions", "switch", "sticky", "bootbox", "datatables", "validator","select2");
    data.page_assets.css = true;
    data.page_assets.js = true;
    data.page_assets.js_module = false;
    data.breadcrumb.push();
    res.render('index', data);
});


//Get user details
router.get('/viewProfile', function(req, res, next) {
    var id = req.query.id;
    ContactModelObj.getUserDetails(id, function(result) {
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });
});

module.exports = router;