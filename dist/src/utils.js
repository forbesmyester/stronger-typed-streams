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
var Duplex = (function (_super) {
    __extends(Duplex, _super);
    function Duplex(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    Duplex.prototype.push = function (chunk, encoding) {
        return _super.prototype.push.call(this, chunk, encoding);
    };
    Duplex.prototype.pipe = function (destination, options) {
        return _super.prototype.pipe.call(this, destination, options);
    };
    return Duplex;
}(NodeStream.Duplex));
exports.Duplex = Duplex;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQXFDO0FBRXJDO0lBQTRDLDRCQUFtQjtJQUUzRCxrQkFBWSxJQUFTO1FBQVQscUJBQUEsRUFBQSxTQUFTO2VBQ2pCLGtCQUFNLElBQUksQ0FBQztJQUNmLENBQUM7SUFJRCx1QkFBSSxHQUFKLFVBQUssS0FBZSxFQUFFLFFBQWlCO1FBQ25DLE1BQU0sQ0FBQyxpQkFBTSxJQUFJLFlBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFLRCx1QkFBSSxHQUFKLFVBQVEsV0FBa0MsRUFBRSxPQUE0QjtRQUNwRSxNQUFNLENBQUMsaUJBQU0sSUFBSSxZQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFsQkQsQ0FBNEMsVUFBVSxDQUFDLFFBQVEsR0FrQjlEO0FBbEJxQiw0QkFBUTtBQW9COUI7SUFBOEMsMEJBQWlCO0lBRTNELGdCQUFZLElBQVM7UUFBVCxxQkFBQSxFQUFBLFNBQVM7ZUFDakIsa0JBQU0sSUFBSSxDQUFDO0lBQ2YsQ0FBQztJQUVELHFCQUFJLEdBQUosVUFBSyxLQUFlLEVBQUUsUUFBaUI7UUFDbkMsTUFBTSxDQUFDLGlCQUFNLElBQUksWUFBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUtELHFCQUFJLEdBQUosVUFBUSxXQUFrQyxFQUFFLE9BQTRCO1FBQ3BFLE1BQU0sQ0FBQyxpQkFBTSxJQUFJLFlBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FBQyxBQWhCRCxDQUE4QyxVQUFVLENBQUMsTUFBTSxHQWdCOUQ7QUFoQnFCLHdCQUFNO0FBa0I1QjtJQUFpRCw2QkFBb0I7SUFFakUsbUJBQVksSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUztlQUNqQixrQkFBTSxJQUFJLENBQUM7SUFDZixDQUFDO0lBRUQsd0JBQUksR0FBSixVQUFLLEtBQWUsRUFBRSxRQUFpQjtRQUNuQyxNQUFNLENBQUMsaUJBQU0sSUFBSSxZQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBS0Qsd0JBQUksR0FBSixVQUFRLFdBQWtDLEVBQUUsT0FBNEI7UUFDcEUsTUFBTSxDQUFDLGlCQUFNLElBQUksWUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQWhCRCxDQUFpRCxVQUFVLENBQUMsU0FBUyxHQWdCcEU7QUFoQnFCLDhCQUFTO0FBa0IvQjtJQUEyQyw0QkFBbUI7SUFFMUQsa0JBQVksSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUztlQUNqQixrQkFBTSxJQUFJLENBQUM7SUFDZixDQUFDO0lBR0wsZUFBQztBQUFELENBQUMsQUFQRCxDQUEyQyxVQUFVLENBQUMsUUFBUSxHQU83RDtBQVBxQiw0QkFBUSJ9