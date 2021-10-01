define(["require", "exports"], function (require, exports) {
    var Point = etch.primitives.Point;
    var Option = (function () {
        function Option() {
        }
        Option.prototype.Draw = function (ctx, units, i, panel, yoveride) {
        };
        Option.prototype.PlotGraph = function () {
        };
        Option.prototype.MonitorReset = function () {
        };
        Option.prototype.Refresh = function (i, json) {
        };
        Option.prototype.DiagonalFill = function (ctx, x, y, w, h, s) {
            var pr = App.Metrics.PixelRatio;
            s = s * pr;
            var lineNo = Math.round((w + h) / (s));
            var pos1 = new Point(0, 0);
            var pos2 = new Point(0, 0);
            ctx.beginPath();
            for (var j = 0; j < lineNo; j++) {
                pos1.x = (s * 0.5) + (s * j);
                pos1.y = 0;
                pos2.x = pos1.x - h;
                pos2.y = h;
                if (pos2.x < 0) {
                    pos2.y = h + pos2.x;
                    pos2.x = 0;
                }
                if (pos1.x > w) {
                    pos1.y = (pos1.x - w);
                    pos1.x = w;
                }
                ctx.moveTo(x + pos1.x, y + pos1.y);
                ctx.lineTo(x + pos2.x, y + pos2.y);
            }
            ctx.stroke();
        };
        return Option;
    })();
    exports.Option = Option;
});
//# sourceMappingURL=Option.js.map