"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var CollectionType;
(function (CollectionType) {
    CollectionType[CollectionType["consultant"] = 0] = "consultant";
    CollectionType[CollectionType["consultants"] = 1] = "consultants";
    CollectionType[CollectionType["report"] = 2] = "report";
})(CollectionType || (CollectionType = {}));
var ConsultantCollections = (function (_super) {
    __extends(ConsultantCollections, _super);
    function ConsultantCollections() {
        return _super.call(this) || this;
    }
    ConsultantCollections.prototype.getConsultants = function (result, all) {
        var _consultants = new Array();
        var _params = {
            allConsultants: all
        };
        this.getDataCollection(CollectionType.consultants, function (success, response) {
            result(success, response);
        }, _params);
    };
    ConsultantCollections.prototype.getConsultantsReport = function (reportParams, result) {
        var _consultants = new Array();
        if (reportParams && typeof reportParams === "object") {
            var _params = {
                fromDate: reportParams.fromDate,
                toDate: reportParams.toDate,
                userList: (reportParams.userList) ? reportParams.userList.replace(/,/g, "|") : ""
            };
            this.getDataCollection(CollectionType.report, function (success, response) {
                result(success, response);
            }, _params);
        }
        else {
            result(false, "An error has occurred validating the body model");
        }
    };
    ConsultantCollections.prototype.getDataCollection = function (collectionType, result, params) {
        var _this = this;
        var _data = function (type, connection) {
            var _sqlConnection = connection || _this.sqlConnection;
            var _callbackError = function (err, callback) {
                if (err.fatal) {
                    _this.tryGetSqlConnection(function (reason, connection) {
                        _this.getDataCollection(collectionType, result, params);
                    });
                }
                else if (err) {
                    result(false, err);
                }
            };
            switch (type) {
                case CollectionType.consultant:
                    break;
                case CollectionType.consultants:
                    _sqlConnection.getConnection(function (err, connection) {
                        connection.query("CALL usp_getConsultants(" + ((params.allConsultants) ? 1 : 0) + ")", function (error, results) {
                            connection.release();
                            if (error) {
                                _callbackError(error, result);
                            }
                            else {
                                result(true, results[0]);
                            }
                        });
                    });
                    break;
                case CollectionType.report:
                    _sqlConnection.getConnection(function (err, connection) {
                        connection.query("CALL usp_getConsultantsReport('" + params.fromDate + "', '" + params.toDate + "', '" + params.userList + "')", function (error, results) {
                            if (error) {
                                _callbackError(error, result);
                            }
                            else {
                                var _collection = results[0], _users = {}, _months = [];
                                for (var i = 0; i < _collection.length; i++) {
                                    var _co_usuario = _collection[i].co_usuario;
                                    var _userMonths = (_users[_co_usuario]) ? _users[_co_usuario].months : new Array();
                                    _users[_co_usuario] = {
                                        co_os: _collection[i].co_os,
                                        co_status: _collection[i].co_status,
                                        co_cliente: _collection[i].co_cliente,
                                        co_usuario: _collection[i].co_usuario,
                                        no_usuario: _collection[i].no_usuario,
                                        no_email: _collection[i].no_email,
                                        nu_telefone: _collection[i].nu_telefone,
                                        url_foto: _collection[i].url_foto,
                                        months: _userMonths
                                    };
                                    _users[_co_usuario].months.push({
                                        year: _collection[i].data_year,
                                        month: _collection[i].data_month,
                                        information: {
                                            valor: _collection[i].valor,
                                            total: _collection[i].total,
                                            net_amount: _collection[i].net_amount,
                                            brut_salario: _collection[i].brut_salario,
                                            commission: _collection[i].commission,
                                            profit: _collection[i].profit,
                                        }
                                    });
                                }
                                result(true, _users);
                            }
                        });
                    });
                    break;
                default:
                    result(false, null);
                    break;
            }
        };
        this.tryGetSqlConnection(function (err, connection) {
            if (!err) {
                _data(collectionType, connection);
            }
            else {
                result(false, err);
            }
        });
    };
    return ConsultantCollections;
}(base_1.default));
exports.ConsultantCollections = ConsultantCollections;
//# sourceMappingURL=consultant-collections.js.map