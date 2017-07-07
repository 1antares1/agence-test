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
                fromDate: reportParams.fromDate,
                toDate: reportParams.toDate,
                userList: (reportParams.userList) ? reportParams.userList.replace(/,/g, "|") : ""
            };

            this.getDataCollection(CollectionType.report, (success: boolean, response: any) => {
                result(success, response);
            }, _params);

        } else {
            result(false, "An error has occurred validating the body model");
        }
    }

    private getDataCollection(collectionType: CollectionType, result: (success: boolean, response: any) => void, params ? : IConsultantParams): void {
        let _data = (type: CollectionType, connection: mysql.IConnection) => {
            let _sqlConnection: mysql.IConnection = connection || this.sqlConnection;
            let _callbackError = (err: mysql.IError, callback: (success: boolean, response: any) => void): void => {
                if (err.fatal) {
                    this.tryGetSqlConnection((reason: mysql.IError, connection: mysql.IConnection) => {
                        this.getDataCollection(collectionType, result, params);
                    });
                } else if (err) {
                    result(false, err);
                }
            };

            switch (type) {
                case CollectionType.consultant:
                    break;

                case CollectionType.consultants:
                    _sqlConnection.query(`CALL usp_getConsultants(${(params.allConsultants) ? 1 : 0})`, (error: mysql.IError, results: any) => {
                        if (error) {
                            _callbackError(error, result);
                        } else {
                            result(true, results[0]);
                        }
                    });
                    break;

                case CollectionType.report:
                    _sqlConnection.query(`CALL usp_getConsultantsReport('${params.fromDate}', '${params.toDate}', '${params.userList}')`, (error: mysql.IError, results: any) => {
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
                    break;

                default:
                    result(false, null);
                    break;
            }
        }

        if (this.sqlConnection) {
            this.sqlConnection.ping((err: mysql.IError) => {
                let _callbackRunCommand = (): void => {
                    _data(collectionType, this.sqlConnection);
                }
                if (err) {
                    this.sqlConnection = this.tryCreateSqlConnection();
                    _data(collectionType, this.sqlConnection);
                } else {
                    _callbackRunCommand();
                }
            });

        } else {
            this.tryGetSqlConnection((err: mysql.IError, connection: mysql.IConnection) => {
                if (!err) {
                    _data(collectionType, connection);
                } else {
                    result(false, err);
                }
            });
        }
    }
}