define(["require", "exports", './Device', "etch"], function (require, exports, Device_1) {
    var Point = etch.primitives.Point;
    var Metrics = (function () {
        function Metrics() {
            App.ZoomLevel = 1;
            App.DragOffset = new Point(0, 0);
            App.ScaledDragOffset = new Point(0, 0);
            this.C = new Point(0, 0);
            this.OptionsX = 0.3;
            this.OptionsPoint = new Point(0.3, 0.6); //screen percentage
            this.ItemsPerPage = 6;
            this.Device = Device_1.Device.desktop;
            this._DeviceZoom = 1;
            this.HeaderHeight = 60;
        }
        Metrics.prototype.Compute = function () {
            this._ScreenDivision = 850; // divisions of the screen width to make unit
            var gridSize = 15; // unit width of a grid cell
            // GET DISPLAY SIZE //
            var canvas = App.Canvas;
            var width = window.innerWidth;
            var height = window.innerHeight;
            //DEVICE BREAKPOINTS //
            this.DeviceCheck();
            // DEFINE UNIT & GRID SIZE //
            App.Unit = (width / this._ScreenDivision) * this.PixelRatio;
            //App.ScaledUnit = (App.Unit * App.ZoomLevel) * this._DeviceZoom;
            App.GridSize = gridSize * App.Unit;
            //App.ScaledGridSize = (App.GridSize * App.ZoomLevel) * this._DeviceZoom;
            this.UpdateGridScale();
            // USE PIXEL RATIO FOR RETINA DISPLAYS //
            canvas.Width = width * this.PixelRatio;
            canvas.Height = height * this.PixelRatio;
            canvas.Style.width = width + "px";
            canvas.Style.height = height + "px";
            for (var i = 0; i < App.SubCanvas.length; i++) {
                var c = App.SubCanvas[i];
                c.width = (width + 1.5) * this.PixelRatio;
                c.height = (height) * this.PixelRatio;
                c.style.width = (width * 1.5) + "px";
                c.style.height = (height) + "px";
            }
            App.Width = width * this.PixelRatio;
            App.Height = height * this.PixelRatio;
            App.MainScene.Width = App.Width;
            App.MainScene.Height = App.Height;
            this.C.x = App.Width * 0.5;
            this.C.y = App.Height * 0.5;
            // SET GLOBAL TYPE STYLES //
            var headerType = Math.round(App.Unit * 28);
            var headerTypePR = Math.round(App.Unit * (28 / this.PixelRatio));
            var sliderType = Math.round(App.Unit * 33);
            var urlType = Math.round(App.Unit * (24 / this.PixelRatio));
            var urlType2 = Math.round(App.Unit * 24);
            var largeType = Math.round(App.Unit * 11);
            var midType = Math.round(App.Unit * 10);
            var bodyType = Math.round(App.Unit * 8);
            var italicType = Math.round(App.Unit * 7.5);
            var italicType2 = Math.round(App.Unit * 8);
            var italicType3 = Math.round(App.Unit * 9);
            var dataType = Math.round(App.Unit * 5);
            this.TxtHeader = "200 " + headerType + "px Dosis";
            this.TxtHeaderPR = "200 " + headerTypePR + "px Dosis";
            this.TxtSlider = "200 " + sliderType + "px Dosis";
            this.TxtUrl = "200 " + urlType + "px Dosis";
            this.TxtUrl2 = "200 " + urlType2 + "px Dosis";
            this.TxtMid = "400 " + midType + "px Dosis";
            this.TxtLarge = "400 " + largeType + "px Dosis";
            this.TxtBody = "200 " + bodyType + "px Dosis";
            this.TxtItalic = "300 italic " + italicType + "px Merriweather Sans";
            this.TxtItalic2 = "300 italic " + italicType2 + "px Merriweather Sans";
            this.TxtItalic3 = "300 italic " + italicType3 + "px Merriweather Sans";
            this.TxtData = "400 " + dataType + "px PT Sans";
            /*// STYLE DOM SELECTED TEXT HIGHLIGHT COLOUR //
            var styleElem = document.getElementById("selectStyle");
            var col = App.ColorManager.ColorString(App.Palette[1]);
            styleElem.innerHTML='::selection{ background-color: ' + col + '; background-blend-mode: normal; mix-blend-mode: normal;}';*/
        };
        Metrics.prototype.UpdateGridScale = function () {
            App.ScaledUnit = (App.Unit * App.ZoomLevel) * this._DeviceZoom;
            App.ScaledGridSize = (App.GridSize * App.ZoomLevel) * this._DeviceZoom;
            App.ScaledDragOffset.x = (App.DragOffset.x * App.ZoomLevel);
            App.ScaledDragOffset.y = (App.DragOffset.y * App.ZoomLevel);
        };
        Object.defineProperty(Metrics.prototype, "PixelRatio", {
            get: function () {
                return Utils.Device.getPixelRatio(App.Canvas.Ctx);
            },
            enumerable: true,
            configurable: true
        });
        //-------------------------------------------------------------------------------------------
        //  DEVICE RESPONSE
        //-------------------------------------------------------------------------------------------
        Metrics.prototype.DeviceCheck = function () {
            // DEVICE BREAKPOINTS //
            var width = window.innerWidth;
            var height = window.innerHeight;
            // MOBILE PORTRAIT //
            if (height > (width * 1.3)) {
                this._ScreenDivision = 475;
                this.OptionsPoint = new Point(0.5, 0.4);
                this.ItemsPerPage = 3;
                this._DeviceZoom = 1;
                this.Device = Device_1.Device.mobile;
            }
            else if (height > (width * 1.1)) {
                this._ScreenDivision = 600;
                this.OptionsPoint = new Point(0.2, 0.5);
                this.ItemsPerPage = 4;
                this._DeviceZoom = 1;
                this.Device = Device_1.Device.tablet;
            }
            else {
                this.OptionsPoint = new Point(0.3, 0.6);
                this.ItemsPerPage = 6;
                this._DeviceZoom = 1;
                this.Device = Device_1.Device.desktop;
            }
        };
        //-------------------------------------------------------------------------------------------
        //  UNIT CONVERSIONS
        //-------------------------------------------------------------------------------------------
        Metrics.prototype.CursorToGrid = function (point) {
            var x = Math.round(((point.x - (App.ScaledDragOffset.x * App.Unit)) - this.C.x) / App.ScaledGridSize);
            var y = Math.round(((point.y - (App.ScaledDragOffset.y * App.Unit)) - this.C.y) / App.ScaledGridSize);
            return new Point(x, y);
        };
        Metrics.prototype.PointOnGrid = function (point) {
            var x = ((this.C.x + (App.ScaledDragOffset.x * App.Unit)) + (point.x * App.ScaledGridSize));
            var y = ((this.C.y + (App.ScaledDragOffset.y * App.Unit)) + (point.y * App.ScaledGridSize));
            return new Point(x, y);
        };
        Metrics.prototype.UnscaledPointOnGrid = function (point) {
            var x = (this.C.x + (App.DragOffset.x * App.Unit)) + (point.x * App.GridSize);
            var y = (this.C.y + (App.DragOffset.y * App.Unit)) + (point.y * App.GridSize);
            return new Point(x, y);
        };
        Metrics.prototype.UndraggedPointOnGrid = function (point) {
            var x = this.C.x + (point.x * App.ScaledGridSize);
            var y = this.C.y + (point.y * App.ScaledGridSize);
            return new Point(x, y);
        };
        Metrics.prototype.FloatOnGrid = function (point) {
            var x = (this.C.x + (App.ScaledDragOffset.x * App.Unit)) + (point.x * App.ZoomLevel);
            var y = (this.C.y + (App.ScaledDragOffset.y * App.Unit)) + (point.y * App.ZoomLevel);
            return new Point(x, y);
        };
        Metrics.prototype.GetRelativePoint = function (point, offset) {
            return new Point(point.x + offset.x, point.y + offset.y);
        };
        Metrics.prototype.ConvertGridUnitsToAbsolute = function (point) {
            return new Point(App.GridSize * point.x, App.GridSize * point.y);
        };
        Metrics.prototype.ConvertToPixelRatioPoint = function (point) {
            point.x *= this.PixelRatio;
            point.y *= this.PixelRatio;
        };
        Metrics.prototype.VectorFromAngle = function (angle) {
            // point temp replaces vector
            return new Point(Math.cos(angle), Math.sin(angle));
        };
        return Metrics;
    })();
    exports.Metrics = Metrics;
});
//# sourceMappingURL=Metrics.js.map