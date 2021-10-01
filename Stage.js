var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './MainScene', './Splash'], function (require, exports, MainScene_1, Splash_1) {
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            var _this = this;
            _super.call(this);
            this.MainScene = new MainScene_1.MainScene();
            this.DisplayList.Add(this.MainScene);
            this.MainScene.Init(App.Canvas);
            this.MainScene.Hide();
            this.Splash = new Splash_1.Splash();
            this.DisplayList.Add(this.Splash);
            this.Splash.Init(App.Canvas);
            this.Splash.AnimationFinished.on(function (s) {
                if (!App.IsLoadingComposition) {
                    _this.MainScene.Show();
                    _this.Splash.TransitionOut();
                }
            }, this);
            App.CompositionLoaded.on(function (s, e) {
                _this.CompositionLoaded(e);
            }, this);
            App.CompositionLoadFailed.on(function (s, e) {
                _this.CompositionLoadFailed(e);
            }, this);
        }
        Stage.prototype.CompositionLoaded = function (e) {
            if (this.Splash.IsAnimationFinished) {
                this.Splash.TransitionOut();
                this.MainScene.Show();
            }
        };
        Stage.prototype.CompositionLoadFailed = function (e) {
            this.Splash.Hide();
            this.MainScene.Show();
            this.MainScene.MessagePanel.NewMessage(App.L10n.Errors.LoadError);
        };
        return Stage;
    })(etch.drawing.Stage);
    exports.Stage = Stage;
});
//# sourceMappingURL=Stage.js.map