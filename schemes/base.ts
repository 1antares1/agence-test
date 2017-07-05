import * as mysql from "mysql";

export default class BaseScheme {
    connection: mysql.IConnection;
    public schemeOn: boolean = false;

    constructor() {
        this.connection = mysql.createConnection({
            host: "br-cdbr-azure-south-b.cloudapp.net",
            port: 3306,
            user: "bb1c35f730a5d0",
            password: "1e4befcb",
            database: "agencedb",
        });
    }

    tryGetSqlConnection(callback: (reason: mysql.IError, connection: mysql.IConnection) => void): void {
        try {
            this.connection.connect((err: mysql.IError) => {
                if (err) {
                    console.error("error connecting: " + err.stack);
                    this.schemeOn = false;
                    callback(err, null);
                    return;
                }
                this.schemeOn = true;
                callback(null, this.connection);
            });
        } catch (e) {
            this.schemeOn = false;
            callback(null, e);
        }
    };

    tryCloseSqlConnection(callback?: (success: boolean, result: any) => void): void {
        try {
            this.connection.connect((err: mysql.IError) => {
                this.schemeOn = false;
                if (err) {
                    console.error("error ending connection: " + err.stack);
                    callback(false, err);
                    return;
                }
                callback(true, this.connection);
            });
        } catch (e) {
            this.schemeOn = false;
            callback(false, e);
        }
    }

    releaseConnection(connection: mysql.IConnection, ending?: boolean): void {
        if(connection) {
            connection.destroy();
            if(ending) {
                this.tryCloseSqlConnection();
            }
        }
    }
}