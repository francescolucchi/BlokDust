var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var DisplayObject = etch.drawing.DisplayObject;
    var Point = etch.primitives.Point;
    var ToolTip = (function (_super) {
        __extends(ToolTip, _super);
        function ToolTip() {
            _super.apply(this, arguments);
        }
        ToolTip.prototype.Init = function (drawTo) {
            _super.prototype.Init.call(this, drawTo);
            this.Name = "";
            this.Alpha = 0;
            this.Open = false;
            this.Position = new Point(0, 0);
        };
        //-------------------------------------------------------------------------------------------
        //  DRAWING
        //-------------------------------------------------------------------------------------------
        ToolTip.prototype.Draw = function () {
            var units = App.Unit;
            var ctx = this.Ctx;
            var dataType = Math.round(units * 10);
            var thisAlpha = this.Alpha / 100;
            ctx.font = App.Metrics.TxtMid;
            var thisWidth = ctx.measureText(this.Name.toUpperCase()).width + (40 * units);
            var x = this.Position.x;
            var y = this.Position.y;
            // BG //
            ctx.globalAlpha = thisAlpha * 0.9;
            App.FillColor(ctx, App.Palette[2]);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + thisWidth, y);
            ctx.lineTo(x + thisWidth, y + (20 * units));
            ctx.lineTo(x + (20 * units), y + (20 * units));
            ctx.closePath();
            ctx.fill();
            // NAME //
            ctx.globalAlpha = thisAlpha;
            App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
            ctx.textAlign = "left";
            ctx.fillText(this.Name.toUpperCase(), x + (30 * units), y + (10 * units) + (dataType * 0.36));
        };
        //-------------------------------------------------------------------------------------------
        //  TWEEN
        //-------------------------------------------------------------------------------------------
        ToolTip.prototype.AlphaTo = function (panel, destination, t) {
            if (this._AlphaTween) {
                this._AlphaTween.stop();
            }
            window.TWEEN.remove(this._AlphaTween);
            this._AlphaTween = new window.TWEEN.Tween({ x: this.Alpha });
            this._AlphaTween.to({ x: destination }, t);
            this._AlphaTween.onUpdate(function () {
                panel.Alpha = this.x;
            });
            this._AlphaTween.easing(window.TWEEN.Easing.Quintic.InOut);
            this._AlphaTween.start(this.LastVisualTick);
        };
        ToolTip.prototype.StopTween = function () {
            window.TWEEN.remove(this._AlphaTween);
        };
        return ToolTip;
    })(DisplayObject);
    exports.ToolTip = ToolTip;
});
//# sourceMappingURL=ToolTip.js.map