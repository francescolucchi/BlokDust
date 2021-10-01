define(["require", "exports"], function (require, exports) {
    var StringValue = (function () {
        function StringValue(value) {
            this.value = "";
            if (value) {
                this.value = value.toLowerCase();
            }
        }
        StringValue.prototype.toString = function () {
            return this.value;
        };
        return StringValue;
    })();
    exports.StringValue = StringValue;
});
//# sourceMappingURL=StringValue.js.map