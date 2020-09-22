var express = require('express');
var router = express.Router();
router.get('/', get_data_details, function(req, res, next) {

    let data = req.data_details;

    try {
        if (!req.session.sc) {
            res.render('pages/home/security_check');
        } else {
            res.redirect('tasks');
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/security_check', function(req, res, next) {

    if (req.body.code == "Etiop") {
        req.session.sc = true;
        res.redirect('tasks');
    } else {
        res.redirect('/');
    }
});

/* GET users listing. */
router.get('/tasks',get_data_details, function(req, res, next) {
    var data = req.data_details;

    data.title = "tasks";
    data.page_id = "home-tasks";
    data.plugins.push("jquery_ui-interactions", "switch", "sticky", "bootbox", "datatables", "validator","select2");
    data.page_assets.css = true;
    data.page_assets.js = true;
    data.page_assets.js_module = false;
    data.breadcrumb.push();
    res.render('index', data);
});

//Get Taks List
router.post('/getTasksList', function(req, res, next) {
    //var queryString = url.parse(req.url, true);
    TaskModelModelObj.getTasksList(req.body, function(rows_data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows_data));
    });
});



module.exports = router;