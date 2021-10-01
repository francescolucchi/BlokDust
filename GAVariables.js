var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './StringValue'], function (require, exports, StringValue_1) {
    var GAVariable = (function (_super) {
        __extends(GAVariable, _super);
        function GAVariable() {
            _super.apply(this, arguments);
        }
        return GAVariable;
    })(StringValue_1.StringValue);
    var GAVariables = (function () {
        function GAVariables() {
        }
        GAVariables.THEME = new GAVariable("theme");
        return GAVariables;
    })();
    exports.GAVariables = GAVariables;
});
//# sourceMappingURL=GAVariables.js.map