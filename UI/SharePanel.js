var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Device', './../Commands', './../Blocks/Sources/Recorder'], function (require, exports, Device_1, Commands_1, Recorder_1) {
    var Dimensions = Utils.Measurements.Dimensions;
    var DisplayObject = etch.drawing.DisplayObject;
    var SharePanel = (function (_super) {
        __extends(SharePanel, _super);
        function SharePanel() {
            _super.apply(this, arguments);
            this._Blink = 0;
        }
        SharePanel.prototype.Init = function (drawTo) {
            var _this = this;
            _super.prototype.Init.call(this, drawTo);
            this.Open = false;
            this._FirstSession = true;
            this._Saving = false;
            this._Warning = false;
            this._NoBlocks = true;
            this._NameUrl = "";
            this.SessionURL = "";
            this._SessionId = "";
            this.OffsetX = 0;
            this.OffsetY = -this.DrawTo.Height;
            this._UrlSelecting = false;
            this._RollOvers = [];
            // DOM ELEMENTS //
            this.TitleInputContainer = document.getElementById("shareTitle");
            this.URLInputContainer = document.getElementById("shareUrl");
            this.TitleInput = document.getElementById("shareTitleInput");
            this.URLInput = document.getElementById("shareUrlText");
            this.TitleInput.addEventListener('input', function (event) {
                _this.TestString(_this.TitleInput);
                _this.UpdateString(_this.TitleInput);
            });
            this.TitleInput.addEventListener('keydown', function (event) {
                _this.EnterCheck(event);
            });
            this._CommandManager = App.CommandManager;
            // todo: add to config
            this._CopyJson = {
                genUrl: "Generate share link",
                shareLine: "Made something cool? Generate your own unique link to share it with the world (we'd love to see):",
                copyLine: "Share your creation with this unique URL:",
                titleLine: "Title",
                generateLine: "Randomise Title",
                domain: this.GetUrl() + "?c=",
                facebook: "post to facebook",
                twitter: "post to twitter",
                subreddit: "post to BD subreddit",
                bookmark: "bookmark creation",
                save: "overwrite",
                saveAs: "create new",
                saving: "saving...",
                tweetText: "I made this @blokdust creation: "
            };
            if (App.SessionId) {
                this._FirstSession = false;
            }
            if (App.CompositionId) {
                this._SessionId = App.CompositionId;
            }
            this.GetTitleFromUrl();
            this.Resize();
        };
        // GET OUR START DOMAIN (localhost / blokdust.com) //
        SharePanel.prototype.GetUrl = function () {
            return [location.protocol, '//', location.host, location.pathname].join('');
        };
        //-------------------------------------------------------------------------------------------
        //  INPUT
        //-------------------------------------------------------------------------------------------
        // IF WE'VE LOADED A NEW COMP, SET THE TITLE FROM THE URL STRING //
        SharePanel.prototype.GetTitleFromUrl = function () {
            var decoded = decodeURI(window.location.href);
            var getName = decoded.split("&t=");
            // Set title from Url //
            if (getName.length > 1) {
                this.UpdateFormText(this.TitleInput, getName[1]);
                this.TestString(this.TitleInput);
                this.UpdateString(this.TitleInput);
            }
            else {
                this.SessionTitle = this.GenerateLabel();
            }
        };
        // DOES INPUT STRING NEED CHARS REMOVED //
        SharePanel.prototype.TestString = function (element) {
            var caretPos = element.selectionStart;
            if (caretPos > 0) {
                caretPos -= 1;
            }
            // [^A-Za-z0-9_] alpha-numeric
            // 	[][!"#$%&'()*+,./:;<=>?@\^_`{|}~-] punctuation
            // [.,\/#!$%\^&\*;:{}=\-_`~()] punctuation 2
            if (/[.,\/#\?\"\'$£%\^&\*;:{|}<=>\\@\`\+~()]/.test(element.value)) {
                element.value = element.value.replace(/[.,\/#\?\"\'$£%\^&\*;:{|}<=>\\@\`\+~()]/g, '');
                element.selectionStart = caretPos;
                element.selectionEnd = caretPos;
            }
        };
        // TITLE INPUT HAS CHANGED, USE UPDATED INPUT VALUE //
        SharePanel.prototype.UpdateString = function (element) {
            var string = element.value;
            this.SessionTitle = string;
            this.SetNameUrl(string);
            this.UpdateUrlText();
        };
        // COMBINE DOMAIN, COMP ID & TITLE, AND UPDATE URL INPUT & ADDRESS BAR //
        SharePanel.prototype.UpdateUrlText = function () {
            this.SessionURL = "" + this._CopyJson.domain + this._SessionId + this._NameUrl;
            this.UpdateFormText(this.URLInput, this.SessionURL);
            if (this._SessionId) {
                App.AddressBarManager.UpdateURL(this.SessionURL);
            }
        };
        // FORMAT THE TITLE FOR USE IN THE URL //
        SharePanel.prototype.SetNameUrl = function (string) {
            this._NameUrl = "&t=" + encodeURI(this.Capitalise(string));
        };
        // SET A PROVIDED DOM ELEMENT'S STRING //
        SharePanel.prototype.UpdateFormText = function (element, str) {
            element.value = str;
        };
        // ENTER PRESSED ON INPUT //
        SharePanel.prototype.EnterCheck = function (e) {
            var key = e.which || e.keyCode;
            if (key === 13) {
                this.Submit();
            }
        };
        SharePanel.prototype.Submit = function () {
            this.TitleInput.blur();
            this.ClearScroll();
        };
        //-------------------------------------------------------------------------------------------
        //  SAVE CHECK
        //-------------------------------------------------------------------------------------------
        // CHECK IF BLOCKS EXIST BEFORE ALLOWING SAVE/SHARE //
        SharePanel.prototype.GetWarning = function () {
            var warnBlocks = [];
            for (var i = 0; i < App.Blocks.length; i++) {
                var block = App.Blocks[i];
                if (block instanceof Recorder_1.Recorder) {
                    warnBlocks.push(block);
                }
            }
            this._Warning = (warnBlocks.length > 0);
            this._NoBlocks = (!App.Blocks.length);
        };
        //-------------------------------------------------------------------------------------------
        //  DRAW
        //-------------------------------------------------------------------------------------------
        SharePanel.prototype.Draw = function () {
            var ctx = this.Ctx;
            var midType = App.Metrics.TxtMid;
            var headType = App.Metrics.TxtHeader;
            var urlType = App.Metrics.TxtUrl2;
            var italicType = App.Metrics.TxtItalic2;
            var units = App.Unit;
            var centerY = this.OffsetY + (App.Height * 0.5);
            var shareX = this.OffsetX + (App.Width * 1.5);
            var buttonY = centerY + (35 * units);
            var appWidth = App.Width;
            var appHeight = App.Height;
            if (this.Open) {
                // BG //
                App.FillColor(ctx, App.Palette[2]);
                ctx.globalAlpha = 0.95;
                ctx.fillRect(0, this.OffsetY, appWidth, appHeight);
                // URL BOX //
                ctx.globalAlpha = 1;
                App.FillColor(ctx, App.Palette[1]);
                ctx.fillRect(shareX + (appWidth * 0.5) - (210 * units), centerY - (20 * units), 420 * units, 40 * units); // solid
                var arrowX = 275;
                var arrowY = 0;
                if (App.Metrics.Device === Device_1.Device.tablet) {
                    arrowX = 245;
                }
                if (App.Metrics.Device === Device_1.Device.mobile) {
                    arrowX = 190;
                    arrowY = 110;
                }
                if (this._FirstSession) {
                    // GENERATE URL //
                    if (this._Saving || this._NoBlocks) {
                        App.FillColor(ctx, App.Palette[1]);
                    }
                    else {
                        App.FillColor(ctx, App.Palette[App.ThemeManager.MenuOrder[3]]);
                    }
                    ctx.fillRect(this.OffsetX + (appWidth * 0.5) - (210 * units), centerY - (20 * units), 420 * units, 40 * units);
                    if (this._RollOvers[3] && !this._Saving) {
                        ctx.beginPath();
                        ctx.moveTo(this.OffsetX + (appWidth * 0.5), centerY + (29 * units));
                        ctx.lineTo(this.OffsetX + (appWidth * 0.5) - (10 * units), centerY + (19 * units));
                        ctx.lineTo(this.OffsetX + (appWidth * 0.5) + (10 * units), centerY + (19 * units));
                        ctx.closePath();
                        ctx.fill();
                    }
                    ctx.font = urlType;
                    ctx.textAlign = "center";
                    App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
                    ctx.fillText(this._CopyJson.genUrl.toUpperCase(), this.OffsetX + (appWidth * 0.5), centerY + (9 * units));
                    ctx.font = italicType;
                    ctx.textAlign = "left";
                    this.WordWrap(ctx, this._CopyJson.shareLine, this.OffsetX + (appWidth * 0.5) - (210 * units), centerY - (59 * units), 14 * units, 210 * units);
                }
                else {
                    // SAVE & SAVE AS //
                    if (this._Saving || this._NoBlocks) {
                        App.FillColor(ctx, App.Palette[1]);
                    }
                    else {
                        App.FillColor(ctx, App.Palette[App.ThemeManager.MenuOrder[3]]);
                    }
                    ctx.fillRect(this.OffsetX + (appWidth * 0.5) - (210 * units), centerY - (20 * units), 202.5 * units, 40 * units);
                    if (this._RollOvers[4] && !this._Saving) {
                        ctx.beginPath();
                        ctx.moveTo(this.OffsetX + (appWidth * 0.5) - (108.75 * units), centerY + (29 * units));
                        ctx.lineTo(this.OffsetX + (appWidth * 0.5) - (118.75 * units), centerY + (19 * units));
                        ctx.lineTo(this.OffsetX + (appWidth * 0.5) - (98.75 * units), centerY + (19 * units));
                        ctx.closePath();
                        ctx.fill();
                    }
                    if (this._Saving || this._NoBlocks) {
                        App.FillColor(ctx, App.Palette[1]);
                    }
                    else {
                        App.FillColor(ctx, App.Palette[App.ThemeManager.MenuOrder[1]]);
                    }
                    ctx.fillRect(this.OffsetX + (appWidth * 0.5) + (7.5 * units), centerY - (20 * units), 202.5 * units, 40 * units);
                    if (this._RollOvers[5] && !this._Saving) {
                        ctx.beginPath();
                        ctx.moveTo(this.OffsetX + (appWidth * 0.5) + (108.75 * units), centerY + (29 * units));
                        ctx.lineTo(this.OffsetX + (appWidth * 0.5) + (118.75 * units), centerY + (19 * units));
                        ctx.lineTo(this.OffsetX + (appWidth * 0.5) + (98.75 * units), centerY + (19 * units));
                        ctx.closePath();
                        ctx.fill();
                    }
                    ctx.font = urlType;
                    ctx.textAlign = "center";
                    App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
                    ctx.fillText(this._CopyJson.save.toUpperCase(), this.OffsetX + (appWidth * 0.5) - (108.75 * units), centerY + (9 * units));
                    ctx.fillText(this._CopyJson.saveAs.toUpperCase(), this.OffsetX + (appWidth * 0.5) + (108.75 * units), centerY + (9 * units));
                    ctx.font = italicType;
                    ctx.textAlign = "left";
                    this.WordWrap(ctx, this._CopyJson.shareLine, this.OffsetX + (appWidth * 0.5) - (210 * units), centerY - (59 * units), 14 * units, 210 * units);
                    // SKIP //
                    ctx.lineWidth = 2;
                    App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
                    ctx.beginPath();
                    ctx.moveTo(this.OffsetX + (appWidth * 0.5) + (arrowX * units), centerY + ((arrowY - 20) * units));
                    ctx.lineTo(this.OffsetX + (appWidth * 0.5) + ((arrowX + 20) * units), centerY + (arrowY * units));
                    ctx.lineTo(this.OffsetX + (appWidth * 0.5) + (arrowX * units), centerY + ((arrowY + 20) * units));
                    ctx.stroke();
                    ctx.font = midType;
                    ctx.fillText("SKIP", this.OffsetX + (appWidth * 0.5) + (arrowX * units), centerY + ((arrowY + 35) * units));
                }
                // SAVE MESSAGE //
                if (this._Saving) {
                    ctx.font = midType;
                    ctx.textAlign = "center";
                    ctx.fillText(this._CopyJson.saving.toUpperCase(), this.OffsetX + (appWidth * 0.5), centerY + (75 * units));
                    App.AnimationsLayer.DrawSprite(ctx, 'loading', appWidth * 0.5, centerY + (50 * units), 16, true);
                }
                else {
                    // WARNING MESSAGE //
                    if (this._Warning) {
                        ctx.font = italicType;
                        ctx.textAlign = "left";
                        this.WordWrap(ctx, App.L10n.UI.SharePanel.SaveWarning, this.OffsetX + (appWidth * 0.5) - (210 * units), centerY + (75 * units), 14 * units, 420 * units);
                    }
                    if (this._NoBlocks) {
                        ctx.font = italicType;
                        ctx.textAlign = "left";
                        this.WordWrap(ctx, App.L10n.UI.SharePanel.NoBlocks, this.OffsetX + (appWidth * 0.5) - (210 * units), centerY + (75 * units), 14 * units, 420 * units);
                    }
                }
                // BACK ARROW //
                ctx.lineWidth = 2;
                App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
                ctx.beginPath();
                ctx.moveTo(shareX + (appWidth * 0.5) - (arrowX * units), centerY + ((arrowY - 20) * units));
                ctx.lineTo(shareX + (appWidth * 0.5) - ((arrowX + 20) * units), centerY + (arrowY * units));
                ctx.lineTo(shareX + (appWidth * 0.5) - (arrowX * units), centerY + ((arrowY + 20) * units));
                ctx.stroke();
                // SHARE BUTTONS //
                ctx.fillStyle = "#fc4742"; // gp //TODO: Store these share colours somewhere
                ctx.fillRect(shareX + (appWidth * 0.5) + (80 * units), buttonY, 130 * units, 30 * units);
                if (this._RollOvers[8]) {
                    ctx.beginPath();
                    ctx.moveTo(shareX + (appWidth * 0.5) + (145 * units), buttonY + (39 * units));
                    ctx.lineTo(shareX + (appWidth * 0.5) + (135 * units), buttonY + (29 * units));
                    ctx.lineTo(shareX + (appWidth * 0.5) + (155 * units), buttonY + (29 * units));
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.fillStyle = "#2db0e7"; // tw
                ctx.fillRect(shareX + (appWidth * 0.5) - (65 * units), buttonY, 130 * units, 30 * units);
                if (this._RollOvers[7]) {
                    ctx.beginPath();
                    ctx.moveTo(shareX + (appWidth * 0.5), buttonY + (39 * units));
                    ctx.lineTo(shareX + (appWidth * 0.5) - (10 * units), buttonY + (29 * units));
                    ctx.lineTo(shareX + (appWidth * 0.5) + (10 * units), buttonY + (29 * units));
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.fillStyle = "#2152ad"; // fb
                ctx.fillRect(shareX + (appWidth * 0.5) - (210 * units), buttonY, 130 * units, 30 * units);
                if (this._RollOvers[6]) {
                    ctx.beginPath();
                    ctx.moveTo(shareX + (appWidth * 0.5) - (145 * units), buttonY + (39 * units));
                    ctx.lineTo(shareX + (appWidth * 0.5) - (135 * units), buttonY + (29 * units));
                    ctx.lineTo(shareX + (appWidth * 0.5) - (155 * units), buttonY + (29 * units));
                    ctx.closePath();
                    ctx.fill();
                }
                // SHARE COPY //
                App.FillColor(ctx, App.Palette[App.ThemeManager.Txt]);
                App.StrokeColor(ctx, App.Palette[App.ThemeManager.Txt]);
                ctx.textAlign = "left";
                ctx.font = midType;
                ctx.font = italicType;
                ctx.fillText(this._CopyJson.copyLine, shareX + (appWidth * 0.5) - (210 * units), centerY - (33 * units));
                ctx.textAlign = "center";
                ctx.font = midType;
                ctx.fillText(this._CopyJson.facebook.toUpperCase(), shareX + (appWidth * 0.5) - (145 * units), buttonY + (18.5 * units));
                ctx.fillText(this._CopyJson.twitter.toUpperCase(), shareX + (appWidth * 0.5), buttonY + (18.5 * units));
                ctx.fillText(this._CopyJson.subreddit.toUpperCase(), shareX + (appWidth * 0.5) + (145 * units), buttonY + (18.5 * units));
                // TITLE //
                if (App.Metrics.Device === Device_1.Device.mobile) {
                    ctx.textAlign = "left";
                    ctx.fillText(this._CopyJson.titleLine.toUpperCase(), (appWidth * 0.5) - (210 * units), centerY - (150 * units));
                }
                else {
                    ctx.textAlign = "right";
                    ctx.fillText(this._CopyJson.titleLine.toUpperCase(), (appWidth * 0.5) - (225 * units), centerY - (106 * units));
                }
                ctx.beginPath();
                ctx.moveTo((appWidth * 0.5) - (210 * units), centerY - (90 * units));
                ctx.lineTo((appWidth * 0.5) + (210 * units), centerY - (90 * units));
                ctx.stroke();
                ctx.textAlign = "left";
                ctx.font = headType;
                //ctx.fillText(this.SessionTitle, (appWidth*0.5) - (210*units), centerY - (100*units) );
                var titleW = ctx.measureText(this.SessionTitle.toUpperCase()).width;
                // TYPE BAR //
                /*if (App.FocusManager.IsActive()) {
                    if (this._Blink > 50) {
                        ctx.fillRect((appWidth*0.5) - (210*units) + titleW + (5*units),centerY - (123*units),2*units,26*units);
                    }
                    this._Blink += 1;
                    if (this._Blink == 100) {
                        this._Blink = 0;
                    }
                }*/
                // PANEL TITLE //
                ctx.font = headType;
                ctx.fillText("SHARE", 20 * units, this.OffsetY + (30 * units) + (11 * units));
                // GEN TITLE //
                ctx.font = midType;
                var genW = ctx.measureText(this._CopyJson.generateLine.toUpperCase()).width;
                ctx.fillText(this._CopyJson.generateLine.toUpperCase(), (appWidth * 0.5) + (205 * units) - genW, centerY - (106 * units));
                ctx.beginPath();
                ctx.moveTo((appWidth * 0.5) + (210 * units), centerY - (120 * units));
                ctx.lineTo((appWidth * 0.5) + (200 * units) - genW, centerY - (120 * units));
                ctx.lineTo((appWidth * 0.5) + (200 * units) - genW, centerY - (100 * units));
                ctx.lineTo((appWidth * 0.5) + (210 * units), centerY - (100 * units));
                ctx.closePath();
                ctx.stroke();
                var clx = 230;
                var cly = 130;
                if (App.Metrics.Device === Device_1.Device.mobile) {
                    clx = 202.5;
                    cly = 150;
                }
                // CLOSE BUTTON //
                ctx.beginPath();
                ctx.moveTo((appWidth * 0.5) + ((clx - 7.5) * units), centerY - ((cly - 7.5) * units));
                ctx.lineTo((appWidth * 0.5) + ((clx + 7.5) * units), centerY - ((cly + 7.5) * units));
                ctx.moveTo((appWidth * 0.5) + ((clx + 7.5) * units), centerY - ((cly - 7.5) * units));
                ctx.lineTo((appWidth * 0.5) + ((clx - 7.5) * units), centerY - ((cly + 7.5) * units));
                ctx.stroke();
            }
        };
        //-------------------------------------------------------------------------------------------
        //  STRING FUNCTIONS
        //-------------------------------------------------------------------------------------------
        SharePanel.prototype.WordWrap = function (context, text, x, y, lineHeight, fitWidth) {
            fitWidth = fitWidth || 0;
            if (fitWidth <= 0) {
                context.fillText(text, x, y);
                return;
            }
            var words = text.split(' ');
            var currentLine = 0;
            var idx = 1;
            while (words.length > 0 && idx <= words.length) {
                var str = words.slice(0, idx).join(' ');
                var w = context.measureText(str).width;
                if (w > fitWidth) {
                    if (idx == 1) {
                        idx = 2;
                    }
                    context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
                    currentLine++;
                    words = words.splice(idx - 1);
                    idx = 1;
                }
                else {
                    idx++;
                }
            }
            if (idx > 0)
                context.fillText(words.join(' '), x, y + (lineHeight * currentLine));
        };
        SharePanel.prototype.Capitalise = function (string) {
            var s = string.toLowerCase();
            s = this.UppercaseAt(s, 0);
            for (var i = 0; i < s.length; i++) {
                if (s.charAt(i) === " ") {
                    s = this.UppercaseAt(s, i + 1);
                }
            }
            return s;
        };
        SharePanel.prototype.UppercaseAt = function (str, index) {
            if (index > str.length - 1)
                return str;
            var chr = str.substr(index, 1).toUpperCase();
            return str.substr(0, index) + chr + str.substr(index + 1);
        };
        //-------------------------------------------------------------------------------------------
        //  TWEEN
        //-------------------------------------------------------------------------------------------
        SharePanel.prototype.DelayTo = function (panel, destination, t, delay, v) {
            var offsetTween = new window.TWEEN.Tween({ x: panel["" + v] });
            offsetTween.to({ x: destination }, t);
            offsetTween.onUpdate(function () {
                panel["" + v] = this.x;
                if (v == "OffsetX") {
                    panel.TweenDom(panel.URLInputContainer, this.x, "x", 200, 1.5);
                }
                if (v == "OffsetY") {
                    panel.TweenDom(panel.URLInputContainer, this.x, "y", 20, 0);
                    panel.TweenDom(panel.TitleInputContainer, this.x, "y", 132, 0);
                }
            });
            offsetTween.onComplete(function () {
                if (v == "OffsetY") {
                    if (destination !== 0) {
                        panel.Open = false;
                        panel.HideDom();
                    }
                    panel.OffsetX = 0;
                    var shareUrl = document.getElementById("shareUrl");
                    shareUrl.style.left = "1000%";
                }
                if (v == "OffsetX" && panel._FirstSession) {
                    panel._FirstSession = false;
                }
            });
            offsetTween.easing(window.TWEEN.Easing.Exponential.InOut);
            offsetTween.delay(delay);
            offsetTween.start(this.LastVisualTick);
        };
        //-------------------------------------------------------------------------------------------
        //  TITLE GENERATOR
        //-------------------------------------------------------------------------------------------
        SharePanel.prototype.GenerateLabel = function () {
            var label = "";
            var diceRoll;
            // DIALECT 1 (Norwegian alphabet)
            var prefixA = ["al", "aal", "blok", "bjør", "brø", "drø", "du", "ef", "en", "jen", "ja", "lek", "lu", "mal", "svi", "svar", "sku", "spru", "kø", "kin", "kvi", "kna", "kvar", "hof", "tje", "fja", "ub", "rø", "vø", "vol", "va", "ey", "ly", "sky", "ske", "skø", "sji", "yø", "ø"];
            var syllableA = ["jen", "ke", "kil", "kol", "kof", "nø", "ken", "ren", "re", "rol", "sen", "se", "sa", "then", "tol", "te", "ty", "ple", "pa", "ka", "y"];
            var suffixA = ["berg", "holm", "sorg", "fla", "trad", "stad", "mark", "dt", "de", "s", "kla", "ken", "kjen", "gen", "gan", "likt", "tra", "tet", "tal", "man", "la", "tt", "bb", "na", "k", "ka", "bø", "dø", "gø", "jø", "kø", "lø", "mø", "nø", "pø", "sø", "slø", "tø", "vø", "lok", "vik", "slik", "dust"];
            var joinerA = ["berg", "sorg", "fla", "lag", "tra", "tet", "tal", "du", "na", "bø", "dø", "gø", "jø", "kø", "lø", "mø", "nø", "pø", "sø", "slø", "tø", "vø", "lok", "vik", "dust", "dok", "blok"];
            // DIALECT 2 (Swedish alphabet)
            var prefixB = ["al", "aal", "blok", "björ", "brö", "drö", "du", "ef", "en", "jen", "jä", "lek", "lü", "mal", "svi", "svar", "sku", "spru", "ko", "kin", "kvi", "kna", "kvär", "höf", "tje", "fjä", "ub", "ro", "vo", "vol", "vä", "ey", "ly", "sky", "ske", "sko", "sji", "yö", "ö"];
            var syllableB = ["jen", "ke", "kil", "kol", "kof", "nö", "ken", "ren", "re", "rol", "sen", "se", "sa", "then", "tol", "te", "ty", "ple", "pa", "ka", "y"];
            var suffixB = ["berg", "holm", "sorg", "fla", "träd", "städ", "mark", "dt", "de", "s", "kla", "ken", "kjen", "gen", "gan", "likt", "tra", "tet", "tal", "man", "la", "tt", "bb", "na", "k", "ka", "bö", "dö", "gö", "jö", "kö", "lö", "mö", "nö", "pö", "sö", "slö", "tö", "vö", "lok", "vik", "slik", "dust"];
            var joinerB = ["berg", "sorg", "fla", "lag", "tra", "tet", "tal", "dü", "na", "bö", "dö", "gö", "jö", "kö", "lö", "mö", "nö", "pö", "sö", "slö", "tö", "vö", "lok", "vik", "dust", "dok", "blok"];
            var prefixes = [prefixA, prefixB];
            var syllables = [syllableA, syllableB];
            var suffixes = [suffixA, suffixB];
            var joiners = [joinerA, joinerB];
            // randomly select dialect
            var dialect = Math.round(Math.random());
            var prefix = prefixes[dialect];
            var syllable = syllables[dialect];
            var suffix = suffixes[dialect];
            var joiner = joiners[dialect];
            // ALGORITHM //
            // FIRST WORD //
            label = "" + label + prefix[Math.floor(Math.random() * prefix.length)];
            diceRoll = Math.floor(Math.random() * 8);
            if (diceRoll == 0) {
                label = "" + label + syllable[Math.floor(Math.random() * syllable.length)];
            }
            label = "" + label + suffix[Math.floor(Math.random() * suffix.length)];
            // JOINER //
            diceRoll = Math.floor(Math.random() * 10);
            if (diceRoll == 0) {
                label = "" + label + " " + joiner[Math.floor(Math.random() * joiner.length)];
            }
            // SECOND WORD //
            diceRoll = Math.floor(Math.random() * 2);
            if (diceRoll !== 0) {
                label = "" + label + " " + prefix[Math.floor(Math.random() * prefix.length)];
                diceRoll = Math.floor(Math.random() * 5);
                if (diceRoll == 0) {
                    label = "" + label + syllable[Math.floor(Math.random() * syllable.length)];
                }
                label = "" + label + suffix[Math.floor(Math.random() * suffix.length)];
            }
            // DONE //
            this.SetNameUrl(label);
            this.UpdateFormText(this.TitleInput, label);
            this.UpdateUrlText();
            return label;
        };
        //-------------------------------------------------------------------------------------------
        //  INTERACTION
        //-------------------------------------------------------------------------------------------
        SharePanel.prototype.OpenPanel = function () {
            this.Open = true;
            this.OffsetY = -App.Height;
            //this.TitleInput.focus();
            this.GetWarning();
            this.ShowDom();
            this.DelayTo(this, 0, 500, 0, "OffsetY");
        };
        SharePanel.prototype.ClosePanel = function () {
            this._Saving = false;
            this.DelayTo(this, -App.Height, 500, 0, "OffsetY");
        };
        SharePanel.prototype.GenerateLink = function () {
            if (!this._NoBlocks) {
                this._Saving = true;
                this._CommandManager.ExecuteCommand(Commands_1.Commands.SAVE_AS);
            }
        };
        SharePanel.prototype.UpdateLink = function () {
            if (!this._NoBlocks) {
                this._Saving = true;
                this._CommandManager.ExecuteCommand(Commands_1.Commands.SAVE);
            }
        };
        SharePanel.prototype.ReturnLink = function (id) {
            this._Saving = false;
            this._SessionId = id;
            this.UpdateUrlText();
            this.DelayTo(this, -(App.Width * 1.5), 500, 0, "OffsetX");
        };
        SharePanel.prototype.ShareFacebook = function () {
            var href = "http://www.facebook.com/sharer.php?u=";
            href = "" + href + encodeURIComponent(this.SessionURL);
            window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        };
        SharePanel.prototype.ShareTwitter = function () {
            var href = "https://twitter.com/intent/tweet?text=";
            href = "" + href + encodeURIComponent(this._CopyJson.tweetText);
            href = "" + href + "&url=" + encodeURIComponent(this.SessionURL);
            window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        };
        SharePanel.prototype.ShareSubreddit = function () {
            var title = encodeURIComponent(Utils.Urls.getQuerystringParameterFromString('t', this.SessionURL));
            var url = encodeURIComponent(this.SessionURL);
            var href = "https://www.reddit.com/r/blokdust/submit?title=" + title + "&url=" + url;
            window.open(href, 'ShareToBlokDustSubreddit');
        };
        SharePanel.prototype.MouseDown = function (point) {
            this.HitTests(point);
            if (!this._RollOvers[0]) {
                if (this._RollOvers[1]) {
                    this.ClosePanel();
                    return;
                }
                if (this._RollOvers[2]) {
                    this.SessionTitle = this.GenerateLabel();
                    return;
                }
                if (this._RollOvers[3]) {
                    this.GenerateLink();
                    return;
                }
                if (this._RollOvers[4]) {
                    this.UpdateLink();
                    return;
                }
                if (this._RollOvers[5]) {
                    this.GenerateLink();
                    return;
                }
                if (this._RollOvers[6]) {
                    this.ShareFacebook();
                    return;
                }
                if (this._RollOvers[7]) {
                    this.ShareTwitter();
                    return;
                }
                if (this._RollOvers[8]) {
                    this.ShareSubreddit();
                    return;
                }
                if (this._RollOvers[9]) {
                    this.DelayTo(this, 0, 500, 0, "OffsetX");
                    return;
                }
                if (this._RollOvers[10]) {
                    this.DelayTo(this, -(App.Width * 1.5), 500, 0, "OffsetX");
                    return;
                }
                this._UrlSelecting = false;
            }
            else {
                this._UrlSelecting = true;
            }
        };
        SharePanel.prototype.MouseUp = function (point, isTouch) {
        };
        SharePanel.prototype.MouseMove = function (point) {
            this.HitTests(point);
        };
        SharePanel.prototype.HitTests = function (point) {
            var units = App.Unit;
            var shareX = this.OffsetX + (App.Width * 1.5);
            var centerY = this.OffsetY + (App.Height * 0.5);
            var buttonY = centerY + (35 * units);
            var ctx = this.Ctx;
            var midType = App.Metrics.TxtMid;
            var appWidth = App.Width;
            ctx.font = midType;
            var genW = ctx.measureText(this._CopyJson.generateLine.toUpperCase()).width;
            var clx = 230;
            var cly = 130;
            var arrowX = 285;
            var arrowY = 0;
            if (App.Metrics.Device === Device_1.Device.tablet) {
                arrowX = 255;
            }
            if (App.Metrics.Device === Device_1.Device.mobile) {
                clx = 202.5;
                cly = 150;
                arrowX = 200;
                arrowY = 110;
            }
            this._RollOvers[0] = Dimensions.hitRect(shareX + (appWidth * 0.5) - (210 * units), centerY - (20 * units), 420 * units, 40 * units, point.x, point.y); // url
            this._RollOvers[1] = Dimensions.hitRect((appWidth * 0.5) + ((clx - 20) * units), centerY - ((cly + 20) * units), 40 * units, 40 * units, point.x, point.y); // close
            this._RollOvers[2] = Dimensions.hitRect((appWidth * 0.5) + (200 * units) - genW, centerY - (130 * units), genW + (10 * units), 40 * units, point.x, point.y); // gen title
            if (this._FirstSession) {
                this._RollOvers[3] = Dimensions.hitRect(this.OffsetX + (appWidth * 0.5) - (210 * units), centerY - (20 * units), 420 * units, 40 * units, point.x, point.y); // gen URL
                this._RollOvers[4] = false;
                this._RollOvers[5] = false;
                this._RollOvers[10] = false;
            }
            else {
                this._RollOvers[3] = false;
                this._RollOvers[4] = Dimensions.hitRect(this.OffsetX + (appWidth * 0.5) - (210 * units), centerY - (20 * units), 202.5 * units, 40 * units, point.x, point.y); // save
                this._RollOvers[5] = Dimensions.hitRect(this.OffsetX + (appWidth * 0.5) + (7.5 * units), centerY - (20 * units), 202.5 * units, 40 * units, point.x, point.y); // save as
                this._RollOvers[10] = Dimensions.hitRect(this.OffsetX + (appWidth * 0.5) + ((arrowX - 15) * units), centerY + (units * (arrowY - 20)), 30 * units, 40 * units, point.x, point.y); // skip
            }
            this._RollOvers[6] = Dimensions.hitRect(shareX + (appWidth * 0.5) - (210 * units), buttonY, 130 * units, 30 * units, point.x, point.y); // fb
            this._RollOvers[7] = Dimensions.hitRect(shareX + (appWidth * 0.5) - (65 * units), buttonY, 130 * units, 30 * units, point.x, point.y); // tw
            this._RollOvers[8] = Dimensions.hitRect(shareX + (appWidth * 0.5) + (80 * units), buttonY, 130 * units, 30 * units, point.x, point.y); // gp
            this._RollOvers[9] = Dimensions.hitRect(shareX + (appWidth * 0.5) - ((arrowX + 15) * units), centerY + (units * (arrowY - 20)), 30 * units, 40 * units, point.x, point.y); // back
        };
        //-------------------------------------------------------------------------------------------
        //  GENERAL
        //-------------------------------------------------------------------------------------------
        SharePanel.prototype.Reset = function () {
            this._FirstSession = true;
            if (App.SessionId) {
                this._FirstSession = false;
            }
            this._SessionId = App.CompositionId;
            if (!this._SessionId) {
                this.SessionTitle = this.GenerateLabel();
            }
        };
        SharePanel.prototype.Resize = function () {
            if (this.OffsetX !== 0) {
                this.OffsetX = -(App.Width * 1.5);
            }
            this.ClearScroll();
            if (this.URLInput) {
                this.StyleDom(this.URLInputContainer, 400, 40, 200, 20, this.OffsetX + (App.Width * 1.5), App.Metrics.TxtUrl);
                this.StyleDom(this.TitleInputContainer, 300, 42, 210, 132, 0, App.Metrics.TxtHeaderPR);
            }
        };
        //-------------------------------------------------------------------------------------------
        //  CSS / DOM
        //-------------------------------------------------------------------------------------------
        SharePanel.prototype.TweenDom = function (element, value, mode, position, offset) {
            var units = (App.Unit);
            var pr = App.Metrics.PixelRatio;
            switch (mode) {
                case "x":
                    element.style.left = "" + ((value + (App.Width * (0.5 + offset)) - (units * position)) / pr) + "px";
                    break;
                case "y":
                    element.style.top = "" + ((value + (App.Height * 0.5) - (units * position)) / pr) + "px";
                    break;
            }
        };
        SharePanel.prototype.StyleDom = function (element, width, height, x, y, xOffset, font) {
            var units = (App.Unit);
            var pr = App.Metrics.PixelRatio;
            element.style.font = font;
            element.style.width = "" + (units * (width / pr)) + "px";
            element.style.height = "" + (units * (height / pr)) + "px";
            element.style.lineHeight = "" + (units * (height / pr)) + "px";
            element.style.display = "block";
            if (!this.Open) {
                this.OffsetY = -App.Height;
                element.style.display = "none";
                element.style.visibility = "false";
            }
            var offsetX = xOffset / pr;
            var offsetY = this.OffsetY / pr;
            var width = App.Width / pr;
            var height = App.Height / pr;
            element.style.left = "" + (offsetX + (width * 0.5) - (units * (x / pr))) + "px";
            element.style.top = "" + (offsetY + (height * 0.5) - (units * (y / pr))) + "px";
        };
        SharePanel.prototype.ShowDom = function () {
            var shareUrl = this.URLInputContainer;
            var shareTitle = this.TitleInputContainer;
            shareUrl.style.display = "block";
            shareUrl.style.visibility = "true";
            shareTitle.style.display = "block";
            shareTitle.style.visibility = "true";
        };
        SharePanel.prototype.HideDom = function () {
            var shareUrl = this.URLInputContainer;
            var shareTitle = this.TitleInputContainer;
            shareUrl.style.display = "none";
            shareUrl.style.visibility = "false";
            shareTitle.style.display = "none";
            shareTitle.style.visibility = "false";
        };
        SharePanel.prototype.ClearScroll = function () {
            window.scrollTo(0, 0);
        };
        return SharePanel;
    })(DisplayObject);
    exports.SharePanel = SharePanel;
});
//# sourceMappingURL=SharePanel.js.map