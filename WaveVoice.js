define(["require", "exports"], function (require, exports) {
    var WaveVoice = (function () {
        function WaveVoice(type, wave, frequency, gain, drift, sequence, slide) {
            this.Frequency = frequency;
            this.Value = 0;
            this.Polarity = 1;
            this.VoiceType = type;
            this.WaveType = wave;
            this.Volume = gain;
            this.Drift = drift;
            this.Sequence = sequence;
            this.Slide = slide;
            this.FDest = frequency;
        }
        return WaveVoice;
    })();
    exports.WaveVoice = WaveVoice;
});
//# sourceMappingURL=WaveVoice.js.map