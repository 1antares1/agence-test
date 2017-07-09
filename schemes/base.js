"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var poolConnection;
var sqlConfig = {
    host: "br-cdbr-azure-south-b.cloudapp.net",
    port: 3306,
    user: "bb1c35f730a5d0",
    password: "1e4befcb",
    database: "agencedb",
    connectTimeout: 25000,
    debug: false
};
function handleDatabase(callback) {
    try {
        poolConnection = mysql.createPool(sqlConfig);
        poolConnection.getConnection(function (err, connection) {
            if (err && callback) {
                callback({
                    "error": err.message,
                    "stack": err.stack
                }, null);
                return;
            }
            console.log("connected as id " + connection.threadId);
            connection.on("error", function (err) {
                if (callback)
                    callback({
                        "error": err.message,
                        "stack": err.stack
                    }, null);
                return;
            });
            if (callback)
                callback(null, poolConnection);
        });
    }
    catch (e) {
        if (callback)
            callback(e, null);
    }
}
exports.handleDatabase = handleDatabase;
handleDatabase();
var BaseScheme = (function () {
    function BaseScheme() {
    }
    BaseScheme.prototype.tryCreateSqlConnection = function () {
        return this.sqlConnection = poolConnection;
    };
    BaseScheme.prototype.tryGetSqlConnection = function (callback) {
        var _this = this;
        var _callbackSuccess = function (connect) {
            poolConnection = (_this.sqlConnection = connect);
            callback(null, poolConnection);
        };
        try {
            if (poolConnection) {
                _callbackSuccess(poolConnection);
            }
            else {
                handleDatabase(function (err, poolConnect) {
                    if (err) {
                        throw err;
                    }
                    _callbackSuccess(poolConnect);
                });
            }
        }
        catch (e) {
            callback(e, null);
        }
    };
    ;
    BaseScheme.prototype.tryCloseSqlConnection = function (callback) {
        try {
            poolConnection.end(function (err) {
                (err) ? callback(false, err) : callback(true, null);
            });
        }
        catch (e) {
            callback(false, e);
        }
    };
    return BaseScheme;
}());
exports.default = BaseScheme;
//# sourceMappingURL=base.js.map