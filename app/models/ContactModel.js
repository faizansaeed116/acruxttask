module.exports = class ContactModel {

    constructor() {}
    getContactsList(params, callback) {
        try {
            ODB.GetConnection(function(conn) {
                var whereData = [];
                var where_query = '';
                
                if (params.search['s_email'] != '') {
                    where_query = " USERS.EMAIL LIKE ? ";
                    whereData.push("%" + params.search['s_email'] + "%");
                }
                if (params.search['s_fname'] != '') {
                    if (where_query != '')
                        where_query += " OR USERS.FNAME LIKE ? ";
                    else
                        where_query += " USERS.FNAME LIKE ? ";
                    whereData.push("%" + params.search['s_fname'] + "%");
                }
                if (params.search['s_lname'] != '') {
                    if (where_query != '')
                        where_query += " OR USERS.LNAME LIKE ? ";
                    else
                        where_query += " USERS.LNAME LIKE ? ";
                    whereData.push("%" + params.search['s_lname'] + "%");
                }
                if (params.search['s_city'] != '') {
                    if (where_query != '')
                        where_query += " OR USERS.CITY LIKE ? ";
                    else
                        where_query += " USERS.CITY LIKE ? ";
                    whereData.push("%" + params.search['s_city'] + "%");
                }

                conn.count('USERS.ID as count').from('USERS')
                .where('USERS.ISDEL', 0)
                .whereRaw(where_query, whereData)
                .then(function(rows_count) {

                        if (rows_count[0].count > 0) {

                            var page_length = parseInt(params.length);
                            page_length = (page_length < 0) ? result[0]['count'] : page_length;

                            var display_start = parseInt(params.start);
                            display_start = display_start < 0 ? 0 : display_start;

                            try {
                                ODB.GetConnection(function(conn) {
                                    conn.select([
                                            'USERS.ID',
                                            'USERS.FNAME',
                                            'USERS.MNAME',
                                            'USERS.LNAME',
                                            'USERS.EMAIL',
                                            'USERS.PHONE',
                                            'USERS.ADDRESS',
                                            'USERS.CITY',
                                            'USERS.COMPANY',
                                            'USERS.ROLE',
                                            'USERS.TITLE'
                                        ]).from('USERS')
                                        .where('USERS.ISDEL', 0)
                                        .whereRaw(where_query, whereData)
                                        .orderBy(parseInt(params.order['0'].column) + 2, params.order['0'].dir)
                                        .limit(page_length)
                                        .offset(display_start)
                                        .then(function(rows) {
                                            var records = {
                                                draw: params.draw,
                                                recordsTotal: rows_count[0].count,
                                                recordsFiltered: rows_count[0].count,
                                                data: rows
                                            };
                                            return callback(records);
                                        });
                                });
                            } catch (err) {
                                appErrorLogs.error(err);
                                var records = {
                                    draw: params.draw,
                                    recordsTotal: 0,
                                    recordsFiltered: 0,
                                    data: []
                                };
                                return callback(records);
                                // return callback([], false, "Users not found");
                            }


                        } else {
                            var records = {
                                draw: params.draw,
                                recordsTotal: 0,
                                recordsFiltered: 0,
                                data: []
                            };
                            return callback(records);
                            //return callback([], false, "Users not Exists");
                        }
                    });
            });
        } catch (err) {
            appErrorLogs.error(err);
            var records = {
                draw: params.draw,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
            };
            return callback(records);
            //return callback([], false, "Users not found");
        }

    }
    //Create new user
    createUser(formdata, callback) {
        var userData = formdata;
        var values = {
            "USERS.FNAME":   userData.firstname,
            "USERS.MNAME":   userData.middlename,
            "USERS.LNAME":   userData.lastname,
            "USERS.EMAIL":   userData.useremail,
            "USERS.GENDER":  userData.usergender,
            "USERS.PHONE":   userData.userphone ,
            "USERS.ADDRESS": userData.useraddress,
            "USERS.CITY":    userData.usercity,
            "USERS.COMPANY": userData.usercompany,
            "USERS.TITLE":   userData.usertitle,
            "USERS.ROLE":    userData.userrole,
            "USERS.ISDEL" :  0
        };

        ODB.GetConnection(function(conn) {
            conn.insert(values).into('USERS')
                .then(function() {
                    return callback([], true, "User Created");
                }).catch(function(err) {
                    console.log(err);
                    appErrorLogs.error(err);
                    return callback([], false, "User not Created");
                });
        });
    }
    //Get User Details
    getUserDetails(id, callback) {
        try {
            ODB.GetConnection(function(conn) {
                conn.select([
                    "USERS.FNAME",
                    "USERS.MNAME",
                    "USERS.LNAME",
                    "USERS.EMAIL",
                    "USERS.GENDER",
                    "USERS.PHONE",
                    "USERS.ADDRESS",
                    "USERS.CITY",
                    "USERS.COMPANY",
                    "USERS.TITLE",
                    "USERS.ROLE"
                    ])
                    .from('USERS').where({
                        'USERS.ID': id
                    }).then(function(rows) {
                        if (rows.length > 0) {
                            return callback(rows[0], true, "User record exists");
                        } else {
                            return callback([], false, "User record does not exists");
                        }
                    });
            });
        } catch (err) {
            appErrorLogs.error(err);
            return callback([], false, "User record not found");
        }
    }

    //update User Details
    updateUser(formdata, callback) {
        
        var userData = formdata;
        var values = {
            "USERS.FNAME": userData.firstname,
            "USERS.MNAME": userData.middlename,
            "USERS.LNAME": userData.lastname,
            "USERS.EMAIL": userData.useremail,
            "USERS.GENDER": userData.usergender,
            "USERS.PHONE": userData.userphone ,
            "USERS.ADDRESS": userData.useraddress,
            "USERS.CITY": userData.usercity,
            "USERS.COMPANY": userData.usercompany,
            "USERS.TITLE": userData.usertitle,
            "USERS.ROLE": userData.userrole
        };
       
        ODB.GetConnection(function(conn) {
            conn('USERS').where({
                'USERS.ID': userData.id
            })
            .update(values)
            .then(function() {
                return callback([], true, "User record updated");
            }).catch(function(err) {
                appErrorLogs.error(err);
                return callback([], false, "User record not updated");

            });
        });
    }

    deleteUser(ID, callback) {
        var userID = ID;
        var values = {
            "USERS.ISDEL": 1,
        };
        ODB.GetConnection(function(conn) {
            conn('USERS').where({
                'USERS.ID': userID
            }).update(values).then(function() {
                return callback({
                    data: [],
                    status: true,
                    msg: "Deleted User"
                });
            }).catch(function(err) {
                console.log(err);
                appErrorLogs.error(err);
                return callback({
                    data: [],
                    status: false,
                    msg: "Unable To Delete User"
                });

            });
        });
    }

    //check if email is already exist
    checkuseremailExists(email, callback) {
        try {
            ODB.GetConnection(function(conn) {
                conn.select(['USERS.ID']).from('USERS').where({
                    'USERS.EMAIL': email
                }).then(function(rows) {
                    if (rows.length > 0) {
                        return callback([], true, "Email Exists");
                    } else {
                        return callback([], false, "Email not Exists");
                    }
                });
            });
        } catch (err) {
            appErrorLogs.error(err);
            return callback([], false, "User not found");
        }
    }

    checkEmailExistsId(email, uid, callback) {
        try {
            ODB.GetConnection(function(conn) {
                conn.select(['USERS.ID']).from('USERS').where({
                    'EMAIL': email
                }).whereNot({
                    'ID': uid
                }).then(function(rows) {
                    if (rows.length > 0) {
                        return callback([], true, "Email Exists");
                    } else {
                        return callback([], false, "Email not Exists");
                    }
                });
            });
        } catch (err) {
            appErrorLogs.error(err);
            return callback([], false, "User not found");
        }
    }
}

