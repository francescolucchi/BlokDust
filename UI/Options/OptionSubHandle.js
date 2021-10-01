define(["require", "exports"], function (require, exports) {
    var OptionSubHandle = (function () {
        function OptionSubHandle(position, val, min, max, rangemin, rangemax, setting) {
            this.Position = position;
            this.Value = val;
            this.Min = min;
            this.Max = max;
            this.RangeMin = rangemin;
            this.RangeMax = rangemax;
            this.Setting = setting;
            //this.Width = this.SetPos(val);
        }
        OptionSubHandle.prototype.SetVal = function (pos) {
            var scale = (this.Max - this.Min) / (this.RangeMax - this.RangeMin);
            return (pos - this.RangeMin) * scale + this.Min;
        };
        OptionSubHandle.prototype.SetPos = function (value) {
            var scale = (this.Max - this.Min) / (this.RangeMax - this.RangeMin);
            return this.RangeMin + (value - this.Min) / scale;
        };
        OptionSubHandle.prototype.Draw = function (ctx, x, y, size, col) {
            var w = this.Position.x;
            //console.log(w);
            App.FillColor(ctx, col);
            ctx.beginPath();
            ctx.moveTo(x - w - size, y);
            ctx.lineTo(x - w, y - size);
            ctx.lineTo(x + w, y - size);
            ctx.lineTo(x + w + size, y);
            ctx.lineTo(x + w, y + size);
            ctx.lineTo(x - w, y + size);
            ctx.closePath();
            ctx.fill();
            App.FillColor(ctx, App.Palette[8]);
            ctx.beginPath();
            ctx.moveTo(x - w - size, y);
            ctx.lineTo(x - w, y - size);
            ctx.lineTo(x - w + (size * 0.5), y - (size * 0.5));
            ctx.lineTo(x - w - (size * 0.5), y + (size * 0.5));
            ctx.closePath();
            ctx.fill();
        };
        return OptionSubHandle;
    })();
    exports.OptionSubHandle = OptionSubHandle;
});
//# sourceMappingURL=OptionSubHandle.js.map