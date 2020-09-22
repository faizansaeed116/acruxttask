var md5 = require('md5');

module.exports = class UserModel {

    constructor() {}

    authenticateUser(username, password, callback) {
        try {
            ODB.GetConnection(function(conn) {
                conn.select(['ID', 'FNAME', 'LNAME', 'EMAIL', 'UNAME', 'PASSD', 'ISACT', 'UROLE', 'DEPID']).from('TBL_CRM_USR').where({
                    'EMAIL': username
                }).orWhere({
                    'UNAME': username
                }).then(function(rows) {
                    if (rows.length > 0) {
                        var user_details = rows[0];

                        var test_password = md5((md5(user_details.UNAME)) + (md5(password)));

                        if (test_password == user_details.PASSD) {
                            if (user_details.ISACT == 1) {
                                var values = {
                                    "LLOGN": moment().format(_GD.FORMATS.DB.DATETIME),
                                };
                                ODB.GetConnection(function(conn) {
                                    conn('TBL_CRM_USR').where({
                                            'ID': user_details.ID
                                        })
                                        .update(values)
                                        .then(function() {
                                            return callback(user_details, true, "User Login Successful");
                                            // return callback([], true, "User last login updated");
                                        }).catch(function(err) {
                                            appErrorLogs.error(err);
                                            return callback([], false, "Unknown Error");
                                            // return callback([], false, "User last login not updated");

                                        });
                                });

                            } else {
                                return callback([], false, "User Inactive");
                            }
                        } else {
                            return callback([], false, "Invalid Password");
                        }
                    } else {
                        return callback([], false, "User not found");
                    }
                });
            });
        } catch (err) {
            appErrorLogs.error(err);
            return callback([], false, "User not found");
        }
    }

    createUser(formdata, callback) {
        var password = md5((md5(formdata.username)) + (md5(formdata.password)));

        var values = {
            "FNAME": formdata.first_name,
            "LNAME": formdata.last_name,
            "EMAIL": formdata.email,
            "UNAME": formdata.username,
            "PASSD": password,
            "CUSER": formdata.cuser,
            "DEPID": formdata.department,
            "UROLE": formdata.role,
            "ISACT": 1
        };

        ODB.GetConnection(function(conn) {
            conn.insert(values).into('TBL_CRM_USR')
                .then(function() {
                    return callback([], true, "User Created");
                }).catch(function(err) {
                    console.log(err);
                    appErrorLogs.error(err);
                    return callback([], false, "User not Created");
                });
        });
    }

    editUser(formdata, callback) {
        if (formdata.password != '' && formdata.password != null) {
            var password = md5((md5(formdata.username)) + (md5(formdata.password)));
        }
        var values = {
            "FNAME": formdata.first_name,
            "LNAME": formdata.last_name,
            "EMAIL": formdata.email,
            "UNAME": formdata.username,
            "MUSER": formdata.muser,
            "ISACT": formdata.status,
            "UROLE": formdata.role,
            "DEPID": formdata.department,
        };
        if (formdata.password != '' && formdata.password != null) {
            var password = md5((md5(formdata.username)) + (md5(formdata.password)));
            values.PASSD = password;
        }
        ODB.GetConnection(function(conn) {
            conn('TBL_CRM_USR').where({
                    'ID': formdata.uid
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
        var values = {
            "ISDEL": 1,
            "ISACT": 0,
        };
        ODB.GetConnection(function(conn) {
            conn('TBL_CRM_USR').where({
                'ID': ID
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

    checkEmailExists(email, callback) {
        try {
            ODB.GetConnection(function(conn) {
                conn.select(['ID']).from('TBL_CRM_USR').where({
                    'EMAIL': email
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

    checkUsernameExists(username, callback) {
        try {
            ODB.GetConnection(function(conn) {
                conn.select(['ID']).from('TBL_CRM_USR').where({
                    'UNAME': username
                }).then(function(rows) {
                    if (rows.length > 0) {
                        return callback([], true, "UNAME Exists");
                    } else {
                        return callback([], false, "UNAME not Exists");
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
                conn.select(['ID']).from('TBL_CRM_USR').where({
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

    checkUsernameExistsId(username, uid, callback) {
        try {
            ODB.GetConnection(function(conn) {
                conn.select(['ID']).from('TBL_CRM_USR').where({
                    'UNAME': username
                }).whereNot({
                    'ID': uid
                }).then(function(rows) {
                    if (rows.length > 0) {
                        return callback([], true, "UNAME Exists");
                    } else {
                        return callback([], false, "UNAME not Exists");
                    }
                });
            });
        } catch (err) {
            appErrorLogs.error(err);
            return callback([], false, "User not found");
        }
    }

    getDatatablesList(params, callback) {
        try {
            ODB.GetConnection(function(conn) {
                var whereData = [];

                var where_query = '';
                if (params.search['s_email'] != '') {
                    where_query = " TBL_CRM_USR.EMAIL LIKE ? ";
                    whereData.push("%" + params.search['s_email'] + "%");
                }
                if (params.search['s_username'] != '') {
                    if (where_query != '')
                        where_query += " OR TBL_CRM_USR.UNAME LIKE ? ";
                    else
                        where_query += " TBL_CRM_USR.UNAME LIKE ? ";
                    whereData.push("%" + params.search['s_username'] + "%");
                }
                if (params.search['s_name'] != '') {
                    if (where_query != '')
                        where_query += " OR TBL_CRM_USR.FNAME LIKE ? ";
                    else
                        where_query += " TBL_CRM_USR.FNAME LIKE ? ";
                    whereData.push("%" + params.search['s_name'] + "%");
                }
                if (params.search['s_name'] != '') {
                    if (where_query != '')
                        where_query += " OR TBL_CRM_USR.LNAME LIKE ? ";
                    else
                        where_query += " TBL_CRM_USR.LNAME LIKE ? ";
                    whereData.push("%" + params.search['s_name'] + "%");
                }
                conn.count('TBL_CRM_USR.ID as count').from('TBL_CRM_USR').leftJoin('TBL_BUS_FUN', 'TBL_CRM_USR.DEPID', 'TBL_BUS_FUN.ID')
                    .where('TBL_CRM_USR.ISDEL', 0)
                    .whereNotIn('TBL_CRM_USR.UROLE', ['16'])
                    .whereRaw(where_query, whereData).then(function(rows_count) {
                        // console.log(params);
                        // console.log(params.search['s_email']);

                        if (rows_count[0].count > 0) {

                            var page_length = parseInt(params.length);
                            page_length = (page_length < 0) ? result[0]['count'] : page_length;

                            var display_start = parseInt(params.start);
                            display_start = display_start < 0 ? 0 : display_start;



                            try {
                                ODB.GetConnection(function(conn) {
                                    conn.select([
                                            'TBL_CRM_USR.ID',
                                            'TBL_CRM_USR.FNAME',
                                            'TBL_CRM_USR.UNAME',
                                            'TBL_CRM_USR.EMAIL',
                                            'TBL_CRM_USR.ISACT',
                                            'TBL_CRM_USR.LNAME',
                                            'TBL_CRM_USR.LLOGN',
                                            'TBL_BUS_FUN.FNAME as DNAME',
                                        ]).from('TBL_CRM_USR').leftJoin('TBL_BUS_FUN', 'TBL_CRM_USR.DEPID', 'TBL_BUS_FUN.ID')
                                        .where('TBL_CRM_USR.ISDEL', 0)
                                        .whereNotIn('TBL_CRM_USR.UROLE', ['16'])
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

    getUserDetails(id, callback) {
        try {
            ODB.GetConnection(function(conn) {
                conn.select([
                        'TBL_CRM_USR.ID',
                        'TBL_CRM_USR.FNAME',
                        'TBL_CRM_USR.UNAME',
                        'TBL_CRM_USR.EMAIL',
                        'TBL_CRM_USR.ISACT',
                        'TBL_CRM_USR.LNAME',
                        'TBL_CRM_USR.LLOGN',
                        'TBL_CRM_USR.DEPID',
                        'TBL_CRM_USR.UROLE',
                        'TBL_BUS_FUN.FNAME as DNAME'
                    ])
                    .from('TBL_CRM_USR').leftJoin('TBL_BUS_FUN', 'TBL_CRM_USR.DEPID', 'TBL_BUS_FUN.ID').where({
                        'TBL_CRM_USR.ID': id
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

    getUsers(id, callback) {
        try {
            ODB.GetConnection(function(conn) {
                conn.select([
                        'TBL_CRM_USR.ID',
                        'TBL_CRM_USR.FNAME',
                        'TBL_CRM_USR.UNAME',
                        'TBL_CRM_USR.EMAIL',
                        'TBL_CRM_USR.ISACT',
                        'TBL_CRM_USR.LNAME',
                        'TBL_CRM_USR.LLOGN',
                        'TBL_CRM_USR.DEPID',
                    ])
                    .from('TBL_CRM_USR')
                    .then(function(rows) {
                        if (rows.length > 0) {
                            return callback(rows, true, "User record exists");
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

    getDepartments(id, callback) {
        try {
            ODB.GetConnection(function(conn) {
                conn.select().from('TBL_BUS_FUN')
                    .then(function(rows) {
                        if (rows.length > 0) {
                            return callback(rows, true, "Departments record exists");
                        } else {
                            return callback([], false, "Departments record does not exists");
                        }
                    });
            });
        } catch (err) {
            appErrorLogs.error(err);
            return callback([], false, "Departments record not found");
        }
    }

    lookupUsers(CALLBACK) {
        let tbl_crm_usr = 'TBL_CRM_USR'

        try {
            ODB.GetConnection(function (conn) {

                try {
                    let query = conn.select([
                        tbl_crm_usr + '.ID',
                        tbl_crm_usr + '.FNAME',
                        tbl_crm_usr + '.LNAME',
                        tbl_crm_usr + '.ISACT',
                        tbl_crm_usr + '.ISDEL',
                    ]);
    
                    query.from(tbl_crm_usr)

                    query.then(function (rows) {

                        return CALLBACK({
                            data: rows,
                            status: true,
                            msg: "Users Found"
                        });

                    }).catch(function (err) {
                        console.log(err)
                        appErrorLogs.error(err)

                        return CALLBACK({
                            data: [],
                            status: false,
                            msg: "No Users Found"
                        });
                    })

                } catch (err) {
                    console.log(err)
                    appErrorLogs.error(err)

                    return CALLBACK({
                        data: [],
                        status: false,
                        msg: "Unable To Get Users"
                    });
                }

            })
        } catch (err) {
            console.log(err)
            appErrorLogs.error(err)

            return CALLBACK({
                data: [],
                status: false,
                msg: "Unable To Get Users"
            });
        }
    }
}