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
}