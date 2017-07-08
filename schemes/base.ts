import * as mysql from "mysql";

let poolConnection: mysql.IPool;
let sqlConnection: mysql.IConnection;
let sqlConfig: mysql.IConnectionConfig = {
    host: "35.192.51.41",
    port: 3306,
    user: "root",
    password: "_4dm1nPa$$w0rd-",
    database: "agencedb",
    connectTimeout: 25000
};

let handleDisconnect = (callback ? : (err: mysql.IError) => void): void => {
    try {
        sqlConnection = mysql.createConnection(sqlConfig);
        sqlConnection.connect((err: mysql.IError) => {
            if (err) {
                console.log("error when connecting to db: ", err);
                setTimeout(handleDisconnect, 1000);
            }
        }); 

        sqlConnection.on("error", (err: mysql.IError) => {
            console.log("db error: ", err);
            handleDisconnect();
        });
    } catch (e) {
        if (callback) callback(e);
    }
}

handleDisconnect();

export default class BaseScheme {
    sqlConnection: mysql.IConnection;

    constructor() { }

    tryCreateSqlConnection(): mysql.IConnection {
        handleDisconnect();
        return this.sqlConnection = sqlConnection;
    }

    tryGetSqlConnection(callback: (reason: mysql.IError, connection: mysql.IConnection) => void): void {
        let _callbackSuccess = (connect: mysql.IConnection): void => {
            sqlConnection = (this.sqlConnection = connect);
            callback(null, sqlConnection);
        };

        try {
            if (sqlConnection) {
                _callbackSuccess(sqlConnection);
            }
        } catch (e) {
            callback(e, null);
        }
    };

    tryCloseSqlConnection(callback ? : (success: boolean, result: any) => void): void {
        try {
            sqlConnection.connect((err: mysql.IError) => {
                if (err) {
                    console.error("error ending connection: " + err.stack);
                    callback(false, err);
                    return;
                }
                callback(true, sqlConnection);
            });
        } catch (e) {
            callback(false, e);
        }
    }

    releaseConnection(connection: mysql.IConnection, ending ? : boolean): void {
        if (connection) {
            connection.release();
            if (ending) {
                this.tryCloseSqlConnection();
            }
        }
    }
}