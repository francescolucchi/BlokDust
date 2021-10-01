define(["require", "exports"], function (require, exports) {
    var SaveOperation = (function () {
        function SaveOperation(json, compositionId, sessionId) {
            this._JSON = new PostData((compositionId) ? compositionId : "", json, (sessionId) ? sessionId : "");
            this._LZMA = new LZMA("/lib/lzma/src/lzma_worker.js");
        }
        SaveOperation.prototype.Compress = function (data) {
            var _this = this;
            return new Promise(function (resolve) {
                var compressionLevel = 5;
                _this._LZMA.compress(data, compressionLevel, function (result) {
                    resolve(result.toString());
                }, function (percent) {
                    //console.log(percent);
                });
            });
        };
        SaveOperation.prototype.Do = function () {
            var that = this;
            return new Promise(function (resolve, reject) {
                that.Compress(that._JSON.Data).then(function (compressed) {
                    that._JSON.Data = compressed;
                    var data = JSON.stringify(that._JSON);
                    //todo: add check for dev.blokdust.com and use dev server
                    var url = (App.IsLocalhost()) ? 'https://blokdust.com/api/save' : 'https://blokdust.com/api/save';
                    $.ajax({
                        url: url,
                        type: 'POST',
                        crossDomain: true,
                        dataType: 'json',
                        contentType: 'application/json',
                        data: data
                    }).done(function (saved) {
                        resolve(saved);
                    }).fail(function (jqXHR, textStatus) {
                        reject(textStatus);
                    });
                });
            });
        };
        SaveOperation.prototype.Dispose = function () {
        };
        return SaveOperation;
    })();
    exports.SaveOperation = SaveOperation;
    var PostData = (function () {
        function PostData(Id, Data, SessionId) {
            this.Id = Id;
            this.Data = Data;
            this.SessionId = SessionId;
        }
        return PostData;
    })();
    exports.PostData = PostData;
});
//# sourceMappingURL=SaveOperation.js.map