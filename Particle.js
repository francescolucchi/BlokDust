define(["require", "exports"], function (require, exports) {
    var Particle = (function () {
        function Particle(position, vector, size, life) {
            this.Disposed = false;
            this.Position = position;
            this.Vector = vector;
            this.Size = size;
            this.Life = life;
        }
        Particle.prototype.Move = function () {
            this.Position.x += (this.Vector.X * App.Unit);
            this.Position.y += (this.Vector.Y * App.Unit);
        };
        Particle.prototype.Reset = function () {
            this.Position = null;
            this.Vector = null;
            this.Size = null;
            this.Life = null;
            return true;
        };
        Particle.prototype.Dispose = function () {
            this.Life = -1;
            this.Disposed = true;
        };
        Particle.prototype.ReturnToPool = function () {
        };
        return Particle;
    })();
    exports.Particle = Particle;
});
//# sourceMappingURL=Particle.js.map