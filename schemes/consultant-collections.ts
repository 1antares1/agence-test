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

    getConsultants(result: (response: any[]) => void, all ? : boolean): void {
        let _consultants: IConsultant[] = new Array();
        let _params: IConsultantParams = {
            allConsultants: all
        };
        this.getDataCollection(CollectionType.consultants, (response: any) => {
            result(response);
        }, _params);
    }

    getConsultantsReport(reportParams: IConsultantParams, result: (response: any) => void): void {
        let _consultants: IConsultant[] = new Array();
        if (reportParams && typeof reportParams === "object") {
            let _params: IConsultantParams = {
                fromDate: reportParams.fromDate,
                toDate: reportParams.toDate,
                userList: (reportParams.userList) ? reportParams.userList.replace(/,/g, "|") : ""
            };

            this.getDataCollection(CollectionType.report, (response: any) => {
                result(response);
            }, _params);
        } else {
            result("An error has occurred validating the body model");
        }
    }

    private getDataCollection(collectionType: CollectionType, result: (response: any) => void, params ? : IConsultantParams): void {
        let _data = (type: CollectionType, connection ? : mysql.IConnection) => {
            let _sqlConnection: mysql.IConnection = connection || this.connection;

            switch (type) {
                case CollectionType.consultant:
                    break;

                case CollectionType.consultants:
                    _sqlConnection.query(`CALL usp_getConsultants(${(params.allConsultants) ? 1 : 0})`, (error: mysql.IError, results: any) => {
                        if (error) {
                            result(error.message);
                        } else {
                            result(results[0]);
                        }
                    }).on("end", () => {
                        super.releaseConnection(_sqlConnection);
                    });
                    break;

                case CollectionType.report:
                    _sqlConnection.query(`CALL usp_getConsultantsReport('${params.fromDate}', '${params.toDate}', '${params.userList}')`, (error: mysql.IError, results: any) => {
                        if (error) {
                            result(error.message);
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
                            result(_users);
                        }
                    }).on("end", () => {
                        super.releaseConnection(_sqlConnection);
                    });
                    break;

                default:
                    result(null);
                    break;
            }
        }

        if (this.schemeOn) {
            _data(collectionType);
        } else {
            this.tryGetSqlConnection((err: mysql.IError, connection: mysql.IConnection) => {
                if (!err) {
                    _data(collectionType);
                } else {
                    result(null);
                }
            });
        }
    }
}