
export interface IConsultant {
    co_usuario: string;
    no_usuario: string;
    ds_senha: any;
    nu_matricula: number;
    uf_orgao_emissor: string;
    no_email: string;
    url_foto: string;
    co_tipo_usuario: number;
}

export class Consultant implements IConsultant {
    constructor(
        public co_usuario: string
        , public no_usuario: string
        , public ds_senha: any
        , public nu_matricula: number
        , public uf_orgao_emissor: string
        , public no_email: string
        , public url_foto: string
        , public co_tipo_usuario: number
    ) {}
}