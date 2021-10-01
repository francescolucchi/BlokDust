var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Blocks/Power/Logic/Logic', './Blocks/Power/ParticleEmitter', './Blocks/Source', './Blocks/Power/Void'], function (require, exports, Logic_1, ParticleEmitter_1, Source_1, Void_1) {
    var DisplayObject = etch.drawing.DisplayObject;
    var ParticleLayer = (function (_super) {
        __extends(ParticleLayer, _super);
        function ParticleLayer() {
            _super.apply(this, arguments);
        }
        ParticleLayer.prototype.Init = function (drawTo) {
            _super.prototype.Init.call(this, drawTo);
        };
        ParticleLayer.prototype.Update = function () {
            if (App.Particles.length) {
                this.UpdateParticles();
            }
        };
        ParticleLayer.prototype.UpdateParticles = function () {
            var currentParticles = [];
            for (var i = 0; i < App.Particles.length; i++) {
                var particle = App.Particles[i];
                particle.Life -= 1;
                if (particle.Life < 1) {
                    particle.Reset();
                    particle.ReturnToPool();
                    continue;
                }
                this.ParticleCollision(App.Metrics.FloatOnGrid(particle.Position), particle);
                particle.Move();
                currentParticles.push(particle);
            }
            App.Particles = currentParticles;
        };
        ParticleLayer.prototype.ParticleCollision = function (point, particle) {
            for (var i = App.Blocks.length - 1; i >= 0; i--) {
                var block = App.Blocks[i];
                // Particle can only collide with Switches and Sources but not Particle Emitters //
                // Skip over Particle Emitters Particle Emitters //
                if (block instanceof ParticleEmitter_1.ParticleEmitter) {
                    continue;
                }
                // Skip if block isn't in the right quadrant //
                var quadCheck = this.QuadPartition(particle.Position, App.Metrics.ConvertGridUnitsToAbsolute(block.Position), particle.Vector);
                //console.log(quadCheck);
                if (!quadCheck) {
                    continue;
                }
                // If we hit a Void block //
                if (block instanceof Void_1.Void) {
                    if (block.HitTest(point)) {
                        particle.Dispose();
                        return;
                    }
                }
                // If we hit a switch or a source //
                if (block instanceof Logic_1.Logic || block instanceof Source_1.Source) {
                    if (block.HitTest(point)) {
                        block.ParticleCollision(particle);
                        return;
                    }
                }
            }
        };
        ParticleLayer.prototype.QuadPartition = function (particle, target, vector) {
            var margin = App.ScaledGridSize * 2;
            if (vector.Y < 0 && target.y > (particle.y + margin)) {
                //console.log(0);
                return false;
            }
            if (vector.Y > 0 && target.y < (particle.y - margin)) {
                //console.log(1);
                return false;
            }
            if (vector.X < 0 && target.x > (particle.x + margin)) {
                //console.log(2);
                return false;
            }
            if (vector.X > 0 && target.x < (particle.x - margin)) {
                //console.log(3);
                return false;
            }
            return true;
        };
        ParticleLayer.prototype.Draw = function () {
            for (var i = 0; i < App.Particles.length; i++) {
                // todo: use etch drawFrom to cache
                var particle = App.Particles[i];
                var pos = App.Metrics.FloatOnGrid(particle.Position);
                var unit = App.ScaledUnit;
                var sx = pos.x;
                var sy = pos.y;
                var size = particle.Size * unit;
                App.FillColor(this.Ctx, App.Palette[App.ThemeManager.Power]);
                this.Ctx.globalAlpha = 1;
                this.Ctx.beginPath();
                this.Ctx.moveTo(sx - (size), sy); //l
                this.Ctx.lineTo(sx, sy - (size)); //t
                this.Ctx.lineTo(sx + (size), sy); //r
                this.Ctx.lineTo(sx, sy + (size)); //b
                this.Ctx.closePath();
                this.Ctx.fill();
            }
        };
        return ParticleLayer;
    })(DisplayObject);
    exports.ParticleLayer = ParticleLayer;
});
//# sourceMappingURL=ParticleLayer.js.map