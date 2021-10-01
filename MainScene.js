var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './UI/AnimationsLayer', './UI/CreateNew', './Commands', './UI/ConnectionLines', './Blocks/Interaction/Controller', './UI/Header', './LaserBeams', './UI/MessagePanel', './UI/OptionsPanel', './ParticleLayer', './Blocks/Power/PowerEffect', './Blocks/Power/PowerSource', './UI/RecorderPanel', './UI/SettingsPanel', './UI/SharePanel', './UI/SoundcloudPanel', './UI/StageDragger', './UI/ToolTip', './UI/TrashCan', './UI/Tutorial', './UI/TutorialHotspots', './UI/ZoomButtons'], function (require, exports, AnimationsLayer_1, CreateNew_1, Commands_1, ConnectionLines_1, Controller_1, Header_1, LaserBeams_1, MessagePanel_1, OptionsPanel_1, ParticleLayer_1, PowerEffect_1, PowerSource_1, RecorderPanel_1, SettingsPanel_1, SharePanel_1, SoundcloudPanel_1, StageDragger_1, ToolTip_1, TrashCan_1, Tutorial_1, TutorialHotspots_1, ZoomButtons_1) {
    var Dimensions = Utils.Measurements.Dimensions;
    var DisplayObject = etch.drawing.DisplayObject;
    var Point = etch.primitives.Point;
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        //-------------------------------------------------------------------------------------------
        //  SETUP
        //-------------------------------------------------------------------------------------------
        function MainScene() {
            _super.call(this);
            this._IsPointerDown = false;
            this.IsDraggingABlock = false;
        }
        MainScene.prototype.Setup = function () {
            var _this = this;
            _super.prototype.Setup.call(this);
            App.PointerInputManager.MouseDown.on(function (s, e) {
                _this.MouseDown(e);
            }, this);
            App.PointerInputManager.MouseUp.on(function (s, e) {
                _this.MouseUp(e);
            }, this);
            App.PointerInputManager.MouseMove.on(function (s, e) {
                _this.MouseMove(e);
            }, this);
            App.PointerInputManager.MouseWheel.on(function (s, e) {
                _this.MouseWheel(e);
            }, this);
            App.PointerInputManager.TouchStart.on(function (s, e) {
                _this.TouchStart(e);
            }, this);
            App.PointerInputManager.TouchEnd.on(function (s, e) {
                _this.TouchEnd(e);
            }, this);
            App.PointerInputManager.TouchMove.on(function (s, e) {
                _this.TouchMove(e);
            }, this);
            App.OperationManager.OperationComplete.on(function (operation) {
                _this._Invalidate();
            }, this);
            // COMPOSITION LOADED //
            App.CompositionLoaded.on(function (s, e) {
                _this.CompositionLoaded(e);
            }, this);
            // FILE DRAGGING //
            //App.DragFileInputManager.Dropped.on((s: any, e: any) => {
            //    e.stopPropagation();
            //    e.preventDefault();
            //    const b: Sampler = this.CreateBlockFromType(Sampler);
            //
            //    var files = e.dataTransfer.files; // FileList object.
            //
            //    App.Audio.AudioFileManager.DecodeFileData(files, (file: any, buffer: AudioBuffer) => {
            //        if (buffer) {
            //            //TODO: set the buffer of this newly created Sampler
            //            console.log(file.name + ' dropped');
            //        }
            //    });
            //
            //}, this);
            //
            //App.DragFileInputManager.DragEnter.on((s: any, e: any) => {
            //    console.log('file drag entered area');
            //}, this);
            //
            //App.DragFileInputManager.DragMove.on((s: any, e: any) => {
            //    e.stopPropagation();
            //    e.preventDefault();
            //    console.log('file drag over');
            //}, this);
            //
            //App.DragFileInputManager.DragLeave.on((s: any, e: any) => {
            //    console.log('file left drag area');
            //}, this);
            OptionTimeout = false; // todo: remove
            // METRICS //
            this._PointerPoint = new Point();
            this._SelectedBlockPosition = new Point();
            // Display Objects //
            this.ConnectionLines = new ConnectionLines_1.ConnectionLines();
            this.DisplayList.Add(this.ConnectionLines);
            this.ConnectionLines.Init(this);
            this.BlocksContainer = new DisplayObject();
            this.DisplayList.Add(this.BlocksContainer);
            this.BlocksContainer.Init(this);
            this.LaserBeams = new LaserBeams_1.LaserBeams();
            this.DisplayList.Add(this.LaserBeams);
            this.LaserBeams.Init(this);
            this.Particles = new ParticleLayer_1.ParticleLayer();
            this.DisplayList.Add(this.Particles);
            this.Particles.Init(this);
            this._ToolTip = new ToolTip_1.ToolTip();
            this.DisplayList.Add(this._ToolTip);
            this._ToolTip.Init(this);
            this.AnimationsLayer = new AnimationsLayer_1.AnimationsLayer();
            this.DisplayList.Add(this.AnimationsLayer);
            this.AnimationsLayer.Init(this);
            this._RecorderPanel = new RecorderPanel_1.RecorderPanel();
            this.DisplayList.Add(this._RecorderPanel);
            this._RecorderPanel.Init(this);
            this.ZoomButtons = new ZoomButtons_1.ZoomButtons();
            this.DisplayList.Add(this.ZoomButtons);
            this.ZoomButtons.Init(this);
            this.MainSceneDragger = new StageDragger_1.StageDragger();
            this.DisplayList.Add(this.MainSceneDragger);
            this.MainSceneDragger.Init(this);
            this._TrashCan = new TrashCan_1.TrashCan();
            this.DisplayList.Add(this._TrashCan);
            this._TrashCan.Init(this);
            this.Tutorial = new Tutorial_1.Tutorial();
            this.DisplayList.Add(this.Tutorial);
            this.Tutorial.Init(this);
            this.OptionsPanel = new OptionsPanel_1.OptionsPanel();
            this.DisplayList.Add(this.OptionsPanel);
            this.OptionsPanel.Init(this);
            this.Header = new Header_1.Header();
            this.DisplayList.Add(this.Header);
            this.Header.Init(this);
            this.CreateNew = new CreateNew_1.CreateNew();
            this.DisplayList.Add(this.CreateNew);
            this.CreateNew.Init(this);
            this.TutorialHotspots = new TutorialHotspots_1.TutorialHotspots();
            this.DisplayList.Add(this.TutorialHotspots);
            this.TutorialHotspots.Init(this);
            this.SharePanel = new SharePanel_1.SharePanel();
            this.DisplayList.Add(this.SharePanel);
            this.SharePanel.Init(this);
            this.SettingsPanel = new SettingsPanel_1.SettingsPanel();
            this.DisplayList.Add(this.SettingsPanel);
            this.SettingsPanel.Init(this);
            this.SoundcloudPanel = new SoundcloudPanel_1.SoundcloudPanel();
            this.DisplayList.Add(this.SoundcloudPanel);
            this.SoundcloudPanel.Init(this);
            this.MessagePanel = new MessagePanel_1.MessagePanel();
            this.DisplayList.Add(this.MessagePanel);
            this.MessagePanel.Init(this);
            this._Invalidate();
            //console.log(App.Stage);
            if (!App.CompositionId) {
                this.Tutorial.CheckLaunch();
            }
        };
        //-------------------------------------------------------------------------------------------
        //  UPDATE
        //-------------------------------------------------------------------------------------------
        MainScene.prototype.Update = function () {
            if (this.IsPaused)
                return;
            _super.prototype.Update.call(this);
        };
        //-------------------------------------------------------------------------------------------
        //  DRAW
        //-------------------------------------------------------------------------------------------
        MainScene.prototype.Draw = function () {
            _super.prototype.Draw.call(this);
            // BG //
            App.FillColor(this.Ctx, App.Palette[0]);
            this.Ctx.globalAlpha = 1;
            this.Ctx.fillRect(0, 0, this.Width, this.Height);
        };
        //-------------------------------------------------------------------------------------------
        //  INTERACTION
        //-------------------------------------------------------------------------------------------
        // FIRST TOUCHES //
        MainScene.prototype.MouseDown = function (e) {
            var position = new Point(e.clientX, e.clientY + window.pageYOffset);
            this._PointerDown(position);
        };
        MainScene.prototype.MouseUp = function (e) {
            var position = new Point(e.clientX, e.clientY + window.pageYOffset);
            this._PointerUp(position);
            this._CheckHover(position);
        };
        MainScene.prototype.MouseMove = function (e) {
            var position = new Point(e.clientX, e.clientY + window.pageYOffset);
            this._PointerMove(position);
        };
        MainScene.prototype.MouseWheel = function (e) {
            this._MouseWheel(e);
        };
        MainScene.prototype.TouchStart = function (e) {
            var touch = e.touches[0]; // e.args.Device.GetTouchPoint(null);
            var point = new Point(touch.clientX, touch.clientY + window.pageYOffset);
            this._PointerDown(point);
        };
        MainScene.prototype.TouchEnd = function (e) {
            var touch = e.changedTouches[0]; // e.args.Device.GetTouchPoint(null);
            var point = new Point(touch.clientX, touch.clientY + window.pageYOffset);
            this._PointerUp(point, true);
        };
        MainScene.prototype.TouchMove = function (e) {
            var touch = e.touches[0]; // e.args.Device.GetTouchPoint(null);
            var point = new Point(touch.clientX, touch.clientY + window.pageYOffset);
            this._PointerMove(point);
        };
        // AGNOSTIC EVENTS //
        MainScene.prototype._PointerDown = function (point) {
            App.Metrics.ConvertToPixelRatioPoint(point);
            if (!App.Stage.Splash.IsAnimationFinished) {
                return;
            }
            this._IsPointerDown = true;
            this._PointerPoint = point;
            var UIInteraction;
            var collision;
            var tooltip = this._ToolTip;
            var zoom = this.ZoomButtons;
            var header = this.Header;
            var soundcloud = this.SoundcloudPanel;
            var share = this.SharePanel;
            var settings = this.SettingsPanel;
            var recorder = this._RecorderPanel;
            var options = this.OptionsPanel;
            var message = this.MessagePanel;
            var create = this.CreateNew;
            var tutorial = this.Tutorial;
            // UI //
            //UIInteraction = this._UIInteraction();
            if (tooltip.Open) {
                this.ToolTipClose();
            }
            if (message.Open && message.Hover) {
                message.MouseDown(point);
                return;
            }
            if (share.Open) {
                share.MouseDown(point);
                return;
            }
            if (settings.Open) {
                settings.MouseDown(point);
                return;
            }
            if (soundcloud.Open) {
                soundcloud.MouseDown(point);
                return;
            }
            if (!share.Open && !settings.Open && !soundcloud.Open) {
                if (tutorial.SplashOpen) {
                    tutorial.SplashMouseDown(point);
                    if (tutorial.Hover) {
                        return;
                    }
                }
                create.MouseDown(point);
                if (create.Hover) {
                    return;
                }
                header.MouseDown(point);
                if (header.MenuOver) {
                    return;
                }
                zoom.MouseDown(point);
                if (zoom.InRoll || zoom.OutRoll) {
                    return;
                }
                if (options.Scale === 1) {
                    options.MouseDown(point.x, point.y); // to do : unsplit point
                    if (options.Hover) {
                        return;
                    }
                }
                if (tutorial.Open) {
                    tutorial.MouseDown(point);
                    if (tutorial.Hover) {
                        return;
                    }
                }
                recorder.MouseDown(point);
                if (recorder.Hover) {
                    return;
                }
            }
            // BLOCK CLICK //
            //if (!UIInteraction) {
            collision = this._CheckCollision(point);
            //}
            if (collision) {
                this.IsDraggingABlock = true; // for trashcan to know
                this._SelectedBlockPosition = this.SelectedBlock.Position; // memory of start position
            }
            // MainScene DRAGGING //
            if (!collision) {
                //if (!collision && !UIInteraction){
                this.MainSceneDragger.MouseDown(point);
            }
            //this.ConnectionLines.UpdateList();
        };
        MainScene.prototype._PointerUp = function (point, isTouch) {
            App.Metrics.ConvertToPixelRatioPoint(point);
            this._IsPointerDown = false;
            if (this.IsDraggingABlock) {
                var blockDelete = this._TrashCan.MouseUp();
            }
            this.IsDraggingABlock = false;
            if (!blockDelete) {
                // BLOCK //
                if (this.SelectedBlock) {
                    if (this.SelectedBlock.IsPressed) {
                        this.SelectedBlock.MouseUp();
                        // if the block has moved, create an undoable operation.
                        if (!Point.isEqual(this.SelectedBlock.Position, this.SelectedBlock.LastPosition)) {
                            App.CommandManager.ExecuteCommand(Commands_1.Commands.MOVE_BLOCK, this.SelectedBlock);
                        }
                    }
                }
                // OPEN PANEL //
                if (OptionTimeout) {
                    this.OptionsPanel.Open(this.SelectedBlock);
                }
            }
            // UI //
            if (this.SharePanel.Open) {
                this.SharePanel.MouseUp(point, isTouch);
            }
            else if (this.SettingsPanel.Open) {
                this.SettingsPanel.MouseUp(point);
            }
            else {
                this.Header.MouseUp();
                if (this.OptionsPanel.Scale === 1) {
                    this.OptionsPanel.MouseUp();
                }
                this.MainSceneDragger.MouseUp();
            }
            //this.ConnectionLines.UpdateList();
        };
        MainScene.prototype._PointerMove = function (point) {
            App.Metrics.ConvertToPixelRatioPoint(point);
            App.Canvas.Style.cursor = "default";
            this._CheckHover(point);
            // BLOCK //
            if (this.SelectedBlock) {
                this.SelectedBlock.MouseMove(point);
                this._CheckProximity();
                if (this.IsDraggingABlock && (Math.round(this.SelectedBlock.Position.x) !== Math.round(this._SelectedBlockPosition.x) || Math.round(this.SelectedBlock.Position.y) !== Math.round(this._SelectedBlockPosition.y))) {
                    this._SelectedBlockPosition = this.SelectedBlock.Position; // new grid position
                    this._ABlockHasBeenMoved();
                    if (this.OptionsPanel.Scale === 1) {
                        this.OptionsPanel.Close();
                    }
                }
            }
            // UI //
            if (this.OptionsPanel.Scale === 1) {
                this.OptionsPanel.MouseMove(point.x, point.y);
            }
            if (this.SharePanel.Open) {
                this.SharePanel.MouseMove(point);
            }
            if (this.SettingsPanel.Open) {
                this.SettingsPanel.MouseMove(point);
            }
            if (this.SoundcloudPanel.Open) {
                this.SoundcloudPanel.MouseMove(point);
            }
            if (this.MessagePanel.Open) {
                this.MessagePanel.MouseMove(point);
            }
            this.Header.MouseMove(point);
            this._RecorderPanel.MouseMove(point);
            this.CreateNew.MouseMove(point);
            if (this.Tutorial.Open || this.Tutorial.SplashOpen) {
                this.Tutorial.MouseMove(point);
            }
            this.ZoomButtons.MouseMove(point);
            this._TrashCan.MouseMove(point);
            this.MainSceneDragger.MouseMove(point);
        };
        MainScene.prototype._MouseWheel = function (e) {
            this.ZoomButtons.MouseWheel(e);
        };
        // PROXIMITY CHECK //
        MainScene.prototype._CheckProximity = function () {
            // loop through all Source blocks checking proximity to Effect blocks.
            // if within CatchmentArea, add Effect to Source.Effects and add Source to Effect.Sources
            for (var j = 0; j < App.Sources.length; j++) {
                var source = App.Sources[j];
                for (var i = 0; i < App.Effects.length; i++) {
                    var effect = App.Effects[i];
                    // if a source is close enough to the effect, add the effect
                    // to its internal list.
                    var catchmentArea = App.Metrics.ConvertGridUnitsToAbsolute(new Point(effect.CatchmentArea, effect.CatchmentArea));
                    var distanceFromEffect = source.DistanceFrom(App.Metrics.ConvertGridUnitsToAbsolute(effect.Position));
                    if (distanceFromEffect <= catchmentArea.x) {
                        // if the effect isn't already in the sources connections list
                        if (!source.Connections.Contains(effect)) {
                            if (!(source instanceof PowerSource_1.PowerSource && effect instanceof Controller_1.Controller) && ((source instanceof PowerSource_1.PowerSource && effect instanceof PowerEffect_1.PowerEffect) || !(source instanceof PowerSource_1.PowerSource))) {
                                //Add sources to effect
                                effect.AddSource(source);
                                // Add effect to source
                                source.AddEffect(effect);
                                this._Invalidate();
                                App.Audio.ConnectionManager.Update();
                            }
                        }
                    }
                    else {
                        // if the source already has the effect on its internal list
                        // remove it as it's now too far away.
                        if (source.Connections.Contains(effect)) {
                            // Remove source from effect
                            effect.RemoveSource(source);
                            // Remove effect from source
                            source.RemoveEffect(effect);
                            this._Invalidate();
                            App.Audio.ConnectionManager.Update();
                        }
                    }
                }
            }
        };
        // COLLISION CHECK ON BLOCK //
        MainScene.prototype._CheckCollision = function (point) {
            // LOOP BLOCKS //
            for (var i = App.Blocks.length - 1; i >= 0; i--) {
                var block = App.Blocks[i];
                if (block.HitTest(point)) {
                    block.MouseDown();
                    this.SelectedBlock = block;
                    // TIMER TO CHECK BETWEEN SINGLE CLICK OR DRAG //
                    OptionTimeout = true;
                    setTimeout(function () {
                        OptionTimeout = false;
                    }, App.Config.SingleClickTime);
                    return true;
                }
            }
            // CLOSE OPTIONS IF NO BLOCK CLICKED //
            this.OptionsPanel.Close();
            return false;
        };
        // CHECK FOR HOVERING OVER BLOCK (TOOLTIP) //
        MainScene.prototype._CheckHover = function (point) {
            var panelCheck = false;
            var blockHover = false;
            var panel = this._ToolTip;
            // CHECK BLOCKS FOR HOVER //
            if (this.OptionsPanel.Scale === 1) {
                panelCheck = Dimensions.hitRect(this.OptionsPanel.Position.x, this.OptionsPanel.Position.y - (this.OptionsPanel.Size.height * 0.5), this.OptionsPanel.Size.width, this.OptionsPanel.Size.height, point.x, point.y);
            }
            if (!panelCheck && !this._IsPointerDown) {
                for (var i = App.Blocks.length - 1; i >= 0; i--) {
                    var block = App.Blocks[i];
                    if (block.HitTest(point)) {
                        // GET BLOCK NAME //
                        //if (block.OptionsForm) {
                        panel.Name = block.BlockName;
                        var blockPos = App.Metrics.PointOnGrid(block.Position);
                        panel.Position.x = blockPos.x;
                        panel.Position.y = blockPos.y;
                        blockHover = true;
                        //}
                        break;
                    }
                }
            }
            // OPEN TOOLTIP IF NOT ALREADY OPEN //
            if (blockHover && !panel.Open && !this.OptionsPanel.Opening) {
                panel.Open = true;
                if (panel.Alpha > 0) {
                    panel.AlphaTo(panel, 100, 600);
                }
                else {
                    this._ToolTipTimeout = setTimeout(function () {
                        if (panel.Alpha === 0) {
                            panel.AlphaTo(panel, 100, 600);
                        }
                    }, 550);
                }
            }
            // CLOSE IF NO LONGER HOVERING //
            if (!blockHover && panel.Open) {
                this.ToolTipClose();
            }
        };
        MainScene.prototype.ToolTipClose = function () {
            var panel = this._ToolTip;
            clearTimeout(this._ToolTipTimeout);
            panel.StopTween();
            panel.AlphaTo(panel, 0, 200);
            panel.Open = false;
        };
        MainScene.prototype._ABlockHasBeenMoved = function () {
            this.LaserBeams.UpdateAllLasers = true;
            this.ConnectionLines.UpdateList();
        };
        // IS ANYTHING ON THE UI LEVEL BEING CLICKED //
        MainScene.prototype._UIInteraction = function () {
            var zoom = this.ZoomButtons;
            var header = this.Header;
            var share = this.SharePanel;
            var settings = this.SettingsPanel;
            var soundcloud = this.SoundcloudPanel;
            var recorder = this._RecorderPanel;
            var options = this.OptionsPanel;
            var message = this.MessagePanel;
            var create = this.CreateNew;
            var tutorial = this.Tutorial;
            if (zoom.InRoll || zoom.OutRoll || header.MenuOver || share.Open || settings.Open || soundcloud.Open || recorder.Hover || (message.Open && message.Hover) || create.Hover || ((tutorial.Open || tutorial.SplashOpen) && tutorial.Hover) || (options.Scale === 1 && options.Hover)) {
                return true;
            }
            return false;
        };
        Object.defineProperty(MainScene.prototype, "SelectedBlock", {
            //-------------------------------------------------------------------------------------------
            //  BLOCKS
            //-------------------------------------------------------------------------------------------
            get: function () {
                return this._SelectedBlock;
            },
            set: function (block) {
                // if setting the selected block to null (or falsey)
                // if there's already a selected block, set its
                // IsSelected to false.
                if (!block && this._SelectedBlock) {
                    this._SelectedBlock.IsSelected = false;
                    this._SelectedBlock = null;
                }
                else {
                    if (this._SelectedBlock) {
                        this._SelectedBlock.IsSelected = false;
                    }
                    if (block) {
                        block.IsSelected = true;
                        this._SelectedBlock = block;
                        this.BlockToFront(block);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        MainScene.prototype.BlockToFront = function (block) {
            this.BlocksContainer.DisplayList.ToFront(block);
        };
        MainScene.prototype._Invalidate = function () {
            this._ValidateBlocks();
            this._CheckProximity();
            this.CreateNew.CheckState();
            this.Tutorial.CheckTask();
        };
        MainScene.prototype._ValidateBlocks = function () {
            for (var i = 0; i < App.Sources.length; i++) {
                var src = App.Sources[i];
                src.ValidateEffects();
            }
            for (var i = 0; i < App.Effects.length; i++) {
                var effect = App.Effects[i];
                effect.ValidateSources();
            }
        };
        MainScene.prototype.DuplicateParams = function (params) {
            var paramsCopy = {};
            for (var key in params) {
                paramsCopy["" + key] = params["" + key];
            }
            return paramsCopy;
        };
        MainScene.prototype.CreateBlockFromType = function (t, params) {
            var block = new t();
            block.Id = App.GetBlockId();
            block.Position = App.Metrics.CursorToGrid(this._PointerPoint);
            if (params)
                block.Params = this.DuplicateParams(params);
            //TODO:
            //if (block instanceof Recorder) {
            //    (<any>block).Duplicate((<any>block).BufferSource.buffer);
            //}
            block.Init(this);
            block.Type = t;
            App.CommandManager.ExecuteCommand(Commands_1.Commands.CREATE_BLOCK, block);
            block.MouseDown();
            this.SelectedBlock = block;
            this.BlockToFront(block);
            this.IsDraggingABlock = true;
            return block;
        };
        // GETS CALLED WHEN LOADING FROM SHARE URL //
        MainScene.prototype.CompositionLoaded = function (e) {
            // add blocks to display list
            this.BlocksContainer.DisplayList.AddRange(App.Blocks);
            // initialise blocks (give them a ctx to draw to)
            for (var i = 0; i < this.BlocksContainer.DisplayList.Count; i++) {
                var block = this.BlocksContainer.DisplayList.GetValueAt(i);
                block.Init(this);
            }
            if (this.MainSceneDragger) {
                this.MainSceneDragger.Destination = new Point(e.SaveFile.DragOffset.x, e.SaveFile.DragOffset.y);
            }
            this.ZoomButtons.UpdateSlot(e.SaveFile.ZoomLevel);
            this.SharePanel.Reset();
            App.Metrics.UpdateGridScale();
            // validate blocks and give us a little time to stabilise / bring in volume etc
            this._Invalidate();
            // Dont start yet if splash paused //
            if (App.Stage.Splash.IOSPause) {
                return;
            }
            this.Begin();
        };
        MainScene.prototype.Begin = function () {
            var _this = this;
            // Fade In Audio //
            setTimeout(function () {
                _this.Play();
                _this.ConnectionLines.UpdateList();
                // App.Audio.Master.volume.linearRampToValue(App.Audio.MasterVolume,5); //This breaks audio volume slider
            }, 2400);
            //TODO: THIS IS SHIT - For some reason fading in the volume using the above method breaks the volume slider
            // Come back to this once useful functions have been abstracted from Tone into a simplified version
            var volume = -30;
            var volumeFade = setInterval(function () {
                if (volume < App.Audio.MasterVolume) {
                    App.Audio.Master.volume.value = volume;
                    volume += 2;
                }
                else {
                    clearInterval(volumeFade);
                }
            }, 70);
        };
        //-------------------------------------------------------------------------------------------
        //  OPERATIONS
        //-------------------------------------------------------------------------------------------
        MainScene.prototype.DeleteSelectedBlock = function () {
            var _this = this;
            if (!this.SelectedBlock)
                return;
            if (this.SelectedBlock.IsPressed) {
                this.SelectedBlock.MouseUp();
            }
            this.OptionsPanel.Close();
            App.CommandManager.ExecuteCommand(Commands_1.Commands.DELETE_BLOCK, this.SelectedBlock);
            //this.DeleteBlock(this.SelectedBlock);
            this.SelectedBlock = null;
            // Update drawing of connection lines //
            setTimeout(function () {
                _this.ConnectionLines.UpdateList();
            }, 1);
        };
        MainScene.prototype.DeleteBlock = function (block) {
            this.BlocksContainer.DisplayList.Remove(block);
            App.Blocks.remove(block);
            //this.SelectedBlock.Stop(); //LP commented this out because if you have a keyboard and a source connected and call reset you get errors
            block.Dispose();
            block = null;
        };
        MainScene.prototype.DeleteAllBlocks = function () {
            var blockList = [];
            for (var i = 0; i < App.Blocks.length; i++) {
                blockList.push(App.Blocks[i]);
            }
            for (i = 0; i < blockList.length; i++) {
                this.DeleteBlock(blockList[i]);
            }
        };
        // CLEAR SCENE OF ALL BLOCKS, RESET SESSION //
        MainScene.prototype.ResetScene = function () {
            if (this.Tutorial.Open) {
                this.Tutorial.ClosePanel();
            }
            // delete all blocks //
            this.DeleteAllBlocks();
            this.Tutorial.WatchedBlocks = [];
            this.ConnectionLines.UpdateList();
            this.SelectedBlock = null;
            // reset zoom & drag //
            App.DragOffset.x = 0;
            App.DragOffset.y = 0;
            this.ZoomButtons.CurrentSlot = 2;
            this.MainSceneDragger.Destination = new Point(App.DragOffset.x, App.DragOffset.y);
            App.ZoomLevel = 1;
            App.Particles = [];
            App.Metrics.UpdateGridScale();
            this.OptionsPanel.Close();
            // reset session //
            App.AddressBarManager.StripURL();
            App.CompositionId = null;
            App.SessionId = null;
            this.SharePanel.Reset();
            // invalidate //
            this._Invalidate();
        };
        MainScene.prototype.Resize = function () {
            this.OptionsPanel.Close();
            this.Header.Populate(this.Header.MenuJson);
            this.SettingsPanel.Populate(this.SettingsPanel.MenuJson);
        };
        return MainScene;
    })(DisplayObject);
    exports.MainScene = MainScene;
});
//# sourceMappingURL=MainScene.js.map