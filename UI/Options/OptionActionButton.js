var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Option'], function (require, exports, Option_1) {
    var OptionActionButton = (function (_super) {
        __extends(OptionActionButton, _super);
        function OptionActionButton(position, size, name, text, setting) {
            _super.call(this);
            this.Type = "actionbutton";
            this.Position = position;
            this.Size = size;
            this.Name = name;
            this._Text = text;
            this.Setting = setting;
            this.HandleRoll = [];
        }
        OptionActionButton.prototype.Draw = function (ctx, units, i, panel, yoveride) {
            _super.prototype.Draw.call(this, ctx, units, i, panel);
            var x = this.Position.x;
            var y = this.Position.y;
            if (yoveride) {
                y = yoveride;
            }
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
            // PARAM NAME //
            App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
            ctx.font = App.Metrics.TxtMid;
            ctx.textAlign = "right";
            ctx.fillText(this.Name.toUpperCase(), panel.Margin - (15 * units), y + (height * 0.5) + (dataType * 0.4));
            // TEXT //
            ctx.textAlign = "center";
            var txtWidth = ctx.measureText(this._Text.toUpperCase()).width;
            var boxWidth = (txtWidth * 0.5) + (15 * units);
            ctx.fillText(this._Text.toUpperCase(), panel.Margin + (panel.Range * 0.5), y + (height * 0.5) + (dataType * 0.4));
            App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(panel.Margin + (panel.Range * 0.5) - boxWidth, y + (height * 0.25));
            ctx.lineTo(panel.Margin + (panel.Range * 0.5) - boxWidth, y + (height * 0.75));
            ctx.lineTo(panel.Margin + (panel.Range * 0.5) + boxWidth, y + (height * 0.75));
            ctx.lineTo(panel.Margin + (panel.Range * 0.5) + boxWidth, y + (height * 0.25));
            ctx.closePath();
            ctx.stroke();
            // BUTTON //
            /*var col = panel.SliderColours[i - (Math.floor(i/panel.SliderColours.length)*(panel.SliderColours.length))];
            App.FillColor(ctx,col);
            ctx.fillRect(panel.Margin + (panel.Range*0.25), y + (height*0.2), panel.Range*0.5, height*0.6);*/
        };
        return OptionActionButton;
    })(Option_1.Option);
    exports.OptionActionButton = OptionActionButton;
});
//# sourceMappingURL=OptionActionButton.js.map