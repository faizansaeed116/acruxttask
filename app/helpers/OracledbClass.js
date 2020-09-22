module.exports = class OracledbClass {

    constructor() {
        this._USER = (SysConfig.ORACLEDB.USER || "hr");
        this._PASSWORD = (SysConfig.ORACLEDB.PASSWORD || "");
        this._CONNECTIONSTRING = ((SysConfig.ORACLEDB.IP || "localhost") + ":" + (SysConfig.ORACLEDB.PORT || "1521") + "/" + (SysConfig.ORACLEDB.SERVICENAME || "dbcrm"));
        this._EXTERNALAUTH = (SysConfig.ORACLEDB.EXTERNALAUTH ? true : false);

        this._POOLMIN = (SysConfig.ORACLEDB.POOLMIN || 2);
        this._POOLMAX = (SysConfig.ORACLEDB.POOLMAX || 50);
        this._POOLTIMEOUT = (SysConfig.ORACLEDB.POOLTIMEOUT || 10);
        this._QUEUETIMEOUT = (SysConfig.ORACLEDB.QUEUETIMEOUT || 10000);
    }

    // Create Connection Pool when app is initialized
    CreatePool(poolAlias, callback) {
        return (async () => {
            try {
                appLogs.info("Creating Pool: " + poolAlias);

                var dbConfig = {
                    user: this._USER,
                    password: this._PASSWORD,
                    connectString: this._CONNECTIONSTRING,
                    externalAuth: this._EXTERNALAUTH,
                    poolAlias: poolAlias,
                    poolMin: this._POOLMIN,
                    poolMax: this._POOLMAX,
                    poolTimeout: this._POOLTIMEOUT,
                    queueTimeout: this._QUEUETIMEOUT, // The number of milliseconds after which connection requests waiting in the connection request queue are terminated.
                    // poolIncrement: 5 // The number of connections that are opened whenever a connection request exceeds the number of currently open connections.
                };

                await oracledb.createPool(dbConfig);
                appLogs.debug("Pool Created: " + poolAlias);
                return callback(true);

            } catch (err) {
                appErrorLogs.error(err);
                return callback(false);
            }
        })();
    }

    checkPoolStatus(poolAlias) {
        appLogs.debug("Checking Pool Status: rpool");
        var pool = oracledb.getPool(poolAlias);
        appLogs.debug(poolAlias + " Connections in use: " + pool.connectionsInUse);

        var perUsage = 0;

        if (pool.connectionsInUse > 0) {
            perUsage = (pool.connectionsInUse / this._POOLMAX) * 100;
        }

        if (perUsage <= 80) {
            appLogs.debug(poolAlias + " Connections in use: " + pool.connectionsInUse + "(" + perUsage + "%)");
            return true;
        } else {
            if (perUsage <= 99) {
                appErrorLogs.warn(poolAlias + " Connections in use: " + pool.connectionsInUse + "(" + perUsage + "%)");
                return true;
            } else {
                appErrorLogs.error(poolAlias + " Connection pool usage is " + pool.connectionsInUse + "(" + perUsage + "%). Unable to get new connection.");
                return false;
            }
        }
    }

    // Private function to get connection from Pool
    _GetConnection(poolAlias) {
        return (async () => {
            try {
                if (this.checkPoolStatus(poolAlias)) {
                    appLogs.debug("Getting connection from pool: " + poolAlias);
                    const connection = await oracledb.getConnection({ poolAlias: poolAlias });
                    return connection;
                } else {
                    return false;
                }
            } catch (err) {
                appErrorLogs.error(err);
                return false;
            }
        })();
    }

    ExecSelect(sql, binds, options, callback) {
        return (async () => {
            let connection = null;
            let result = null;

            try {
                options.outFormat = oracledb.OUT_FORMAT_OBJECT;

                connection = await this._GetConnection('rpool');

                if (connection) {
                    result = await connection.execute(sql, binds, options);
                } else {
                    appErrorLogs.error("Unable to get connection from Pool: rpool");
                }

            } catch (err) {
                appErrorLogs.error(err);
                return callback(false);
            } finally {
                if (connection) {
                    connection.close();
                }

                if (result && (result.rows).length > 0) {
                    return callback(result.rows);
                } else {
                    return callback(false);
                }
            }
        })();

        // EXAMPLE
        // sql = `SELECT * FROM no_example`;

        // binds = {};
        // options = {};

        // RDBCOMM = ODB.ExecSelect(sql, binds, options, function (result) {
        //     console.log(result);
        // });
    }

    ExecDelete(sql, binds, options, callback) {
        return (async () => {
            let connection = null;
            let result = null;
            
            try {
                connection = await this._GetConnection('wpool');

                if (connection) {
                    result = await connection.execute(sql, binds, options);
                } else {
                    appErrorLogs.error("Unable to get connection from Pool: wpool");
                }
            } catch (err) {
                appErrorLogs.error(err);
                return callback(false);
            } finally {
                if (connection) {
                    connection.close();
                }

                if (result) {
                    return callback(result);
                } else {
                    return callback(false);
                }
            }
        })();

        // EXAMPLE
        // sql = `DELETE FROM no_example WHERE ID=:1`;

        // binds = {};
        // options = {};

        // RDBCOMM = ODB.ExecDelete(sql, binds, options, function (result) {
        //     console.log(result);
        // });
    }

    ExecInsert(sql, binds, options, callback) {
        return (async () => {
            let connection = null;
            let result = null;
            
            try {
                options.autoCommit = true;

                connection = await this._GetConnection('wpool');

                if (connection) {
                    result = await connection.execute(sql, binds, options);
                } else {
                    appErrorLogs.error("Unable to get connection from Pool: wpool");
                }

            } catch (err) {
                appErrorLogs.error(err);
                return callback(false);
            } finally {
                if (connection) {
                    connection.close();
                }

                if (result) {
                    return callback(result);
                } else {
                    return callback(false);
                }
            }
        })();

        // EXAMPLE
        // sql = `INSERT INTO no_example VALUES (:1, :2)`;

        // binds = [101, "Alpha"];

        // options = {
        // };

        // RDBCOMM = ODB.ExecInsert(sql, binds, options, function (result) {
        //     console.log(result);
        // });
    }

    ExecInsertMany(sql, binds, options, callback) {
        return (async () => {
            let connection = null;
            let result = null;
            
            try {
                connection = await this._GetConnection('wpool');

                if (connection) {
                    result = await connection.execute(sql, binds, options);
                } else {
                    appErrorLogs.error("Unable to get connection from Pool: wpool");
                }

            } catch (err) {
                appErrorLogs.error(err);
                return callback(false);
            } finally {
                if (connection) {
                    connection.close();
                }

                if (result) {
                    return callback(result);
                } else {
                    return callback(false);
                }
            }
        })();

        // EXAMPLE
        // sql = `INSERT INTO no_example VALUES (:1, :2)`;

        // binds = [
        //     [101, "Alpha"],
        //     [102, "Beta"],
        //     [103, "Gamma"]
        // ];

        // options = {
        // };

        // RDBCOMM = ODB.ExecInsertMany(sql, binds, options, function (result) {
        //     console.log(result);
        // });
    }

    ExecDropTable(tablename, callback) {
        return (async () => {
            let connection = null;
            let result = null;
            
            try {
                var sql = `DROP TABLE ` + tablename;

                connection = await this._GetConnection('wpool');

                if (connection) {
                    result = await connection.execute(sql);
                } else {
                    appErrorLogs.error("Unable to get connection from Pool: wpool");
                }

                return callback(result);
            } catch (err) {
                appErrorLogs.error(err);
                return callback(false);
            } finally {
                if (connection) {
                    connection.close();
                }

                if (result) {
                    return callback(result);
                } else {
                    return callback(false);
                }
            }
        })();

        // EXAMPLE
        // RDBCOMM = ODB.ExecDropTable('no_example', function (result) {
        //     console.log(result);
        // });
    }

    ExecCreateTable(tablename, columns, callback) {
        return (async () => {
            let connection = null;
            let result = null;
            
            try {
                var sql = `CREATE TABLE ` + tablename + ` ` + columns;

                connection = await this._GetConnection('wpool');

                if (connection) {
                    result = await connection.execute(sql);
                } else {
                    appErrorLogs.error("Unable to get connection from Pool: wpool");
                }

                return callback(result);
            } catch (err) {
                appErrorLogs.error(err);
                return callback(false);
            } finally {
                if (connection) {
                    connection.close();
                }

                if (result) {
                    return callback(result);
                } else {
                    return callback(false);
                }
            }
        })();

        // EXAMPLE
        // RDBCOMM = ODB.ExecCreateTable('no_example', columns, function (result) {
        //     console.log(result);
        // });
    }

}