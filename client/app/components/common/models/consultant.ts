namespace agence.common.models {
    export interface IConsultantTabParams {
        indexTab: number;
        notaryStatus: number;
    }

    export interface IConsultantDetailsParams {
        mode: string;
        consultantDetails: models.IConsultantDetails;
        historyBack: string;
    }

    export interface IConsultantParams extends ng.ui.IStateParamsService {
        id: string;
        obj: IConsultantDetailsParams | IConsultantTabParams;
    }

    export interface IConsultant {
        co_usuario: string;
        no_usuario: string;
        ds_senha: string;
        nu_matricula: number;
        uf_orgao_emissor: string;
        no_email: string;
        no_email_pessoal: string;
        url_foto: string;
        co_tipo_usuario: number;
    }

    export class Notary implements IConsultant {
        constructor(
            public co_usuario: string,
            public no_usuario: string,
            public ds_senha: string,
            public nu_matricula: number,
            public uf_orgao_emissor: string,
            public no_email: string,
            public no_email_pessoal: string,
            public url_foto: string,
            public co_tipo_usuario: number
        ) { }
    }
}