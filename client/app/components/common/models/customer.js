var agence;
(function (agence) {
    var common;
    (function (common) {
        var models;
        (function (models) {
            var Customer = (function () {
                function Customer(personGuid, friendlyUsername, title, firstName, lastName, middleName, suffix, dob, gender, emailAddress, emailIsVerified) {
                    this.personGuid = personGuid;
                    this.friendlyUsername = friendlyUsername;
                    this.title = title;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.middleName = middleName;
                    this.suffix = suffix;
                    this.dob = dob;
                    this.gender = gender;
                    this.emailAddress = emailAddress;
                    this.emailIsVerified = emailIsVerified;
                }
                return Customer;
            }());
            models.Customer = Customer;
        })(models = common.models || (common.models = {}));
    })(common = agence.common || (agence.common = {}));
})(agence || (agence = {}));
//# sourceMappingURL=customer.js.map