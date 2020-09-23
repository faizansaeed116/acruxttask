module.exports = class TaskModel {

    constructor() {}
    getTasksList(params, callback) {
        try {
            ODB.GetConnection(function(conn) {
                var whereData = [];
                var where_query = '';
                
                
                conn.count('TASK.TID as count').from('TASK')
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
                                            'TASK.TID',
                                            'TASK.TITLE',
                                            'TASK.DESCRIPTION',
                                            'TASK.PRIORITY',
                                            'TASK.STATUS',
                                            'TASK.CREATEDAT',
                                            'TASK.LASTUPDATED',
                                            'TASK.ADDEDBY',
                                            'TASK.ASSIGNEDTO',
                                        ]).from('TASK')
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
                                // return callback([], false, "TASK not found");
                            }


                        } else {
                            var records = {
                                draw: params.draw,
                                recordsTotal: 0,
                                recordsFiltered: 0,
                                data: []
                            };
                            return callback(records);
                            //return callback([], false, "TASK not Exists");
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
            //return callback([], false, "TASK not found");
        }

    }

    //Create new Task
    createTask(formdata, callback) {
        var userData = formdata;
        var values = {
            "TASK.TITLE":   userData.title,
            "TASK.DESCRIPTION":   userData.requirement,
            "TASK.ASSIGNEDTO":   userData.assignedto,
            "TASK.PRIORITY":   userData.priority,
            "TASK.STATUS":  userData.status,
            "TASK.ADDEDBY": "FAIZAN",
            "TASK.CREATEDAT": moment().format('YYYY-MM-DD hh:mm:ss'),
        };
    
        ODB.GetConnection(function(conn) {
            conn.insert(values).into('Task')
                .then(function() {
                    return callback([], true, "Task Created");
                }).catch(function(err) {
                    console.log(err);
                    appErrorLogs.error(err);
                    return callback([], false, "Task not Created");
                });
        });
    }

 //Get User Details

 getTaskDetails(id, callback) {
     var tid = id;
     console.log(tid);
    try {
        ODB.GetConnection(function(conn) {
            conn.select([
                "TASK.TITLE",
                "TASK.DESCRIPTION",
                "TASK.ASSIGNEDTO",
                "TASK.STATUS",
                "TASK.PRIORITY"
                ])
                .from('TASK').where({
                    'TASK.TID': tid
                }).then(function(rows) {
                    if (rows.length > 0) {
                        return callback(rows[0], true, "Task record exists");
                    } else {
                        return callback([], false, "Task record does not exists");
                    }
                });
        });
    } catch (err) {
        appErrorLogs.error(err);
        return callback([], false, "Task record not found");
    }
}
}