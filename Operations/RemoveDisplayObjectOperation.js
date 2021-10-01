define(["require", "exports"], function (require, exports) {
    var RemoveDisplayObjectOperation = (function () {
        function RemoveDisplayObjectOperation(displayObject, displayList) {
            this._DisplayObject = displayObject;
            this._DisplayList = displayList;
        }
        RemoveDisplayObjectOperation.prototype.Do = function () {
            this._Index = this._DisplayList.IndexOf(this._DisplayObject);
            var that = this;
            return new Promise(function (resolve) {
                that._DisplayList.Remove(that._DisplayObject);
                resolve(that._DisplayList);
            });
        };
        RemoveDisplayObjectOperation.prototype.Undo = function () {
            var that = this;
            return new Promise(function (resolve) {
                that._DisplayList.Insert(that._Index, that._DisplayObject);
                resolve(that._DisplayList);
            });
        };
        RemoveDisplayObjectOperation.prototype.Dispose = function () {
            this._DisplayList = null;
            this._DisplayObject = null;
        };
        return RemoveDisplayObjectOperation;
    })();
    exports.RemoveDisplayObjectOperation = RemoveDisplayObjectOperation;
});
//# sourceMappingURL=RemoveDisplayObjectOperation.js.map