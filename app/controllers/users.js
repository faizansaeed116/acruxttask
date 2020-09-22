const express = require('express');
const router = express.Router();
var url = require('url');
var validator = require('validator');

/* GET home page. */
// router.get('/', authUser, get_data_details, function(req, res, next) {
//     var data = req.data_details;
//     data.title = "User Administration";
//     data.page_id = "users-list";
//     data.plugins.push("datatables", "select2", "moment", "daterangepicker", "switch", "prism", "sticky", "bootbox", "validator", "socketio");
//     data.page_assets.js = true;
//     data.breadcrumb.push("Settings", "Users");

//     res.render('index', data);
// });

router.post('/get_datatables_list', function(req, res, next) {
    //var queryString = url.parse(req.url, true);
    UserModelObj.getDatatablesList(req.body, function(rows_data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows_data));
    });
});


router.get('/get_user_record', function(req, res, next) {

    var queryString = url.parse(req.url, true);
    UserModelObj.getUserDetails(queryString.query.id, function(rows_data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows_data));
    });
});


/* Post add user. */
router.post('/adduser', get_data_details, function(req, res, next) {
    var errors = {};
    var data = {};
    var formData = {};
    if (req.body.email == '' || req.body.email == null)
        errors.email = "Email is required.";
    if (req.body.email != '' && req.body.email != null) {
        if (!validator.isEmail(req.body.email))
            errors.email = "Valid email is required";
    }
    if (req.body.username == '' || req.body.username == null)
        errors.username = "Username is required.";
    else {
        if (req.body.username != '' && req.body.username != null) {
            if (!validator.isAlphanumeric(req.body.username.trim()))
                errors.username = "Only Alphanumeric characters are allowed.";
        }
    }
    if (req.body.first_name == '' || req.body.first_name == null)
        errors.first_name = "First name is required.";
    else {
        if (req.body.first_name != '' && req.body.first_name != null) {
            if (!validator.matches(req.body.first_name.trim(), /^[A-Za-z\s]+$/))
                errors.first_name = "Only Alphabets are allowed.";
        }
    }
    if (req.body.last_name == '' || req.body.last_name == null)
        errors.last_name = "Last name is required.";
    else {
        if (req.body.last_name != '' && req.body.last_name != null) {
            if (!validator.matches(req.body.last_name.trim(), /^[A-Za-z\s]+$/))
                errors.last_name = "Only Alphabets are allowed.";
        }
    }
    if (req.body.password == '' || req.body.password == null)
        errors.password = "Password is required.";
    else {
        var password = req.body.password.trim();
        if (!validator.isLength(password, { min: 6, max: 20 }))
            errors.password = "Password should be at least 6 characters";
        if (req.body.conf_password == '' || req.body.conf_password == null)
            errors.conf_password = "Confirm Password is required.";
        else {
            var conf_password = req.body.conf_password.trim();
            if (!validator.isLength(conf_password, { min: 6, max: 35 }))
                errors.conf_password = "Confirm Password should be at least 6 characters";
            else {
                if (password !== conf_password) {
                    errors.conf_password = "Password mismatch!";
                }
            }
        }
    }

    if (req.body.department == 0)
        errors.department = "Please select department.";

    if (req.body.email != '' || req.body.email != null) {
        var email = req.body.email.trim();
        email = email.toLowerCase();
        UserModelObj.checkEmailExists(email, function(result, status) {
            if (status == true) {
                errors.email = "Email already exists.";
                data.errors = errors;
                data.success = false;
                res.send(JSON.stringify(data));
            } else {
                if (req.body.username != '' || req.body.username != null) {
                    var username = req.body.username.trim();
                    username = username.toLowerCase();
                    UserModelObj.checkUsernameExists(username, function(result, status) {
                        if (status == true) {
                            errors.username = "Username already exists.";
                            data.errors = errors;
                            data.success = false;
                            res.send(JSON.stringify(data));
                        } else {
                            if (Object.entries(errors).length === 0) {
                                formData.email = email;
                                formData.username = username;
                                formData.first_name = req.body.first_name.trim();
                                formData.last_name = req.body.last_name.trim();
                                formData.password = req.body.password.trim();
                                formData.cuser = req.user.ID;
                                formData.department = req.body.department;
                                formData.role = req.body.role;
                                UserModelObj.createUser(formData, function(result, status) {
                                    if (status == true) {
                                        data.success = true;
                                        res.send(JSON.stringify(data));
                                    } else {
                                        errors.username = "User cannot be created at this time.";
                                        data.errors = errors;
                                        data.success = false;
                                        res.send(JSON.stringify(data));
                                    }
                                });

                            } else {
                                data.errors = errors;
                                data.success = false;
                                res.send(JSON.stringify(data));
                            }
                        }
                    });
                }
            }
        });
    }


});

