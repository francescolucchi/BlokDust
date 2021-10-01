var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var DisplayObject = etch.drawing.DisplayObject;
    var Point = minerva.Point;
    var StageDragger = (function (_super) {
        __extends(StageDragger, _super);
        function StageDragger() {
            _super.apply(this, arguments);
            this._Dragging = false;
        }
        StageDragger.prototype.Init = function (drawTo) {
            _super.prototype.Init.call(this, drawTo);
            this.Tweens = [];
            this.Destination = new Point(App.DragOffset.x, App.DragOffset.y);
        };
        //-------------------------------------------------------------------------------------------
        //  LOOPS
        //-------------------------------------------------------------------------------------------
        StageDragger.prototype.Update = function () {
            if (Math.round(App.DragOffset.x) !== Math.round(this.Destination.x) || Math.round(App.DragOffset.y) !== Math.round(this.Destination.y)) {
                var speed = App.Config.ScrollEasing;
                App.DragOffset.x += (((this.Destination.x - App.DragOffset.x) / 100) * speed);
                App.DragOffset.y += (((this.Destination.y - App.DragOffset.y) / 100) * speed);
                App.Metrics.UpdateGridScale();
            }
        };
        StageDragger.prototype.Draw = function () {
            if (this._Dragging && ((App.DragOffset.x !== this._OffsetStart.x) || (App.DragOffset.y !== this._OffsetStart.y))) {
                var cx = App.Metrics.C.x;
                var cy = App.Metrics.C.y;
                var units = App.Unit;
                var ctx = App.MainScene.Ctx;
                App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cx - (5 * units), cy);
                ctx.lineTo(cx + (5 * units), cy);
                ctx.moveTo(cx, cy - (5 * units));
                ctx.lineTo(cx, cy + (5 * units));
                ctx.stroke();
            }
        };
        //-------------------------------------------------------------------------------------------
        //  TWEEN
        //-------------------------------------------------------------------------------------------
        StageDragger.prototype.DelayTo = function (panel, destination, t, delay, v) {
            var me = this;
            var offsetTween = new window.TWEEN.Tween({ x: panel["" + v].x, y: panel["" + v].y });
            offsetTween.to({ x: destination.x, y: destination.y }, t);
            offsetTween.onUpdate(function () {
                panel["" + v].x = this.x;
                panel["" + v].y = this.y;
                me.Destination.x = this.x;
                me.Destination.y = this.y;
                panel.Metrics.UpdateGridScale();
            });
            offsetTween.easing(window.TWEEN.Easing.Exponential.InOut);
            offsetTween.delay(delay);
            offsetTween.start(this.LastVisualTick);
            this.Tweens.push(offsetTween);
        };
        StageDragger.prototype.StopAllTweens = function () {
            if (this.Tweens.length) {
                for (var j = 0; j < this.Tweens.length; j++) {
                    this.Tweens[j].stop();
                }
                this.Tweens = [];
            }
        };
        //-------------------------------------------------------------------------------------------
        //  INTERACTION
        //-------------------------------------------------------------------------------------------
        StageDragger.prototype.MouseDown = function (point) {
            this._DragStart = new Point(point.x, point.y);
            this._OffsetStart = new Point(App.DragOffset.x, App.DragOffset.y);
            this._Dragging = true;
            //console.log(App.DragOffset);
        };
        StageDragger.prototype.MouseMove = function (point) {
            if (this._Dragging) {
                this.Drag(point);
            }
        };
        StageDragger.prototype.MouseUp = function () {
            this._Dragging = false;
        };
        StageDragger.prototype.Drag = function (point) {
            var speed = App.Config.ScrollSpeed;
            /*App.DragOffset.x = this._OffsetStart.x + (((point.x - this._DragStart.x)*(speed/App.ZoomLevel)));
            App.DragOffset.y = this._OffsetStart.y + (((point.y - this._DragStart.y)*(speed/App.ZoomLevel)));
            App.Metrics.UpdateGridScale();*/
            //this.StopAllTweens();
            this.Destination.x = (this._OffsetStart.x + ((((point.x - this._DragStart.x) / App.Unit) * (speed / App.ZoomLevel))));
            this.Destination.y = (this._OffsetStart.y + ((((point.y - this._DragStart.y) / App.Unit) * (speed / App.ZoomLevel))));
            //console.log(this.Destination);
        };
        StageDragger.prototype.Jump = function (point, to, time) {
            time = time || 400;
            this.StopAllTweens();
            var blockX = (-point.x * App.GridSize);
            var blockY = (-point.y * App.GridSize);
            var screenX = ((App.Width * to.x) - (App.Metrics.C.x));
            var screenY = ((App.Height * to.y) - (App.Metrics.C.y));
            var x = (blockX + (screenX / App.ZoomLevel)) / App.Unit;
            var y = (blockY + (screenY / App.ZoomLevel)) / App.Unit;
            this.DelayTo(App, new Point(x, y), time, 0, "DragOffset");
            //this.Destination = new Point(x,y);
            App.MainScene.ToolTipClose();
        };
        return StageDragger;
    })(DisplayObject);
    exports.StageDragger = StageDragger;
});
//# sourceMappingURL=StageDragger.js.map