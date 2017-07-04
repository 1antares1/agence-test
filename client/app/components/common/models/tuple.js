var agence;
(function (agence) {
    var common;
    (function (common) {
        var models;
        (function (models) {
            var Tuple = (function () {
                function Tuple(value, text) {
                    this.value = value;
                    this.text = text;
                }
                return Tuple;
            }());
            models.Tuple = Tuple;
        })(models = common.models || (common.models = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
