var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './OptionWave'], function (require, exports, OptionWave_1) {
    var WaveRegion = (function (_super) {
        __extends(WaveRegion, _super);
        function WaveRegion(position, size, origin, value, min, max, quantised, name, setting, log, waveform, handles, mode, emptystring) {
            _super.call(this, waveform, emptystring);
            this.Type = "waveregion";
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
            this.Handles = handles;
            this.Mode = mode;
            this.HandleRoll = [];
        }
        WaveRegion.prototype.Draw = function (ctx, units, i, panel) {
            _super.prototype.Draw.call(this, ctx, units, i, panel);
            var y = this.Position.y;
            var height = this.Size.height;
            var origin = this.Origin;
            var dataType = Math.round(units * 10);
            var xs = [this.Handles[0].Position.x, this.Handles[1].Position.x, this.Handles[2].Position.x, this.Handles[3].Position.x];
            var col = panel.SliderColours[i - (Math.floor(i / panel.SliderColours.length) * (panel.SliderColours.length))];
            if (this.Waveform.length) {
                // LINES //
                ctx.lineWidth = 1;
                ctx.globalAlpha = 1;
                ctx.globalAlpha = 1;
                App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
                var x = xs[2];
                var sliderNo = 2;
                // LOOP LINES //
                if (this.Mode) {
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(xs[2] + panel.Margin, y);
                    ctx.lineTo(xs[2] + panel.Margin, y + height);
                    ctx.moveTo(xs[3] + panel.Margin, y);
                    ctx.lineTo(xs[3] + panel.Margin, y + height);
                    ctx.stroke();
                    ctx.lineWidth = 1;
                    sliderNo = 1;
                }
                // SLIDEBAR //
                var offset = 0;
                if (origin == panel.Margin) {
                    offset = -units;
                }
                ctx.globalAlpha = 1;
                for (var j = 0; j < sliderNo; j++) {
                    App.FillColor(ctx, col);
                    x = xs[j];
                    ctx.fillRect(x + panel.Margin - (units), y, 2 * units, height);
                    // GRAB TRIANGLES //
                    var dragWidth = (height) * 0.16;
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
                }
                App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
                if (this.Mode) {
                    for (var j = 2; j < 4; j++) {
                        x = xs[j];
                        // GRAB TRIANGLES //
                        var dragWidth = ((height) * 0.16);
                        ctx.beginPath();
                        ctx.moveTo(x + panel.Margin - (dragWidth * 0.5), y + (height * 0.5));
                        ctx.lineTo(x + panel.Margin, y + (height * 0.5) - (dragWidth * 0.5));
                        ctx.lineTo(x + panel.Margin + (dragWidth * 0.5), y + (height * 0.5));
                        ctx.lineTo(x + panel.Margin, y + (height * 0.5) + (dragWidth * 0.5));
                        ctx.closePath();
                        ctx.fill();
                    }
                }
                ctx.font = App.Metrics.TxtItalic;
                ctx.textAlign = "left";
                ctx.fillText("Start", xs[0] + panel.Margin + (5 * units), y + (dataType * 0.8));
                if (this.Mode) {
                    ctx.fillText("Loop", xs[2] + panel.Margin + (5 * units), y + (height) - (dataType * 0.4));
                }
                else {
                    ctx.fillText("End", xs[1] + panel.Margin + (5 * units), y + (height) - (dataType * 0.4));
                }
            }
        };
        return WaveRegion;
    })(OptionWave_1.WaveForm);
    exports.WaveRegion = WaveRegion;
});
//# sourceMappingURL=OptionWaveRegion.js.map