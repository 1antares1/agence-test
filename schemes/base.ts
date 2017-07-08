import * as mysql from "mysql";

let poolConnection: mysql.IPool;
let sqlConnection: mysql.IConnection;
let sqlConfig: mysql.IPoolConfig = {
    host: "br-cdbr-azure-south-b.cloudapp.net",
    port: 3306,
    user: "bb1c35f730a5d0",
    password: "1e4befcb",
    database: "agencedb",
    connectTimeout: 25000,
    debug: false
};

export function handleDatabase(callback ? : (err: any) => void): void {
    try {
        poolConnection = mysql.createPool(sqlConfig);
        poolConnection.getConnection((err: mysql.IError, connection: mysql.IConnection) => {
            if (err && callback) {
                callback({"error": err.message, "stack": err.stack });
                return;
            }
            sqlConnection = connection;
            console.log("connected as id " + connection.threadId);

            connection.on("error", (err) => {
                if (callback) callback({"error": err.message, "stack": err.stack });
                return;
            });
        });
    } catch (e) {
        if (callback) callback(e);
    }
}

export default class BaseScheme {
    sqlConnection: mysql.IConnection;

    constructor() {}

    tryCreateSqlConnection(): mysql.IConnection {
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