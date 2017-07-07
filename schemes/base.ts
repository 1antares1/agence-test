import * as mysql from "mysql";

let poolConnection: mysql.IPool;
let sqlConnection: mysql.IConnection;
let schemeOn: boolean = false;

export default class BaseScheme {
    sqlConnection: mysql.IConnection;

    constructor() {
        if(!poolConnection) {
            schemeOn = false;
            poolConnection = mysql.createPool({
                host: "br-cdbr-azure-south-b.cloudapp.net",
                port: 3306,
                user: "bb1c35f730a5d0",
                password: "1e4befcb",
                database: "agencedb",
                connectionLimit: 4,
                waitForConnections: true,
                queueLimit: 0
            });
        }
        else {
            schemeOn = true;
            this.sqlConnection = sqlConnection;
        }
    }

    tryGetSqlConnection(callback: (reason: mysql.IError, connection: mysql.IConnection) => void): void {
        try {
            poolConnection.getConnection((err: mysql.IError, myConnection: mysql.IConnection) => {
                if (err) {
                    console.error("error connecting: " + err.stack);
                    schemeOn = false;
                    callback(err, null);
                    return;
                }
                schemeOn = true;
                sqlConnection = (this.sqlConnection = myConnection);
                callback(null, sqlConnection);
            });
        } catch (e) {
            schemeOn = false;
            callback(null, e);
        }
    };

    tryCloseSqlConnection(callback?: (success: boolean, result: any) => void): void {
        try {
            poolConnection.getConnection((err: mysql.IError, sqlConnection: mysql.IConnection) => {
                if (err) {
                    console.error("error ending connection: " + err.stack);
                    callback(false, err);
                    return;
                }
                callback(true, sqlConnection);
            });
        } catch (e) {
            schemeOn = false;
            callback(false, e);
        }
    }

    releaseConnection(connection: mysql.IConnection, ending?: boolean): void {
        if(connection) {
            connection.release();
            if(ending) {
                this.tryCloseSqlConnection();
            }
        }
    }
}