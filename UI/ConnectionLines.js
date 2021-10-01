var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../MathObjects/Line'], function (require, exports, Line_1) {
    var DisplayObject = etch.drawing.DisplayObject;
    var Point = etch.primitives.Point;
    var ConnectionLines = (function (_super) {
        __extends(ConnectionLines, _super);
        function ConnectionLines() {
            _super.apply(this, arguments);
        }
        ConnectionLines.prototype.Init = function (drawTo) {
            _super.prototype.Init.call(this, drawTo);
            this.UpdateList();
        };
        ConnectionLines.prototype.Draw = function () {
            //this.UpdateList(); //FIXME: Luke P put this here to fix the line drawing in etch branch although I'm sure its not right.
            var grd = App.ScaledGridSize; // this.Grid.Width / this.Grid.Divisor;
            App.StrokeColor(this.Ctx, App.Palette[15]);
            this.Ctx.lineWidth = 1;
            this.Ctx.beginPath();
            for (var j = 0; j < this._Unpowered.length; j++) {
                var myPos = App.Metrics.PointOnGrid(this._Unpowered[j].Points[0]);
                this.Ctx.moveTo(myPos.x, myPos.y);
                for (var i = 1; i < this._Unpowered[j].Points.length; i++) {
                    var myPos = App.Metrics.PointOnGrid(this._Unpowered[j].Points[i]);
                    this.Ctx.lineTo(myPos.x, myPos.y);
                }
            }
            this.Ctx.stroke();
            this.Ctx.lineWidth = 2;
            this.Ctx.beginPath();
            for (var j = 0; j < this._Powered.length; j++) {
                var myPos = App.Metrics.PointOnGrid(this._Powered[j].Points[0]);
                this.Ctx.moveTo(myPos.x, myPos.y);
                for (var i = 1; i < this._Powered[j].Points.length; i++) {
                    var myPos = App.Metrics.PointOnGrid(this._Powered[j].Points[i]);
                    this.Ctx.lineTo(myPos.x, myPos.y);
                }
            }
            this.Ctx.stroke();
        };
        /*OldDraw() {
    
            this.Ctx.strokeStyle = App.Palette[15];// BLUE
            this.Ctx.lineWidth = 1;
            this.Ctx.beginPath();
    
            for (var j = 0; j < App.Sources.length; j++) {
                var block: IBlock = App.Sources[j];
                if ((<ISource>block).Connections.Count) {
    
                    // draw connections to modifiers
                    var modifiers = (<ISource>block).Connections.ToArray();
    
                    var grd = App.ScaledGridSize; // this.Grid.Width / this.Grid.Divisor;
    
                    for(var i = 0; i < modifiers.length; i++){
                        var target: IEffect = modifiers[i];
    
                        var myPos = App.Metrics.PointOnGrid(block.Position);
                        var targetPos = App.Metrics.PointOnGrid(target.Position);
    
                        var xDif = (targetPos.x - myPos.x) / grd;
                        var yDif = (targetPos.y - myPos.y) / grd;
    
                        this.Ctx.moveTo(myPos.x, myPos.y);
    
                        if (xDif > 0) { // RIGHT HALF
    
                            if (yDif < 0) { // UPPER
    
                                if (-yDif < xDif) {
                                    this.Ctx.lineTo(Math.round(myPos.x + ((xDif - (-yDif))*grd)), Math.round(myPos.y));
                                }
    
                                if (-yDif > xDif) {
                                    this.Ctx.lineTo(Math.round(myPos.x), Math.round(myPos.y - (((-yDif) - xDif)*grd)));
                                }
    
                            }
    
                            if (yDif > 0) { // LOWER
    
                                if (yDif < xDif) {
                                    this.Ctx.lineTo(Math.round(myPos.x + ((xDif - yDif)*grd)), Math.round(myPos.y));
                                }
    
                                if (yDif > xDif) {
                                    this.Ctx.lineTo(Math.round(myPos.x), Math.round(myPos.y + ((yDif - xDif)*grd)));
                                }
                            }
                        }
    
                        if (xDif < 0) { // LEFT HALF
    
                            if (yDif < 0) { // UPPER
    
                                if (yDif > xDif) {
                                    this.Ctx.lineTo(Math.round(myPos.x - ((yDif - xDif)*grd)), Math.round(myPos.y));
                                }
    
                                if (yDif < xDif) {
                                    this.Ctx.lineTo(Math.round(myPos.x), Math.round(myPos.y - ((xDif - yDif)*grd)));
                                }
    
                            }
    
                            if (yDif > 0) { // LOWER
    
                                if (yDif < -xDif) {
                                    this.Ctx.lineTo(Math.round(myPos.x - (((-xDif) - yDif)*grd)), Math.round(myPos.y));
                                }
    
                                if (yDif > -xDif) {
                                    this.Ctx.lineTo(Math.round(myPos.x), Math.round(myPos.y + ((yDif - (-xDif))*grd)));
                                }
    
                            }
    
                        }
    
                        this.Ctx.lineTo(targetPos.x, targetPos.y);
                    }
    
    
                }
            } // end loop
    
            this.Ctx.stroke();
        }*/
        ConnectionLines.prototype.UpdateList = function () {
            this._Powered = [];
            this._Unpowered = [];
            for (var j = 0; j < App.Sources.length; j++) {
                var block = App.Sources[j];
                if (block.Connections.Count) {
                    // draw connections to modifiers
                    var modifiers = block.Connections.ToArray();
                    var grd = App.ScaledGridSize; // this.Grid.Width / this.Grid.Divisor;
                    for (var i = 0; i < modifiers.length; i++) {
                        var target = modifiers[i];
                        var myPos = block.Position;
                        var targetPos = target.Position;
                        var myLine = new Line_1.Line();
                        var xDif = (targetPos.x - myPos.x);
                        var yDif = (targetPos.y - myPos.y);
                        myLine.Points.push(new Point(myPos.x, myPos.y));
                        if (xDif > 0) {
                            if (yDif < 0) {
                                if (-yDif < xDif) {
                                    myLine.Points.push(new Point(Math.round(myPos.x + ((xDif - (-yDif)))), Math.round(myPos.y)));
                                }
                                if (-yDif > xDif) {
                                    myLine.Points.push(new Point(Math.round(myPos.x), Math.round(myPos.y - (((-yDif) - xDif)))));
                                }
                            }
                            if (yDif > 0) {
                                if (yDif < xDif) {
                                    myLine.Points.push(new Point(Math.round(myPos.x + ((xDif - yDif))), Math.round(myPos.y)));
                                }
                                if (yDif > xDif) {
                                    myLine.Points.push(new Point(Math.round(myPos.x), Math.round(myPos.y + ((yDif - xDif)))));
                                }
                            }
                        }
                        if (xDif < 0) {
                            if (yDif < 0) {
                                if (yDif > xDif) {
                                    myLine.Points.push(new Point(Math.round(myPos.x - ((yDif - xDif))), Math.round(myPos.y)));
                                }
                                if (yDif < xDif) {
                                    myLine.Points.push(new Point(Math.round(myPos.x), Math.round(myPos.y - ((xDif - yDif)))));
                                }
                            }
                            if (yDif > 0) {
                                if (yDif < -xDif) {
                                    myLine.Points.push(new Point(Math.round(myPos.x - (((-xDif) - yDif))), Math.round(myPos.y)));
                                }
                                if (yDif > -xDif) {
                                    myLine.Points.push(new Point(Math.round(myPos.x), Math.round(myPos.y + ((yDif - (-xDif))))));
                                }
                            }
                        }
                        myLine.Points.push(new Point(targetPos.x, targetPos.y));
                        //console.log(block.IsPowered)
                        if (block.IsPowered()) {
                            this._Powered.push(myLine);
                        }
                        else {
                            this._Unpowered.push(myLine);
                        }
                    }
                }
            } // end loop
            //console.log(this._Powered);
            //console.log(this._Unpowered);
        };
        return ConnectionLines;
    })(DisplayObject);
    exports.ConnectionLines = ConnectionLines;
});
//# sourceMappingURL=ConnectionLines.js.map