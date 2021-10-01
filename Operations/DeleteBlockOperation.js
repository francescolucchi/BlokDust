var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Core/Operations/CompoundOperation', './MoveBlockOperation', './RemoveDisplayObjectOperation', '../Core/Operations/RemoveItemFromArrayOperation'], function (require, exports, CompoundOperation_1, MoveBlockOperation_1, RemoveDisplayObjectOperation_1, RemoveItemFromArrayOperation_1) {
    var DeleteBlockOperation = (function (_super) {
        __extends(DeleteBlockOperation, _super);
        function DeleteBlockOperation(block) {
            _super.call(this);
            this._Block = block;
            this.Operations.push(new MoveBlockOperation_1.MoveBlockOperation(block));
            this.Operations.push(new RemoveDisplayObjectOperation_1.RemoveDisplayObjectOperation(block, App.MainScene.BlocksContainer.DisplayList));
            this.Operations.push(new RemoveItemFromArrayOperation_1.RemoveItemFromArrayOperation(block, App.Blocks));
            this._Block.Stop(); // TODO: await Remove ItemFromArrayOperation to finish first?
            //console.log(App.Blocks);
            //setTimeout(function() {console.log(App.Blocks)}, 1000);
        }
        DeleteBlockOperation.prototype.Do = function () {
            return _super.prototype.Do.call(this);
        };
        DeleteBlockOperation.prototype.Undo = function () {
            return _super.prototype.Undo.call(this);
        };
        DeleteBlockOperation.prototype.Dispose = function () {
            this._Block.Dispose();
            this._Block = null;
        };
        return DeleteBlockOperation;
    })(CompoundOperation_1.CompoundOperation);
    exports.DeleteBlockOperation = DeleteBlockOperation;
});
//# sourceMappingURL=DeleteBlockOperation.js.map