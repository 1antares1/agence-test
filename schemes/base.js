"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var poolConnection;
var sqlConnection;
var sqlConfig = {
    host: "br-cdbr-azure-south-b.cloudapp.net",
    port: 3306,
    user: "bb1c35f730a5d0",
    password: "1e4befcb",
    database: "agencedb",
    connectTimeout: 25000
};
var handleDisconnect = function (callback) {
    try {
        sqlConnection = mysql.createConnection(sqlConfig);
        sqlConnection.connect(function (err) {
            if (err) {
                console.log("error when connecting to db: ", err);
                setTimeout(handleDisconnect, 1000);
            }
        });
        sqlConnection.on("error", function (err) {
            console.log("db error: ", err);
            handleDisconnect();
        });
    }
    catch (e) {
        if (callback)
            callback(e);
    }
};
handleDisconnect();
var BaseScheme = (function () {
    function BaseScheme() {
    }
    BaseScheme.prototype.tryCreateSqlConnection = function () {
        handleDisconnect();
        return this.sqlConnection = sqlConnection;
    };
    BaseScheme.prototype.tryGetSqlConnection = function (callback) {
        var _this = this;
        var _callbackSuccess = function (connect) {
            sqlConnection = (_this.sqlConnection = connect);
            callback(null, sqlConnection);
        };
        try {
            if (sqlConnection) {
                _callbackSuccess(sqlConnection);
            }
        }
        catch (e) {
            callback(e, null);
        }
    };
    ;
    BaseScheme.prototype.tryCloseSqlConnection = function (callback) {
        try {
            sqlConnection.connect(function (err) {
                if (err) {
                    console.error("error ending connection: " + err.stack);
                    callback(false, err);
                    return;
                }
                callback(true, sqlConnection);
            });
        }
        catch (e) {
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