var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var DisplayObject = etch.drawing.DisplayObject;
    var TutorialHotspots = (function (_super) {
        __extends(TutorialHotspots, _super);
        function TutorialHotspots() {
            _super.apply(this, arguments);
            this.Points = [];
        }
        TutorialHotspots.prototype.Init = function (drawTo) {
            _super.prototype.Init.call(this, drawTo);
            this._Pulse = 0;
            this._Polarity = 1;
        };
        //-------------------------------------------------------------------------------------------
        //  UPDATE
        //-------------------------------------------------------------------------------------------
        TutorialHotspots.prototype.Update = function () {
            if (this.Points.length) {
                if (this._Polarity === 1) {
                    this._Pulse += 1;
                    if (this._Pulse > 100) {
                        this._Polarity = -this._Polarity;
                    }
                }
                else {
                    this._Pulse -= 1;
                    if (this._Pulse < 0) {
                        this._Polarity = -this._Polarity;
                    }
                }
            }
        };
        //-------------------------------------------------------------------------------------------
        //  DRAW
        //-------------------------------------------------------------------------------------------
        TutorialHotspots.prototype.Draw = function () {
            var ctx = this.Ctx;
            var units = App.Unit;
            this.Ctx.globalAlpha = 1;
            App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
            App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
            if (this.Points.length) {
                // FOR EACH HOTSPOT //
                for (var i = 0; i < this.Points.length; i++) {
                    var x = this.Points[i].x;
                    var y = this.Points[i].y;
                    // DOT //
                    var size = 2;
                    ctx.beginPath();
                    ctx.moveTo(x, y - (size * units));
                    ctx.lineTo(x - (size * units), y);
                    ctx.lineTo(x, y + (size * units));
                    ctx.lineTo(x + (size * units), y);
                    ctx.closePath();
                    ctx.fill();
                    // LINE //
                    this.Ctx.lineWidth = 2;
                    var size = 4 + (this._Pulse * 0.06) + (Math.random());
                    ctx.beginPath();
                    ctx.moveTo(x, y - (size * units));
                    ctx.lineTo(x - (size * units), y);
                    ctx.lineTo(x, y + (size * units));
                    ctx.lineTo(x + (size * units), y);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        };
        return TutorialHotspots;
    })(DisplayObject);
    exports.TutorialHotspots = TutorialHotspots;
});
//# sourceMappingURL=TutorialHotspots.js.map