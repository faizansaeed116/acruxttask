module.exports = class KnexClass {

    constructor() {
        appLogs.info("Checking Active Database.");
        let activeDB = _GD.ActiveDB();
        appLogs.info("Active Database is " + activeDB.CONNNAME + ". Setting Up Database Connection");
        
        
        this._DBCLIENT = (activeDB.CLIENT || null);

        this._USER = (activeDB.USER || "hr");
        this._PASSWORD = (activeDB.PASSWORD || "");
        this._VERSION = (activeDB.VERSION? (":" + activeDB.VERSION) : null);
        this._CONNECTIONSTRING = ((activeDB.IP || "localhost") + (activeDB.PORT? (":" + activeDB.PORT) : "") + (activeDB.SERVICENAME? ("/" + activeDB.SERVICENAME) : ""));
        
        this._DB = (activeDB.DB || "dbcrm");

        // this._EXTERNALAUTH = (activeDB.EXTERNALAUTH ? true : false);

        this._POOLMIN = (activeDB.POOLMIN || 2);
        this._POOLMAX = (activeDB.POOLMAX || 50);
        // this._POOLTIMEOUT = (activeDB.POOLTIMEOUT || 10);
        // this._QUEUETIMEOUT = (activeDB.QUEUETIMEOUT || 10000);
        this.knex = null;
    }

    CreateDbConnection() {
        this.knex = require('knex')({
            client: this._DBCLIENT,
            version: this._VERSION,
            connection: {
                user: this._USER,
                password: this._PASSWORD,
                host: this._CONNECTIONSTRING,
                database: this._DB
            },
            debug: false,
            fetchAsString: ['number', 'clob'],
            acquireConnectionTimeout: 843600000,
            pool: {
                min: this._POOLMIN,
                max: this._POOLMAX,
                acquireTimeoutMillis: 100000,
                idleTimeoutMillis: 100000
            }
        });
    }

    checkPoolStatus(callback) {
        try {
            appLogs.debug("Checking Pool Status");

            var perUsage = 0;
            var connectionsInUse = this.knex.client.pool.numUsed();

            if (connectionsInUse > 0) {
                perUsage = (connectionsInUse / this._POOLMAX) * 100;
            }

            if (perUsage <= 80) {
                appLogs.debug("Connections in use: " + connectionsInUse + " of " + this._POOLMAX + "(" + perUsage + "%)");
                return callback(true, this.knex);
            } else {
                if (perUsage <= 99) {
                    appErrorLogs.warn("Connections in use: " + connectionsInUse + " of " + this._POOLMAX + "(" + perUsage + "%)");
                    return callback(true, this.knex);
                } else {
                    appErrorLogs.error("Connection pool usage is " + connectionsInUse + " of " + this._POOLMAX + "(" + perUsage + "%). Unable to get new connection.");
                    return callback(false, {});
                }
            }
        } catch (err) {
            appErrorLogs.info("Connection Error");
            appErrorLogs.error(err);
            return callback(false);
        }
    }

    // Function to get connection from Pool
    GetConnection(callback) {
        return (async () => {
            try {
                this.checkPoolStatus(function (status, connection) {
                    if (status == true) {
                        appLogs.debug("Getting connection from pool.");
                        return callback(connection);
                    } else {
                        appErrorLogs.warn("Connection from pool not available.");
                        return callback(false);
                    }
                });
            } catch (err) {
                appErrorLogs.info("Unable to get connection.");
                appErrorLogs.error(err);
                return callback(false);
            }
        })();
    }

    checkConnection(userId, callback) {
        try {
            this.GetConnection(function (conn) {
                if (conn) {

                    let query = conn.select(['ID']);
                    query.from('TBL_CRM_USR');
                    query.where("ID", userId);

                    query.then(function (rows) {
                        return callback({
                            status: true,
                            msg: 'Connected to database'
                        });
                    }).catch(function (err) {
                        appErrorLogs.error(err);
                        return callback({
                            status: false,
                            msg: 'Unable to connect to database'
                        });
                    });
                }
            })
        } catch (err) {
            appErrorLogs.error(err);
            return callback({
                status: false,
                msg: 'Unable to connect to database'
            });
        }
    }
}