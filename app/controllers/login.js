var express = require('express');
var router = express.Router();
var validator = require('validator');
var passport = require('passport');

router.get('/', get_data_details, function(req, res, next) {
   
    let data = req.data_details;

    try {
        if (!req.session.sc) {
            res.render('pages/home/security_check');
        } else {
            res.redirect('login');
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/security_check', function(req, res, next) {

    if (req.body.code == "Etiop") {
        req.session.sc = true;
        res.redirect('login');
    } else {
        res.redirect('/');
    }
});

/* GET users listing. */
router.get('/login',get_data_details, function(req, res, next) {
    var userDetails = req.users;
    var data = req.data_details;

    data.title = "Login";
    data.page_id = "home-login";
    data.plugins.push("jquery_ui-interactions", "switch", "sticky", "bootbox", "datatables", "validator","select2", "moment");
    data.page_assets.css = true;
    data.page_assets.js = true;
    data.page_assets.js_module = false;
    data.breadcrumb.push();
    res.render('index', data);
});

router.post('/loginDetails', function(req, res, next) {


    passport.authenticate('local-login', function(err, user, info) {

        if (err) { 
            return res.status(500).json(error); 
        }
        if (!user) { 
            return res.status(401).json(info); 
        }
        req.logIn(user, function(err) {
          if (err) { 
            return res.status(500).json(error); 
          }else{
            return res.status(200).json(user); 
            // return res.redirect('/get_user_details?id=' + user.ID);
          }
        });
      })(req, res, next);

});

module.exports = router;