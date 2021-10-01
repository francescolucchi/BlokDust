var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './OptionWave'], function (require, exports, OptionWave_1) {
    var WaveSlider = (function (_super) {
        __extends(WaveSlider, _super);
        function WaveSlider(position, size, origin, value, min, max, quantised, name, setting, log, waveform, spread, emptystring) {
            _super.call(this, waveform, emptystring);
            this.Type = "waveslider";
            this.Position = position;
            this.Size = size;
            this.Origin = origin;
            this.Value = value;
            this.Min = min;
            this.Max = max;
            this.Quantised = quantised;
            this.Name = name;
            this.Setting = setting;
            this.Log = log;
            this.Selected = false;
            //this._Waveform = waveform;
            this.Spread = spread;
        }
        WaveSlider.prototype.Draw = function (ctx, units, i, panel) {
            _super.prototype.Draw.call(this, ctx, units, i, panel);
            var x = this.Position.x;
            var y = this.Position.y;
            var height = this.Size.height;
            var origin = this.Origin;
            var headerType = Math.round(units * 33);
            if (this.Waveform.length) {
                // LINES //
                ctx.lineWidth = 2;
                ctx.globalAlpha = 1;
                App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
                var spread = (panel.Range / (this.Max - this.Min)) * this.Spread;
                var leftSpread = x + panel.Margin - (spread * 0.5);
                if (leftSpread < panel.Margin) {
                    leftSpread = panel.Margin;
                }
                var rightSpread = x + panel.Margin + (spread * 0.5);
                if (rightSpread > (panel.Margin + panel.Range)) {
                    rightSpread = panel.Margin + panel.Range;
                }
                ctx.beginPath();
                ctx.moveTo(leftSpread, y);
                ctx.lineTo(leftSpread, y + height);
                ctx.moveTo(rightSpread, y);
                ctx.lineTo(rightSpread, y + height);
                ctx.stroke();
                ctx.lineWidth = 1;
                // SLIDEBAR //
                var col = panel.SliderColours[i - (Math.floor(i / panel.SliderColours.length) * (panel.SliderColours.length))];
                var offset = 0;
                if (origin == panel.Margin) {
                    offset = -units;
                }
                ctx.globalAlpha = 1;
                App.FillColor(ctx, col);
                ctx.fillRect(x + panel.Margin - (units), y, 2 * units, height);
                // GRAB TRIANGLES //
                var dragWidth = (height) * 0.2;
                ctx.beginPath();
                ctx.moveTo(x + panel.Margin - dragWidth, y + (height * 0.5));
                ctx.lineTo(x + panel.Margin, y + (height * 0.5) - dragWidth);
                ctx.lineTo(x + panel.Margin + dragWidth, y + (height * 0.5));
                ctx.lineTo(x + panel.Margin, y + (height * 0.5) + dragWidth);
                ctx.closePath();
                ctx.fill();
                App.FillColor(ctx, App.Palette[8]);
                ctx.beginPath();
                ctx.moveTo(x + panel.Margin - dragWidth, y + (height * 0.5));
                ctx.lineTo(x + panel.Margin, y + (height * 0.5) - dragWidth);
                ctx.lineTo(x + panel.Margin + (dragWidth * 0.5), y + (height * 0.5) - (dragWidth * 0.5));
                ctx.lineTo(x + panel.Margin - (dragWidth * 0.5), y + (height * 0.5) + (dragWidth * 0.5));
                ctx.closePath();
                ctx.fill();
                // VALUE TOOLTIP //
                App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
                if (this.Selected) {
                    ctx.textAlign = "left";
                    ctx.font = App.Metrics.TxtSlider;
                    var string = panel.NumberWithCommas("" + (Math.round(this.Value * 100) / 100));
                    ctx.fillText(string, rightSpread + (25 * units), y + (height * 0.5) + (headerType * 0.35));
                }
            }
        };
        return WaveSlider;
    })(OptionWave_1.WaveForm);
    exports.WaveSlider = WaveSlider;
});
//# sourceMappingURL=OptionWaveSlider.js.map