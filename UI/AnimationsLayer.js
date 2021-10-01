var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var DisplayObject = etch.drawing.DisplayObject;
    var AnimationsLayer = (function (_super) {
        __extends(AnimationsLayer, _super);
        function AnimationsLayer() {
            _super.apply(this, arguments);
            this.ActiveBlocks = [];
            this.Loop = 0;
            this.Spinning = false;
        }
        AnimationsLayer.prototype.Init = function (drawTo) {
            _super.prototype.Init.call(this, drawTo);
        };
        AnimationsLayer.prototype.Update = function () {
            _super.prototype.Update.call(this);
            if (this.Spinning) {
                this.Loop += 1;
            }
            if (this.Loop === 60) {
                this.Loop = 0;
            }
        };
        AnimationsLayer.prototype.Spin = function () {
            if (this.ActiveBlocks.length < 1) {
                this.Loop += 1;
            }
            if (this.Loop === 60) {
                this.Loop = 0;
            }
        };
        AnimationsLayer.prototype.AddToList = function (block) {
            this.RemoveFromList(block);
            this.ActiveBlocks.push(block);
        };
        AnimationsLayer.prototype.RemoveFromList = function (block) {
            var b = this.ActiveBlocks.indexOf(block);
            if (b != -1) {
                this.ActiveBlocks.splice(b, 1);
            }
        };
        //-------------------------------------------------------------------------------------------
        //  DRAWING
        //-------------------------------------------------------------------------------------------
        AnimationsLayer.prototype.Draw = function () {
            if (this.ActiveBlocks.length > 0) {
                for (var i = 0; i < this.ActiveBlocks.length; i++) {
                    var block = this.ActiveBlocks[i];
                    var blockPos = App.Metrics.PointOnGrid(block.Position);
                    this.DrawBubble(blockPos.x, blockPos.y);
                    this.DrawSprite(this.Ctx, "loading", blockPos.x, blockPos.y, 6, false);
                }
                this.Spinning = true;
            }
        };
        AnimationsLayer.prototype.DrawBubble = function (x, y) {
            var grd = App.GridSize;
            App.FillColor(this.Ctx, App.Palette[2]);
            this.Ctx.globalAlpha = 0.95;
            this.Ctx.beginPath();
            this.Ctx.moveTo(x - (grd), y - (2 * grd));
            this.Ctx.lineTo(x, y - (2 * grd));
            this.Ctx.lineTo(x, y);
            this.Ctx.lineTo(x - (grd), y - (grd));
            this.Ctx.fill();
            this.Ctx.globalAlpha = 1;
        };
        AnimationsLayer.prototype.DrawSprite = function (ctx, index, x, y, w, c) {
            var units = App.Unit;
            var grd = App.GridSize;
            if (c) {
                grd = 0;
            }
            this.Spinning = true;
            ctx.globalAlpha = 1;
            App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
            switch (index) {
                case "loading":
                    var angle = (this.Loop / 60) * (2 * Math.PI);
                    var v1 = App.Metrics.VectorFromAngle(angle + (Math.PI * 0.25));
                    var v2 = App.Metrics.VectorFromAngle(angle + (Math.PI * 0.75));
                    var vx = x - (0.5 * grd);
                    var vy = y - (1.5 * grd);
                    var r = (w * 0.75) * units;
                    ctx.beginPath();
                    ctx.moveTo(vx + (v1.x * r), vy + (v1.y * r));
                    ctx.lineTo(vx + (v2.x * r), vy + (v2.y * r));
                    ctx.lineTo(vx - (v1.x * r), vy - (v1.y * r));
                    ctx.lineTo(vx - (v2.x * r), vy - (v2.y * r));
                    ctx.closePath();
                    ctx.fill();
                    /*ctx.save();
                    ctx.translate(x - (0.5*grd),y - (1.5*grd));
                    ctx.rotate(angle);
                    ctx.fillRect(-((w*0.5)*units),-((w*0.5)*units),w*units,w*units);
                    ctx.restore();*/
                    break;
            }
        };
        return AnimationsLayer;
    })(DisplayObject);
    exports.AnimationsLayer = AnimationsLayer;
});
//# sourceMappingURL=AnimationsLayer.js.map