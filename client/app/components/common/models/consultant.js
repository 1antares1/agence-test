var agence;
(function (agence) {
    var common;
    (function (common) {
        var models;
        (function (models) {
            var Notary = (function () {
                function Notary(co_usuario, no_usuario, ds_senha, nu_matricula, uf_orgao_emissor, no_email, no_email_pessoal, url_foto, co_tipo_usuario) {
                    this.co_usuario = co_usuario;
                    this.no_usuario = no_usuario;
                    this.ds_senha = ds_senha;
                    this.nu_matricula = nu_matricula;
                    this.uf_orgao_emissor = uf_orgao_emissor;
                    this.no_email = no_email;
                    this.no_email_pessoal = no_email_pessoal;
                    this.url_foto = url_foto;
                    this.co_tipo_usuario = co_tipo_usuario;
                }
                return Notary;
            }());
            models.Notary = Notary;
        })(models = common.models || (common.models = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
