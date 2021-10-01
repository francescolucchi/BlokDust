define(["require", "exports"], function (require, exports) {
    var OptionHandle = (function () {
        function OptionHandle(position, xval, xmin, xmax, xrange, yval, ymin, ymax, yrange, xsetting, ysetting) {
            this.Position = position;
            this.XValue = xval;
            this.XMin = xmin;
            this.XMax = xmax;
            this.XRange = xrange;
            this.XSetting = xsetting;
            this.YValue = yval;
            this.YMin = ymin;
            this.YMax = ymax;
            this.YRange = yrange;
            this.YSetting = ysetting || "";
            this.Log = false;
            this.XLog = false;
            this.YLog = false;
            this.Selected = false;
        }
        OptionHandle.prototype.Draw = function (ctx, x, y, size, col) {
            App.FillColor(ctx, col);
            ctx.beginPath();
            ctx.moveTo(x - size, y);
            ctx.lineTo(x, y - size);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x, y + size);
            ctx.closePath();
            ctx.fill();
            App.FillColor(ctx, App.Palette[8]);
            ctx.beginPath();
            ctx.moveTo(x - size, y);
            ctx.lineTo(x, y - size);
            ctx.lineTo(x + (size * 0.5), y - (size * 0.5));
            ctx.lineTo(x - (size * 0.5), y + (size * 0.5));
            ctx.closePath();
            ctx.fill();
        };
        return OptionHandle;
    })();
    exports.OptionHandle = OptionHandle;
});
//# sourceMappingURL=OptionHandle.js.map