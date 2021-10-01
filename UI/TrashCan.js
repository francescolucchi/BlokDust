var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var Dimensions = Utils.Measurements.Dimensions;
    var DisplayObject = etch.drawing.DisplayObject;
    var TrashCan = (function (_super) {
        __extends(TrashCan, _super);
        function TrashCan() {
            _super.apply(this, arguments);
        }
        TrashCan.prototype.Init = function (drawTo) {
            _super.prototype.Init.call(this, drawTo);
            this._RollOver = false;
        };
        TrashCan.prototype.Draw = function () {
            var units = App.Unit;
            var ctx = this.Ctx;
            var tx = this.DrawTo.Width - (30 * units);
            var ty = this.DrawTo.Height - (30 * units);
            var s = 1;
            if (this._RollOver && this.DrawTo.IsDraggingABlock) {
                s = 1.2;
            }
            App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(tx - ((11 * s) * units), ty - ((11 * s) * units)); // tl
            ctx.lineTo(tx + ((11 * s) * units), ty - ((11 * s) * units)); // tr
            ctx.lineTo(tx + ((8 * s) * units), ty + ((11 * s) * units)); // br
            ctx.lineTo(tx - ((8 * s) * units), ty + ((11 * s) * units)); // bl
            ctx.closePath();
            ctx.stroke();
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(tx - ((4 * s) * units), ty - ((4 * s) * units));
            ctx.lineTo(tx + ((4 * s) * units), ty + ((4 * s) * units));
            ctx.moveTo(tx + ((4 * s) * units), ty - ((4 * s) * units));
            ctx.lineTo(tx - ((4 * s) * units), ty + ((4 * s) * units));
            ctx.stroke();
            ctx.lineWidth = 1;
        };
        TrashCan.prototype.MouseMove = function (point) {
            var units = App.Unit;
            this._RollOver = Dimensions.hitRect(this.DrawTo.Width - (60 * units), this.DrawTo.Height - (60 * units), (60 * units), (60 * units), point.x, point.y);
        };
        TrashCan.prototype.MouseUp = function () {
            if (this._RollOver) {
                this.DrawTo.DeleteSelectedBlock();
                return true;
            }
            return false;
        };
        return TrashCan;
    })(DisplayObject);
    exports.TrashCan = TrashCan;
});
//# sourceMappingURL=TrashCan.js.map