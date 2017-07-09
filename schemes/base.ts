import * as mysql from "mysql";

let poolConnection: mysql.IPool;
let sqlConfig: mysql.IPoolConfig = {
    host: "br-cdbr-azure-south-b.cloudapp.net",
    port: 3306,
    user: "bb1c35f730a5d0",
    password: "1e4befcb",
    database: "agencedb",
    connectTimeout: 25000,
    waitForConnections: true,
    connectionLimit: 4
};

export function handleDatabase(callback ? : (err: any, poolConnect: mysql.IPool) => void): void {
    try {
        poolConnection = mysql.createPool(sqlConfig);
        poolConnection.getConnection((err: mysql.IError, connection: mysql.IConnection) => {
            if (err) {
                if(callback) callback({"error": err.message, "stack": err.stack}, null);
                return;
            }
            console.log("connected as id " + connection.threadId);

            connection.on("error", (err) => {
                if (callback) callback({
                    "error": err.message,
                    "stack": err.stack
                }, null);
                return;
            });
            if (callback) callback(null, poolConnection);
        });
    } catch (e) {
        if (callback) callback(e, null);
    }
}

handleDatabase();

export default class BaseScheme {
    sqlConnection: mysql.IPool;

    constructor() {}

    tryCreateSqlConnection(): mysql.IPool {
        return this.sqlConnection = poolConnection;
    }

    tryGetSqlConnection(init: boolean, callback: (reason: mysql.IError, poolConnect: mysql.IPool) => void): void {
        let _callbackSuccess = (connect: mysql.IPool): void => {
            poolConnection = (this.sqlConnection = connect);
            callback(null, poolConnection);
        };

        try {
            if(init) {
                handleDatabase((err: any, poolConnect: mysql.IPool) => {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    _callbackSuccess(poolConnect);
                });
            }
            else {
                 _callbackSuccess(poolConnection);
            }

        } catch (e) {
            callback(e, null);
        }
    };

    tryCloseSqlConnection(callback ? : (success: boolean, result: any) => void): void {
        try {
            poolConnection.end((err: mysql.IError) => {
                (err) ? callback(false, err): callback(true, null);
            });
        } catch (e) {
            callback(false, e);
        }
    }
}