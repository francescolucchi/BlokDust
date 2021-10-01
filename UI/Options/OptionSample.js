var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Option'], function (require, exports, Option_1) {
    var OptionSample = (function (_super) {
        __extends(OptionSample, _super);
        function OptionSample(position, size, name, track, user, permalink, setting) {
            _super.call(this);
            this.Type = "sample";
            this.Position = position;
            this.Size = size;
            this.Name = name;
            this.Track = track;
            this.User = user;
            this.Permalink = permalink;
            this.Setting = setting;
            this.HandleRoll = [];
            if (!this.Permalink) {
                this.Permalink = '';
            }
        }
        OptionSample.prototype.Draw = function (ctx, units, i, panel) {
            _super.prototype.Draw.call(this, ctx, units, i, panel);
            var x = this.Position.x;
            var y = this.Position.y;
            var height = this.Size.height;
            var origin = this.Origin;
            var dataType = Math.round(units * 10);
            var headerType = Math.round(units * 33);
            // DIVIDERS //
            ctx.globalAlpha = 1;
            App.StrokeColor(ctx, App.Palette[1]);
            if (i !== (panel.Options.length - 1)) {
                ctx.beginPath();
                ctx.moveTo(panel.Margin - units, y + height);
                ctx.lineTo(panel.Range + panel.Margin + units, y + height);
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.moveTo(panel.Margin + (panel.Range * 0.5), y + (height * 0.2));
            ctx.lineTo(panel.Margin + (panel.Range * 0.5), y + (height * 0.8));
            ctx.moveTo(panel.Margin + (panel.Range * 0.65), y + (height * 0.2));
            ctx.lineTo(panel.Margin + (panel.Range * 0.65), y + (height * 0.8));
            ctx.stroke();
            // PARAM NAME //
            App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
            ctx.font = App.Metrics.TxtMid;
            ctx.textAlign = "right";
            ctx.fillText(this.Name.toUpperCase(), panel.Margin - (15 * units), y + (height * 0.5) + (dataType * 0.4));
            // URL BUTTON //
            if (this.Permalink === "") {
                App.StrokeColor(ctx, App.Palette[1]);
            }
            else {
                App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
            }
            ctx.lineWidth = 2;
            ctx.textAlign = "center";
            var ix = panel.Margin + (panel.Range * 0.575);
            var iy = y + (height * 0.5);
            var diamond = 7;
            ctx.beginPath();
            ctx.moveTo(ix + ((diamond * 0.5) * units), iy - (diamond * units));
            ctx.lineTo(ix - (diamond * units), iy - (diamond * units));
            ctx.lineTo(ix - (diamond * units), iy + (diamond * units));
            ctx.lineTo(ix + ((diamond * 0.5) * units), iy + (diamond * units));
            ctx.moveTo(ix - ((diamond * 0.5) * units), iy);
            ctx.lineTo(ix + (diamond * units), iy);
            ctx.moveTo(ix + ((diamond * 0.5) * units), iy - ((diamond * 0.5) * units));
            ctx.lineTo(ix + (diamond * units), iy);
            ctx.lineTo(ix + ((diamond * 0.5) * units), iy + ((diamond * 0.5) * units));
            ctx.stroke();
            //ctx.fillText("?",ix,iy + (dataType*0.38));
            // TRACK //
            ctx.font = App.Metrics.TxtItalic;
            ctx.textAlign = "left";
            ctx.fillText(this.Track, panel.Margin, y + (height * 0.5) - (2 * units));
            ctx.fillText("By " + this.User, panel.Margin, y + (height * 0.5) + (dataType) - (2 * units));
            // LOAD NEW //
            ctx.textAlign = "center";
            /*ctx.fillText("load new sample ", panel.Margin + (panel.Range*0.82), y + (height * 0.5) + (dataType*0.35));
            App.StrokeColor(ctx,App.Palette[App.ThemeManager.Txt]);
            ctx.lineWidth = 2;
            ix = panel.Margin + panel.Range - (diamond*units);
            iy = y + (height * 0.5);
            ctx.beginPath();
            ctx.moveTo(ix, iy - (diamond*units));
            ctx.lineTo(ix + (diamond*units), iy);
            ctx.lineTo(ix, iy + (diamond*units));
            ctx.stroke();*/
            App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(panel.Margin + (panel.Range * 0.65), y + (height * 0.25));
            ctx.lineTo(panel.Margin + (panel.Range * 0.65), y + (height * 0.75));
            ctx.lineTo(panel.Margin + (panel.Range), y + (height * 0.75));
            ctx.lineTo(panel.Margin + (panel.Range), y + (height * 0.25));
            ctx.closePath();
            ctx.stroke();
            ctx.font = App.Metrics.TxtMid;
            ctx.fillText("LOAD NEW SAMPLE", panel.Margin + (panel.Range * 0.82), y + (height * 0.5) + (dataType * 0.35));
            ctx.lineWidth = 1;
        };
        return OptionSample;
    })(Option_1.Option);
    exports.OptionSample = OptionSample;
});
//# sourceMappingURL=OptionSample.js.map