"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var BaseScheme = (function () {
    function BaseScheme() {
        this.schemeOn = false;
        this.connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "_4dm1nPa$$w0rd-",
            database: "agencedb",
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
            connection.end();
            if (ending) {
                this.tryCloseSqlConnection();
            }
        }
    };
    return BaseScheme;
}());
exports.default = BaseScheme;
//# sourceMappingURL=base.js.map