var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Core/Operations/ChangePropertyOperation', '../Core/Operations/CompoundOperation'], function (require, exports, ChangePropertyOperation_1, CompoundOperation_1) {
    var MoveBlockOperation = (function (_super) {
        __extends(MoveBlockOperation, _super);
        // todo: why is it necessary to cast block as 'any'??
        function MoveBlockOperation(block) {
            _super.call(this);
            this._Block = block;
            this.Operations.push(new ChangePropertyOperation_1.ChangePropertyOperation(block, "Position", this._Block.LastPosition.Clone(), this._Block.Position.Clone()));
        }
        MoveBlockOperation.prototype.Do = function () {
            return _super.prototype.Do.call(this);
        };
        MoveBlockOperation.prototype.Undo = function () {
            return _super.prototype.Undo.call(this);
        };
        MoveBlockOperation.prototype.Dispose = function () {
            this._Block = null;
        };
        return MoveBlockOperation;
    })(CompoundOperation_1.CompoundOperation);
    exports.MoveBlockOperation = MoveBlockOperation;
});
//# sourceMappingURL=MoveBlockOperation.js.map