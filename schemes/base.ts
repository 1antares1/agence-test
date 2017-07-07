import * as mysql from "mysql";

let poolConnection: mysql.IPool;
let sqlConnection: mysql.IConnection;
let schemeOn: boolean = false;

 let getConnection = (): mysql.IConnection => {
    schemeOn = false;
    try {
        sqlConnection = mysql.createConnection({
            host: "br-cdbr-azure-south-b.cloudapp.net",
            port: 3306,
            user: "bb1c35f730a5d0",
            password: "1e4befcb",
            database: "agencedb",
            connectTimeout: 10000
        });
        
        sqlConnection.on("error", (response: any) => {
            getConnection();
        });

        sqlConnection.on("uncaughtException", (response: any) => {
            getConnection();
        });
        return sqlConnection;
    } catch(e) {
        console.log(e);
    }
}

getConnection();

export default class BaseScheme {
    sqlConnection: mysql.IConnection;

    constructor() {
        if(sqlConnection) {
            schemeOn = true;
            this.sqlConnection = sqlConnection;
        }
     }

    tryCreateSqlConnection(): mysql.IConnection {
        return getConnection();
    }

    tryGetSqlConnection(callback: (reason: mysql.IError, connection: mysql.IConnection) => void): void {
        let _callbackSuccess = (connect: mysql.IConnection): void => {
            schemeOn = true;
            sqlConnection = (this.sqlConnection = connect);
            callback(null, sqlConnection);
        };

        try {
            sqlConnection.connect((err: mysql.IError, args: any[]) => {
                if (err) {
                    console.error("error connecting: " + err.stack);
                    schemeOn = false;
                    getConnection();
                    callback(err, null);
                    return;
                }
                _callbackSuccess(sqlConnection);
            });
        } catch (e) {
            schemeOn = false;
            poolConnection = null;
            getConnection();
            callback(e, null);
        }
    };

    tryCloseSqlConnection(callback?: (success: boolean, result: any) => void): void {
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