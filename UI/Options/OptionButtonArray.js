var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Option'], function (require, exports, Option_1) {
    var ButtonArray = (function (_super) {
        __extends(ButtonArray, _super);
        function ButtonArray(position, size, name, setting, buttons, mode) {
            _super.call(this);
            this.Type = "buttons";
            this.Position = position;
            this.Size = size;
            this.Name = name;
            this.Setting = setting;
            this.Buttons = buttons;
            this.ButtonMode = mode;
            this.HandleRoll = [];
        }
        ButtonArray.prototype.Draw = function (ctx, units, i, panel) {
            var x = this.Position.x;
            var y = this.Position.y;
            var height = this.Size.height;
            var midType = Math.round(units * 10);
            // DIVIDERS //
            App.StrokeColor(ctx, App.Palette[1]);
            if (i !== (panel.Options.length - 1)) {
                ctx.beginPath();
                ctx.moveTo(panel.Margin - units, y + height);
                ctx.lineTo(panel.Range + panel.Margin + units, y + height);
                ctx.stroke();
            }
            /*var dsize = (3*units);
            ctx.beginPath();
            ctx.moveTo(panel.Margin, y + (height*0.5) - dsize);
            ctx.lineTo(panel.Margin - dsize, y + (height*0.5));
            ctx.lineTo(panel.Margin, y + (height*0.5) + dsize);
            ctx.lineTo(panel.Margin + dsize, y + (height*0.5));
            ctx.closePath();
            ctx.fill();*/
            for (var j = 0; j < this.Buttons.length; j++) {
                if (j > 0) {
                    App.StrokeColor(ctx, App.Palette[1]);
                    var bx = panel.Margin + this.Buttons[j].Position.x;
                    ctx.beginPath();
                    ctx.moveTo(Math.round(x + bx), y + (height * 0.15));
                    ctx.lineTo(Math.round(x + bx), y + (height * 0.85));
                    ctx.closePath();
                    ctx.stroke();
                }
                this.Buttons[j].Draw(ctx, panel, units, panel.Margin, height, i, this.ButtonMode);
            }
            // PARAM NAME //
            App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
            ctx.font = App.Metrics.TxtMid;
            ctx.textAlign = "right";
            ctx.fillText(this.Name.toUpperCase(), panel.Margin - (15 * units), y + (height * 0.5) + (midType * 0.4));
        };
        return ButtonArray;
    })(Option_1.Option);
    exports.ButtonArray = ButtonArray;
});
//# sourceMappingURL=OptionButtonArray.js.map