define(["require", "exports", './Blocks/Effect', './SaveFile', './Blocks/Source', './_Version'], function (require, exports, Effect_1, SaveFile_1, Source_1, _Version_1) {
    var Point = etch.primitives.Point;
    var Serializer = (function () {
        function Serializer() {
        }
        Serializer.Serialize = function () {
            if (this._Debug)
                console.log("START SERIALIZATION");
            var blocks = App.Blocks;
            if (this._Debug) {
                console.log("BLOCKS", blocks);
            }
            this._SerializationDictionary = {};
            // add all block ids to the dictionary.
            for (var i = 0; i < blocks.length; i++) {
                var b = blocks[i];
                this._SerializationDictionary[b.Id] = false;
            }
            if (this._Debug) {
                console.log("DICTIONARY", this._SerializationDictionary);
            }
            var json = {
                ColorThemeNo: App.ThemeManager.CurrentThemeNo,
                Composition: [],
                DragOffset: App.DragOffset,
                Parent: (App.CompositionId) ? App.CompositionId : "",
                Version: _Version_1.Version,
                ZoomLevel: App.ZoomLevel
            };
            this._SerializeBlocks(json.Composition, blocks);
            var result = JSON.stringify(json);
            if (this._Debug) {
                console.log("END SERIALIZATION", result);
            }
            return result;
        };
        Serializer._SerializeBlocks = function (list, blocks, parentBlock) {
            for (var i = 0; i < blocks.length; i++) {
                var b = this._SerializeBlock(blocks[i], parentBlock);
                if (b)
                    list.push(b);
                if (this._Debug) {
                    console.log("DICTIONARY", this._SerializationDictionary);
                    console.log("SERIALIZED LIST", list);
                }
            }
        };
        Serializer._GetBlockSerializationType = function (block) {
            return block.constructor.name;
        };
        Serializer._SerializeBlock = function (block, parentBlock) {
            if (this._Debug) {
                console.log("SERIALIZING", block);
            }
            var d = this._SerializationDictionary[block.Id];
            if (d) {
                if (this._Debug) {
                    console.log("ALREADY SERIALIZED");
                }
                return;
            }
            this._SerializationDictionary[block.Id] = true;
            var b = {};
            b.Id = block.Id;
            b.Type = this._GetBlockSerializationType(block);
            b.Position = block.Position;
            b.ZIndex = block.ZIndex;
            if (block.Params)
                b.Params = block.Params;
            // if it's a source block
            if (block instanceof Source_1.Source && block.Connections.Count) {
                b.Effects = [];
                if (parentBlock) {
                    b.Effects.push(parentBlock.Id);
                }
                this._SerializeBlocks(b.Effects, block.Connections.ToArray(), b);
            }
            // if it's an effect block
            if (block instanceof Effect_1.Effect && block.Connections.Count) {
                b.Sources = [];
                if (parentBlock) {
                    b.Sources.push(parentBlock.Id);
                }
                this._SerializeBlocks(b.Sources, block.Connections.ToArray(), b);
            }
            return b;
        };
        Serializer.Deserialize = function (json) {
            if (this._Debug)
                console.log("START DESERIALIZATION", json);
            this._DeserializationDictionary = {};
            var parsed = JSON.parse(json);
            var saveFile = new SaveFile_1.SaveFile();
            saveFile.ZoomLevel = parsed.ZoomLevel;
            if (parsed.DragOffset) {
                saveFile.DragOffset = new Point(parsed.DragOffset.x, parsed.DragOffset.y);
            }
            else {
                saveFile.DragOffset = new Point(0, 0);
                saveFile.ZoomLevel = 1;
            }
            saveFile.Composition = this._DeserializeBlocks(parsed.Composition);
            if (parsed.ColorThemeNo) {
                saveFile.ColorThemeNo = parsed.ColorThemeNo;
            }
            else {
                saveFile.ColorThemeNo = 0;
            }
            return saveFile;
        };
        Serializer._DeserializeBlocks = function (blocks) {
            var deserializedBlocks = [];
            for (var i = 0; i < blocks.length; i++) {
                var b = blocks[i];
                var block = this._DeserializeBlock(b);
                deserializedBlocks.push(block);
            }
            return deserializedBlocks;
        };
        Serializer._DeserializeBlock = function (b) {
            var block;
            // if it's an id and has already been deserialized, return it.
            if (!(b.Id != null && b.Id.isInteger()) && Serializer._DeserializationDictionary[b]) {
                block = Serializer._DeserializationDictionary[b];
            }
            else {
                block = this._GetBlockDeserializationType(b);
                block.Id = b.Id;
                block.Position = new Point(b.Position.x, b.Position.y);
                block.LastPosition = new Point(b.Position.x, b.Position.y);
                block.Params = b.Params;
                block.ZIndex = b.ZIndex;
                Serializer._DeserializationDictionary[b.Id] = block;
            }
            // if it's a source block
            if (b.Effects) {
                var effects = Serializer._DeserializeBlocks(b.Effects);
                block.Connections.AddRange(effects);
            }
            // if it's an effect block
            if (b.Sources) {
                var sources = Serializer._DeserializeBlocks(b.Sources);
                block.Connections.AddRange(sources);
            }
            return block;
        };
        Serializer._GetBlockDeserializationType = function (b) {
            return App.BlockCreator.GetBlock(b.Type);
        };
        Serializer._Debug = false;
        return Serializer;
    })();
    exports.Serializer = Serializer;
});
//# sourceMappingURL=Serializer.js.map