export interface IConsultantReport {
    co_os: number, 
    co_sistema: number;
    co_arquitectura: number;
    ds_os: string, 
    dt_sol: Date;
    dt_inicio: Date;
    co_status: number;
    co_factura: number;
    num_nf: number;
    co_cliente: number;
    data_emissao: Date;
    data_month: number;
    data_year: number;
    comissao_cn: Date;
    valor: number;
    total_imp_inc: number; 
    total: number; 
    net_amount: number; 
    brut_salario: number;
    commission: number; 
    profit: number; 
    co_usuario: string; 
    no_usuario: string; 
    no_email: string; 
    nu_telefone: string; 
    url_foto: string; 
    msn: string;
    mounths?: any;
}

export class ConsultantReport implements IConsultantReport {
    constructor(
        public co_os: number, 
        public co_sistema: number,
        public co_arquitectura: number,
        public ds_os: string, 
        public dt_sol: Date,
        public dt_inicio: Date,
        public co_status: number,
        public co_factura: number,
        public num_nf: number,
        public co_cliente: number,
        public data_emissao: Date,
        public data_month: number,
        public data_year: number,
        public comissao_cn: Date,
        public valor: number,
        public total_imp_inc: number, 
        public total: number, 
        public net_amount: number, 
        public brut_salario: number,
        public commission: number, 
        public profit: number, 
        public co_usuario: string, 
        public no_usuario: string, 
        public no_email: string, 
        public nu_telefone: string, 
        public url_foto: string, 
        public msn: string,
        public mounths?: any
    ) {}
}