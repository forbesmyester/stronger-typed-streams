"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writable = exports.Transform = exports.Duplex = exports.Readable = void 0;
var NodeStream = require("stream");
var Readable = /** @class */ (function (_super) {
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
var Duplex = /** @class */ (function (_super) {
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
var Transform = /** @class */ (function (_super) {
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
var Writable = /** @class */ (function (_super) {
    __extends(Writable, _super);
    function Writable(opts) {
        if (opts === void 0) { opts = {}; }
        return _super.call(this, opts) || this;
    }
    return Writable;
}(NodeStream.Writable));
exports.Writable = Writable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFxQztBQUVyQztJQUE0Qyw0QkFBbUI7SUFFM0Qsa0JBQVksSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUztlQUNqQixrQkFBTSxJQUFJLENBQUM7SUFDZixDQUFDO0lBSUQsdUJBQUksR0FBSixVQUFLLEtBQWUsRUFBRSxRQUF5QjtRQUMzQyxPQUFPLGlCQUFNLElBQUksWUFBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUtELHVCQUFJLEdBQUosVUFBUSxXQUFrQyxFQUFFLE9BQTRCO1FBQ3BFLE9BQU8saUJBQU0sSUFBSSxZQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFsQkQsQ0FBNEMsVUFBVSxDQUFDLFFBQVEsR0FrQjlEO0FBbEJxQiw0QkFBUTtBQW9COUI7SUFBOEMsMEJBQWlCO0lBRTNELGdCQUFZLElBQVM7UUFBVCxxQkFBQSxFQUFBLFNBQVM7ZUFDakIsa0JBQU0sSUFBSSxDQUFDO0lBQ2YsQ0FBQztJQUVELHFCQUFJLEdBQUosVUFBSyxLQUFlLEVBQUUsUUFBeUI7UUFDM0MsT0FBTyxpQkFBTSxJQUFJLFlBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFLRCxxQkFBSSxHQUFKLFVBQVEsV0FBa0MsRUFBRSxPQUE0QjtRQUNwRSxPQUFPLGlCQUFNLElBQUksWUFBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBaEJELENBQThDLFVBQVUsQ0FBQyxNQUFNLEdBZ0I5RDtBQWhCcUIsd0JBQU07QUFrQjVCO0lBQXdDLDZCQUFvQjtJQUV4RCxtQkFBWSxJQUFTO1FBQVQscUJBQUEsRUFBQSxTQUFTO2VBQ2pCLGtCQUFNLElBQUksQ0FBQztJQUNmLENBQUM7SUFFRCx3QkFBSSxHQUFKLFVBQUssS0FBZSxFQUFFLFFBQXlCO1FBQzNDLE9BQU8saUJBQU0sSUFBSSxZQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBS0Qsd0JBQUksR0FBSixVQUFRLFdBQWtDLEVBQUUsT0FBNEI7UUFDcEUsT0FBTyxpQkFBTSxJQUFJLFlBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFoQkQsQ0FBd0MsVUFBVSxDQUFDLFNBQVMsR0FnQjNEO0FBaEJZLDhCQUFTO0FBa0J0QjtJQUEyQyw0QkFBbUI7SUFFMUQsa0JBQVksSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUztlQUNqQixrQkFBTSxJQUFJLENBQUM7SUFDZixDQUFDO0lBR0wsZUFBQztBQUFELENBQUMsQUFQRCxDQUEyQyxVQUFVLENBQUMsUUFBUSxHQU83RDtBQVBxQiw0QkFBUSJ9