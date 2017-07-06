"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var poolConnection;
var sqlConnection;
var schemeOn = false;
var BaseScheme = (function () {
    function BaseScheme() {
        if (!poolConnection) {
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
    BaseScheme.prototype.tryGetSqlConnection = function (callback) {
        var _this = this;
        try {
            poolConnection.getConnection(function (err, myConnection) {
                if (err) {
                    console.error("error connecting: " + err.stack);
                    schemeOn = false;
                    callback(err, null);
                    return;
                }
                schemeOn = true;
                sqlConnection = (_this.sqlConnection = myConnection);
                callback(null, sqlConnection);
            });
        }
        catch (e) {
            schemeOn = false;
            callback(null, e);
        }
    };
    ;
    BaseScheme.prototype.tryCloseSqlConnection = function (callback) {
        try {
            poolConnection.getConnection(function (err, sqlConnection) {
                schemeOn = false;
                if (err) {
                    console.error("error ending connection: " + err.stack);
                    callback(false, err);
                    return;
                }
                callback(true, sqlConnection);
            });
        }
        catch (e) {
            schemeOn = false;
            callback(false, e);
        }
    };
    BaseScheme.prototype.releaseConnection = function (connection, ending) {
        if (connection) {
            connection.release();
            if (ending) {
                this.tryCloseSqlConnection();
            }
        }
    };
    return BaseScheme;
}());
exports.default = BaseScheme;
//# sourceMappingURL=base.js.map