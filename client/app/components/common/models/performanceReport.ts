namespace agence.common.models {
    export interface IPerformanceReportMonth {
        year: number;
        month: number;
        information: {
            valor: number;
            total: number;
            net_amount: number;
            brut_salario: number;
            commission: number;
            profit: number;
        }
    }
    export interface IPerformanceReport {
        co_usuario: string;
        no_usuario: string;
        no_email: string;
        nu_telefone: string;
        url_foto: string;
        months: IPerformanceReportMonth[];
    }

    export class PerformanceReport implements IPerformanceReport {
        constructor(
            public co_usuario: string
            , public no_usuario: string
            , public no_email: string
            , public nu_telefone: string
            , public url_foto: string
            , public months: IPerformanceReportMonth[]
        ) {  }
    }
}