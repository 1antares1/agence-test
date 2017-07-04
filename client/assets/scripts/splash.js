var trustednotary;
(function (trustednotary) {
    var PageLoad = (function () {
        function PageLoad() {
            this.on();
        }
        PageLoad.prototype.on = function () {
            var _this = this;
            window.onload = function () {
                Pace.on("done", function () {
                    var elem = document.getElementById("page-loading");
                    if (elem) {
                        _this.off(elem);
                    }
                });
            };
        };
        PageLoad.prototype.off = function (element) {
            document.body.classList.remove("ui-overflowHidden");
            element.classList.toggle("fade");
            setTimeout(function () {
                element.parentNode.removeChild(element);
            }, 2000);
        };
        return PageLoad;
    }());
    trustednotary.PageLoad = PageLoad;
    var pageLoad = new trustednotary.PageLoad();
})(trustednotary || (trustednotary = {}));
//# sourceMappingURL=splash.js.map