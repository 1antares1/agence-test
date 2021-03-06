import BaseScheme from "./base";
import {
    IConsultant
} from './models/consultant';
import {
    IConsultantReport
} from './models/consultantReport';

import * as mysql from "mysql";
import * as _ from "lodash";

enum CollectionType {
    consultant,
    consultants,
    report
}

export interface IConsultantParams {
    allConsultants ? : boolean;
    co_usuario ? : string;
    co_sistema ? : number;
    fromDate ? : Date;
    toDate ? : Date;
    userList ? : string;
}

export class ConsultantCollections extends BaseScheme {
    constructor() {
        super();
    }

    getConsultants(result: (success: boolean, response: any[]) => void, all ? : boolean): void {
        let _consultants: IConsultant[] = new Array();
        let _params: IConsultantParams = {
            allConsultants: all
        };
        this.getDataCollection(CollectionType.consultants, (success: boolean, response: any) => {
            result(success, response);
        }, _params);
    }

    getConsultantsReport(reportParams: IConsultantParams, result: (success: boolean, response: any) => void): void {
        let _consultants: IConsultant[] = new Array();
        if (reportParams && typeof reportParams === "object") {
            let _params: IConsultantParams = {
                fromDate: reportParams.fromDate || null,
                toDate: reportParams.toDate || null,
                userList: (reportParams.userList) ? reportParams.userList.replace(/,/g, "|") : "",
                allConsultants: reportParams.allConsultants || false
            };

            this.getDataCollection(CollectionType.report, (success: boolean, response: any) => {
                result(success, response);
            }, _params);

        } else {
            result(false, "An error has occurred validating the body model");
        }
    }

    private getDataCollection(collectionType: CollectionType, result: (success: boolean, response: any) => void, params ? : IConsultantParams): void {
        let _data = (type: CollectionType, connection: mysql.IPool) => {
            let _sqlConnection: mysql.IPool = connection || this.sqlConnection;
            let _callbackError = (err: mysql.IError, callback: (success: boolean, response: any) => void): void => {
                if (err.fatal) {
                    this.tryGetSqlConnection(true, (reason: mysql.IError, connection: mysql.IPool) => {
                        if(reason) {
                            result(false, reason);
                        }
                        else {
                            this.getDataCollection(collectionType, result, params);
                        }
                    });
                } else if (err) {
                    result(false, err);
                }
            };
            let _commandPrepare = (ready: (connection: mysql.IConnection) => void): void => {
                _sqlConnection.getConnection((err: mysql.IError, connection: mysql.IConnection) => {
                    if (err) _callbackError(err, result);
                    else {
                        ready(connection);
                    }
                });
            }

            switch (type) {
                case CollectionType.consultant:
                    break;

                case CollectionType.consultants:
                    _commandPrepare((connection: mysql.IConnection) => {
                        connection.query(`CALL usp_getConsultants(${(params.allConsultants) ? true : false})`, (error: mysql.IError, results: any) => {
                            connection.release();

                            if (error) {
                                _callbackError(error, result);
                            } else {
                                result(true, results[0]);
                            }
                        });
                    });
                    break;

                case CollectionType.report:
                    _commandPrepare((connection: mysql.IConnection) => {
                        connection.query(`CALL usp_getConsultantsReport('${params.fromDate}', '${params.toDate}', '${params.userList}')`, (error: mysql.IError, results: any) => {
                            connection.release();

                            if (error) {
                                _callbackError(error, result);
                            } else {
                                let _collection: IConsultantReport[] = results[0],
                                    _users: any = {},
                                    _months: any = [];

                                for (let i: number = 0; i < _collection.length; i++) {
                                    let _co_usuario: string = _collection[i].co_usuario;
                                    let _userMonths: any[] = (_users[_co_usuario]) ? _users[_co_usuario].months : new Array();

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
                                    }

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
        }

        this.tryGetSqlConnection(false, (err: mysql.IError, connection: mysql.IPool) => {
            if (!err) {
                _data(collectionType, connection);
            } else {
                result(false, err);
            }
        });
    }
}