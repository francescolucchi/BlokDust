var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Option'], function (require, exports, Option_1) {
    var SwitchArray = (function (_super) {
        __extends(SwitchArray, _super);
        function SwitchArray(position, size, switches) {
            _super.call(this);
            this.Type = "switches";
            this.Position = position;
            this.Size = size;
            this.Switches = switches;
            this.HandleRoll = [];
        }
        SwitchArray.prototype.Refresh = function (i, json) {
            var switches = json.parameters[i].switches;
            for (var j = 0; j < this.Switches.length; j++) {
                this.Switches[j].Selected = switches[j].value;
            }
        };
        SwitchArray.prototype.Draw = function (ctx, units, i, panel) {
            var x = this.Position.x;
            var y = this.Position.y;
            var height = this.Size.height;
            // DIVIDERS //
            App.StrokeColor(ctx, App.Palette[1]);
            if (i !== (panel.Options.length - 1)) {
                ctx.beginPath();
                ctx.moveTo(panel.Margin - units, y + height);
                ctx.lineTo(panel.Range + panel.Margin + units, y + height);
                ctx.stroke();
            }
            for (var j = 0; j < this.Switches.length; j++) {
                this.Switches[j].Draw(ctx, panel, units, panel.Margin, this.Size.height, i);
            }
        };
        return SwitchArray;
    })(Option_1.Option);
    exports.SwitchArray = SwitchArray;
});
//# sourceMappingURL=OptionSwitchArray.js.map