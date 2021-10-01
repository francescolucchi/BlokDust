var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Core/Operations/CompoundOperation', '../Core/Operations/IncrementNumberOperation'], function (require, exports, CompoundOperation_1, IncrementNumberOperation_1) {
    var IncrementNumberCompoundOperation = (function (_super) {
        __extends(IncrementNumberCompoundOperation, _super);
        function IncrementNumberCompoundOperation(n) {
            _super.call(this);
            this._Number = n;
            this.Operations.push(new IncrementNumberOperation_1.IncrementNumberOperation(n));
            this.Operations.push(new IncrementNumberOperation_1.IncrementNumberOperation(n + 1));
            this.Operations.push(new IncrementNumberOperation_1.IncrementNumberOperation(n + 2));
        }
        IncrementNumberCompoundOperation.prototype.Do = function () {
            return _super.prototype.Do.call(this);
        };
        IncrementNumberCompoundOperation.prototype.Undo = function () {
            return _super.prototype.Undo.call(this);
        };
        IncrementNumberCompoundOperation.prototype.Dispose = function () {
        };
        return IncrementNumberCompoundOperation;
    })(CompoundOperation_1.CompoundOperation);
    exports.IncrementNumberCompoundOperation = IncrementNumberCompoundOperation;
});
//# sourceMappingURL=IncrementNumberCompoundOperation.js.map