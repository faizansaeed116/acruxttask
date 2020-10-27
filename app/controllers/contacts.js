var express = require('express');
var router = express.Router();
var validator = require('validator');
router.get('/', get_data_details, function(req, res, next) {

    let data = req.data_details;

    try {
        if (!req.session.sc) {
            res.render('pages/home/security_check');
        } else {
            res.redirect('contacts');
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/security_check', function(req, res, next) {

    if (req.body.code == "Etiop") {
        req.session.sc = true;
        res.redirect('contacts');
    } else {
        res.redirect('/');
    }
});

/* GET users listing. */
router.get('/contacts',get_data_details, function(req, res, next) {
    var data = req.data_details;

    data.title = "Contacts";
    data.page_id = "home-contacts";
    data.plugins.push("jquery_ui-interactions", "switch", "sticky", "bootbox", "datatables", "validator","select2");
    data.page_assets.css = true;
    data.page_assets.js = true;
    data.page_assets.js_module = false;
    data.breadcrumb.push();
    res.render('index', data);
});
//Get User List
router.post('/getContactsList', function(req, res, next) {
    //var queryString = url.parse(req.url, true);
    ContactModelObj.getContactsList(req.body, function(rows_data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows_data));
    });
});


// Add New User
router.post('/adduser', function(req, res, next) {
    var errors = {};
    var data = {};
    var formData = {};
    if (req.body.firstname != '' && req.body.firstname != null) {
        if (!validator.matches(req.body.firstname.trim(), /^[A-Za-z\s]+$/))
            errors.firstname = "Only Alphabets are allowed.";
    }
    if (req.body.middlename != '' && req.body.middlename != null) {
        if (!validator.matches(req.body.middlename.trim(), /^[A-Za-z\s]+$/))
            errors.middlename = "Only Alphabets are allowed.";
    }
    if (req.body.lastname != '' && req.body.lastname != null) {
        if (!validator.matches(req.body.lastname.trim(), /^[A-Za-z\s]+$/))
            errors.lastname = "Only Alphabets are allowed.";
    }
    if (req.body.userphone != '' && req.body.userphone != null) {
        if (!validator.matches(req.body.userphone.trim(), /^[0-9]+$/))
            errors.userphone = "Only Numbers are allowed.";
    }
    if (req.body.useraddress != '' && req.body.useraddress != null) {
        if (!validator.isAlphanumeric(req.body.useraddress.trim()))
            errors.useraddress = "Only Alphanumeric characters are allowed.";
    }
    if (req.body.useremail != '' && req.body.useremail != null) {
        if (!validator.isEmail(req.body.useremail))
            errors.useremail = "Valid email is required";
    }
    if (req.body.useremail != '' && req.body.useremail != null) {
        var useremail = req.body.useremail.trim();
        useremail = useremail.toLowerCase();
        ContactModelObj.checkuseremailExists(useremail, function(result, status) {
            if (status == true) {
                errors.useremail = "Email already exists.";
                data.errors = errors;
                data.success = false;
                res.send(JSON.stringify(data));
            } else{
                if (Object.entries(errors).length === 0){
                    formData.useremail  = req.body.useremail.trim();
                    formData.firstname  = req.body.firstname.trim();
                    formData.middlename = req.body.middlename.trim();
                    formData.lastname   = req.body.lastname.trim();
                    formData.usergender = req.body.usergender;
                    formData.userphone  = req.body.userphone.trim();
                    formData.useraddress= req.body.useraddress.trim();
                    formData.usercity   = req.body.usercity.trim();
                    formData.usercompany= req.body.usercompany.trim();
                    formData.usertitle  = req.body.usertitle.trim();
                    formData.userrole   = req.body.userrole.trim();
                    formData.userpass   = req.body.userpass.trim();
                    formData.confirm_userpass   = req.body.confirm_userpass.trim();
                    ContactModelObj.createUser(formData, function(result, status) {
                        if (status == true) {
                            data.success = true;
                            res.send(JSON.stringify(data));
                        } else {
                            data.errors = errors;
                            data.success = false;
                            res.send(JSON.stringify(data));
                        }
                    });
                }else{
                    data.errors = errors;
                    data.success = false;
                    res.send(JSON.stringify(data));
                }
            }
        });
    }
        
        
});

//Get user details
router.get('/get_user_details', function(req, res, next) {
    var id = req.query.id;
    ContactModelObj.getUserDetails(id, function(result) {
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });
});

//update user details
router.post('/updateUser', function(req, res, next) {
    var errors = {};
    var data = {};
    var formData = {};
    if (req.body.firstname != '' && req.body.firstname != null) {
        if (!validator.matches(req.body.firstname.trim(), /^[A-Za-z\s]+$/))
            errors.firstname = "Only Alphabets are allowed.";
    }
    if (req.body.middlename != '' && req.body.middlename != null) {
        if (!validator.matches(req.body.middlename.trim(), /^[A-Za-z\s]+$/))
            errors.middlename = "Only Alphabets are allowed.";
    }
    if (req.body.lastname != '' && req.body.lastname != null) {
        if (!validator.matches(req.body.lastname.trim(), /^[A-Za-z\s]+$/))
            errors.lastname = "Only Alphabets are allowed.";
    }
    if (req.body.userphone != '' && req.body.userphone != null) {
        if (!validator.matches(req.body.userphone.trim(), /^[0-9]+$/))
            errors.userphone = "Only Numbers are allowed.";
    }
    if (req.body.useraddress != '' && req.body.useraddress != null) {
        if (!validator.matches(req.body.useraddress.trim(),/^[A-Za-z0-9\s]+$/))
            errors.useraddress = "Only Alphanumeric characters are allowed.";
    }
    if (req.body.useremail != '' && req.body.useremail != null) {
        if (!validator.isEmail(req.body.useremail))
            errors.useremail = "Valid email is required";
    }
    if (req.body.useremail != '' && req.body.useremail != null) {
        var useremail = req.body.useremail.trim();
        useremail = useremail.toLowerCase();
        ContactModelObj.checkEmailExistsId(useremail, req.body.id,function(result, status) {
            if (status == true) {
                errors.useremail = "Email already exists.";
                data.errors = errors;
                data.success = false;
                res.send(JSON.stringify(data));
            } else{
                if (Object.entries(errors).length === 0){
                    formData.id = req.body.id;
                    formData.useremail  = req.body.useremail.trim();
                    formData.firstname  = req.body.firstname.trim();
                    formData.middlename = req.body.middlename.trim();
                    formData.lastname   = req.body.lastname.trim();
                    formData.usergender = req.body.usergender;
                    formData.userphone  = req.body.userphone.trim();
                    formData.useraddress= req.body.useraddress.trim();
                    formData.usercity   = req.body.usercity.trim();
                    formData.usercompany= req.body.usercompany.trim();
                    formData.usertitle  = req.body.usertitle.trim();
                    formData.userrole   = req.body.userrole.trim();
                    formData.userpass   = req.body.userpass.trim();
                    
                    ContactModelObj.updateUser(formData, function(result, status) {
                        if (status == true) {
                            data.success = true;
                            res.send(JSON.stringify(data));
                        } else {
                            data.errors = errors;
                            data.success = false;
                            res.send(JSON.stringify(data));
                        }
                    });
                }else{
                    data.errors = errors;
                    data.success = false;
                    res.send(JSON.stringify(data));
                }
            }
        });
    }

});

router.post('/deleteUser', function(req, res, next) {
    var userID= req.body.id;
    ContactModelObj.deleteUser(userID, function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    });
});

module.exports = router;