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
    data.plugins.push("jquery_ui-interactions", "switch", "sticky", "bootbox", "datatables", "validator","select2", "moment");
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

//Get User Tasks
router.post('/getUserTask', function(req, res, next) {
    //var queryString = url.parse(req.url, true);
    TaskModelModelObj.getUserTask(req.body, function(rows_data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows_data));
    });
});


//Get User List
router.get('/getUserList', function(req, res, next) {
    //var queryString = url.parse(req.url, true);
    ContactModelObj.getUserList(function(rows_data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows_data));
    });
});


//Get ttaksASK details
router.get('/getTaskDetails', function(req, res, next) {
    var id = req.query.id;
    TaskModelModelObj.getTaskDetails(id, function(result) {
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });
});


//update Task details
router.post('/updateTask', function(req, res, next) {
    var errors = {};
    var data = {};
    var formData = {};

        formData.TID = req.body.TID;
        formData.TITLE  = req.body.TITLE.trim();
        formData.DESCRIPTION  = req.body.DESCRIPTION.trim();
        formData.PRIORITY = req.body.PRIORITY.trim();
        formData.ASSIGNEDTO   = req.body.ASSIGNEDTO.trim();
        formData.STATUS = req.body.STATUS;
        
        TaskModelModelObj.updateTask(formData, function(result, status) {
            if (status == true) {
                data.success = true;
                res.send(JSON.stringify(data));
            } else {
                data.errors = errors;
                data.success = false;
                res.send(JSON.stringify(data));
            }
        });
    

});



module.exports = router;