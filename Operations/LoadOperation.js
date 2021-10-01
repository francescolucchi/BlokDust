define(["require", "exports"], function (require, exports) {
    var LoadOperation = (function () {
        function LoadOperation(id) {
            this._Id = id;
            this._LZMA = new LZMA("/lib/lzma/src/lzma_worker.js");
        }
        LoadOperation.prototype.Decompress = function (data) {
            var _this = this;
            return new Promise(function (resolve) {
                data = JSON.parse("[" + data + "]");
                _this._LZMA.decompress(data, function (result) {
                    resolve(result.toString());
                }, function (percent) {
                    //console.log(percent);
                });
            });
        };
        LoadOperation.prototype.Do = function () {
            var _this = this;
            var that = this;
            return new Promise(function (resolve, reject) {
                var protocol = (App.IsLocalhost()) ? 'http' : 'https';
                var url = protocol + '://files.blokdust.io/compositions/' + _this._Id + '?t=' + Utils.Dates.getTimeStamp();
                $.ajax({
                    url: url,
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'text'
                }).done(function (data) {
                    that.Decompress(data).then(function (decompressed) {
                        resolve(decompressed);
                    });
                }).fail(function (jqXHR, textStatus) {
                    reject(textStatus);
                });
            });
        };
        LoadOperation.prototype.Dispose = function () {
        };
        return LoadOperation;
    })();
    exports.LoadOperation = LoadOperation;
});
//# sourceMappingURL=LoadOperation.js.map