"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var BaseScheme = (function () {
    function BaseScheme() {
        this.schemeOn = false;
        this.connection = mysql.createConnection({
            host: "br-cdbr-azure-south-b.cloudapp.net",
            port: 3306,
            user: "bb1c35f730a5d0",
            password: "1e4befcb",
            database: "agencedb"
        });
    }
    BaseScheme.prototype.tryGetSqlConnection = function (callback) {
        var _this = this;
        try {
            this.connection.connect(function (err) {
                if (err) {
                    console.error("error connecting: " + err.stack);
                    _this.schemeOn = false;
                    callback(err, null);
                    return;
                }
                _this.schemeOn = true;
                callback(null, _this.connection);
            });
        }
        catch (e) {
            this.schemeOn = false;
            callback(null, e);
        }
    };
    ;
    BaseScheme.prototype.tryCloseSqlConnection = function (callback) {
        var _this = this;
        try {
            this.connection.connect(function (err) {
                _this.schemeOn = false;
                if (err) {
                    console.error("error ending connection: " + err.stack);
                    callback(false, err);
                    return;
                }
                callback(true, _this.connection);
            });
        }
        catch (e) {
            this.schemeOn = false;
            callback(false, e);
        }
    };
    BaseScheme.prototype.releaseConnection = function (connection, ending) {
        if (connection) {
            connection.destroy();
            if (ending) {
                this.tryCloseSqlConnection();
            }
        }
    };
    return BaseScheme;
}());
exports["default"] = BaseScheme;
