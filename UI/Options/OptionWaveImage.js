var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './OptionWave'], function (require, exports, OptionWave_1) {
    var WaveImage = (function (_super) {
        __extends(WaveImage, _super);
        function WaveImage(position, size, origin, name, waveform, emptystring) {
            _super.call(this, waveform, emptystring);
            this.Type = "waveimage";
            this.Position = position;
            this.Size = size;
            this.Origin = origin;
            this.Name = name;
        }
        WaveImage.prototype.Draw = function (ctx, units, i, panel) {
            _super.prototype.Draw.call(this, ctx, units, i, panel);
        };
        return WaveImage;
    })(OptionWave_1.WaveForm);
    exports.WaveImage = WaveImage;
});
//# sourceMappingURL=OptionWaveImage.js.map