router.post('/edituser', get_data_details, function(req, res, next) {
    var errors = {};
    var data = {};
    var formData = {};

    if (req.body.email == '' || req.body.email == null)
        errors.email = "Email is required.";
    if (req.body.email != '' && req.body.email != null) {
        if (!validator.isEmail(req.body.email))
            errors.email = "Valid email is required";
    }

    if (req.body.username == '' || req.body.username == null)
        errors.username = "Username is required.";
    else {
        if (req.body.username != '' && req.body.username != null) {
            if (!validator.isAlphanumeric(req.body.username.trim()))
                errors.username = "Only Alphanumeric characters are allowed.";
        }
    }
    if (req.body.first_name == '' || req.body.first_name == null)
        errors.first_name = "First name is required.";
    else {
        if (req.body.first_name != '' && req.body.first_name != null) {
            if (!validator.matches(req.body.first_name.trim(), /^[A-Za-z\s]+$/))
                errors.first_name = "Only Alphabets are allowed.";
        }
    }
    if (req.body.last_name == '' || req.body.last_name == null)
        errors.last_name = "Last name is required.";
    else {
        if (req.body.last_name != '' && req.body.last_name != null) {
            if (!validator.matches(req.body.last_name.trim(), /^[A-Za-z\s]+$/))
                errors.last_name = "Only Alphabets are allowed.";
        }
    }
    var password = '';
    if (req.body.password != '' && req.body.password != null) {
        password = req.body.password.trim();
        if (!validator.isLength(password, { min: 6, max: 20 }))
            errors.password = "Password should be at least 6 characters";
        if (req.body.conf_password == '' || req.body.conf_password == null)
            errors.conf_password = "Confirm Password is required.";
        else {
            var conf_password = req.body.conf_password.trim();
            if (!validator.isLength(conf_password, { min: 6, max: 20 }))
                errors.conf_password = "Confirm Password should be at least 6 characters";
            else {
                if (password !== conf_password) {
                    errors.conf_password = "Password mismatch!";
                }
            }
        }

    }
    if (req.body.department == 0)
        errors.department = "Please select department.";
    if (req.body.email != '' && req.body.email != null) {
        var email = req.body.email.trim();
        email = email.toLowerCase();
        UserModelObj.checkEmailExistsId(email, req.body.uid, function(result, status) {
            if (status == true) {
                errors.email = "Email already exists.";
                data.errors = errors;
                data.success = false;
                res.send(JSON.stringify(data));
            } else {
                if (req.body.username != '' && req.body.username != null) {
                    var username = req.body.username.trim();
                    username = username.toLowerCase();
                    UserModelObj.checkUsernameExistsId(username, req.body.uid, function(result, status) {
                        if (status == true) {
                            errors.username = "Username already exists.";
                            data.errors = errors;
                            data.success = false;
                            res.send(JSON.stringify(data));
                        } else {
                            if (Object.entries(errors).length === 0) {
                                formData.email = email;
                                formData.username = username;
                                formData.first_name = req.body.first_name.trim();
                                formData.last_name = req.body.last_name.trim();
                                formData.muser = req.user.ID;
                                formData.uid = req.body.uid;
                                formData.password = req.body.password;
                                formData.status = req.body.status;
                                formData.department = req.body.department;
                                formData.role = req.body.role;
                                UserModelObj.editUser(formData, function(result, status) {
                                    if (status == true) {
                                        data.success = true;
                                        res.send(JSON.stringify(data));
                                    } else {
                                        errors.username = "User cannot be edited at this time.";
                                        data.errors = errors;
                                        data.success = false;
                                        res.send(JSON.stringify(data));
                                    }
                                });

                            } else {
                                data.errors = errors;
                                data.success = false;
                                res.send(JSON.stringify(data));
                            }
                        }
                    });
                }
            }
        });
    }


});

router.post('/deleteuser', function(req, res, next) {

    UserModelObj.deleteUser(req.body.ID, function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    });
});

router.get('/get_departments', function(req, res, next) {
    // var queryString = url.parse(req.url, true);
    UserModelObj.getDepartments(req, function(rows_data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows_data));
    });
});

/* GET home page. */
router.get('/profile', get_data_details, function(req, res, next) {
    var data = req.data_details;
    data.title = "Profile";
    data.page_id = "users-profile";
    data.plugins.push("select2", "moment", "switch", "prism", "sticky", "bootbox", "validator", "socketio");
    data.page_assets.js = true;
    data.breadcrumb.push("Settings", "Users", "Profile");
    data.user_details = [];

    UserModelObj.getUserDetails(data.user.ID, function(rows_data) {
        data.user_details = rows_data;
        res.render('index', data);
    });

});

router.get('/get_users', function(req, res, next) {

    UserModelObj.getUsers(req, function(rows_data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows_data));
    });
});

router.get('/lookup', function(req, res, next) {
    UserModelObj.lookupUsers(function(rows_data) {
        if (rows_data == false) {
            res.send(false);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows_data));
        }
    });
});

module.exports = router;