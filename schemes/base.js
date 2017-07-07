"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var poolConnection;
var sqlConnection;
var schemeOn = false;
var getConnection = function () {
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
        sqlConnection.on("error", function (response) {
            getConnection();
        });
        sqlConnection.on("uncaughtException", function (response) {
            getConnection();
        });
        return sqlConnection;
    }
    catch (e) {
        console.log(e);
    }
};
getConnection();
var BaseScheme = (function () {
    function BaseScheme() {
        if (sqlConnection) {
            schemeOn = true;
            this.sqlConnection = sqlConnection;
        }
    }
    BaseScheme.prototype.tryCreateSqlConnection = function () {
        return getConnection();
    };
    BaseScheme.prototype.tryGetSqlConnection = function (callback) {
        var _this = this;
        var _callbackSuccess = function (connect) {
            schemeOn = true;
            sqlConnection = (_this.sqlConnection = connect);
            callback(null, sqlConnection);
        };
        try {
            sqlConnection.connect(function (err, args) {
                if (err) {
                    console.error("error connecting: " + err.stack);
                    schemeOn = false;
                    getConnection();
                    callback(err, null);
                    return;
                }
                _callbackSuccess(sqlConnection);
            });
        }
        catch (e) {
            schemeOn = false;
            poolConnection = null;
            getConnection();
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