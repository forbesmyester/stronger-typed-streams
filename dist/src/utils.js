"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var NodeStream = require("stream");
var Readable = (function (_super) {
    __extends(Readable, _super);
    function Readable(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    Readable.prototype.push = function (chunk, encoding) {
        return _super.prototype.push.call(this, chunk, encoding);
    };
    Readable.prototype.pipe = function (destination, options) {
        return _super.prototype.pipe.call(this, destination, options);
    };
    return Readable;
}(NodeStream.Readable));
exports.Readable = Readable;
var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    Transform.prototype.push = function (chunk, encoding) {
        return _super.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype.pipe = function (destination, options) {
        return _super.prototype.pipe.call(this, destination, options);
    };
    return Transform;
}(NodeStream.Transform));
exports.Transform = Transform;
var Writable = (function (_super) {
    __extends(Writable, _super);
    function Writable(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return Writable;
}(NodeStream.Writable));
exports.Writable = Writable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQXFDO0FBRXJDO0lBQTRDLDRCQUFtQjtJQUUzRCxrQkFBWSxJQUFTO1FBQVQscUJBQUEsRUFBQSxTQUFTO2VBQ2pCLGtCQUFNLElBQUksQ0FBQztJQUNmLENBQUM7SUFJRCx1QkFBSSxHQUFKLFVBQUssS0FBZSxFQUFFLFFBQWlCO1FBQ25DLE1BQU0sQ0FBQyxpQkFBTSxJQUFJLFlBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFJRCx1QkFBSSxHQUFKLFVBQVEsV0FBa0MsRUFBRSxPQUE0QjtRQUNwRSxNQUFNLENBQUMsaUJBQU0sSUFBSSxZQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFqQkQsQ0FBNEMsVUFBVSxDQUFDLFFBQVEsR0FpQjlEO0FBakJxQiw0QkFBUTtBQW1COUI7SUFBaUQsNkJBQW9CO0lBRWpFLG1CQUFZLElBQVM7UUFBVCxxQkFBQSxFQUFBLFNBQVM7ZUFDakIsa0JBQU0sSUFBSSxDQUFDO0lBQ2YsQ0FBQztJQUVELHdCQUFJLEdBQUosVUFBSyxLQUFlLEVBQUUsUUFBaUI7UUFDbkMsTUFBTSxDQUFDLGlCQUFNLElBQUksWUFBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUlELHdCQUFJLEdBQUosVUFBUSxXQUFrQyxFQUFFLE9BQTRCO1FBQ3BFLE1BQU0sQ0FBQyxpQkFBTSxJQUFJLFlBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFmRCxDQUFpRCxVQUFVLENBQUMsU0FBUyxHQWVwRTtBQWZxQiw4QkFBUztBQWlCL0I7SUFBMkMsNEJBQW1CO0lBRTFELGtCQUFZLElBQVM7UUFBVCxxQkFBQSxFQUFBLFNBQVM7ZUFDakIsa0JBQU0sSUFBSSxDQUFDO0lBQ2YsQ0FBQztJQUdMLGVBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBMkMsVUFBVSxDQUFDLFFBQVEsR0FPN0Q7QUFQcUIsNEJBQVEifQ==