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
var utils_1 = require("../src/utils");
var ava_1 = require("ava");
var Flour = /** @class */ (function () {
    function Flour(kg) {
        this.kg = kg;
    }
    return Flour;
}());
var Size;
(function (Size) {
    Size[Size["OnlyPackaging"] = 0] = "OnlyPackaging";
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
var Bread = /** @class */ (function () {
    function Bread(flours) {
        switch (flours.length) {
            case 0:
                this.size = Size.OnlyPackaging;
                break;
            case 1:
                this.size = Size.Small;
                break;
            case 2:
                this.size = Size.Medium;
                break;
            case 3:
                this.size = Size.Large;
                break;
        }
    }
    return Bread;
}());
var Farm = /** @class */ (function (_super) {
    __extends(Farm, _super);
    function Farm(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, Object.assign({ objectMode: true }, opts)) || this;
        _this.i = 0;
        return _this;
    }
    Farm.prototype._read = function (size) {
        var _this = this;
        var v = this.i++ < 8 ? new Flour(1) : null;
        process.nextTick(function () {
            _this.push(v);
        });
    };
    return Farm;
}(utils_1.Readable));
var Bakery = /** @class */ (function (_super) {
    __extends(Bakery, _super);
    function Bakery(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, Object.assign({ objectMode: true }, opts)) || this;
        _this.flour = [];
        return _this;
    }
    Bakery.prototype._flush = function (cb) {
        var _this = this;
        process.nextTick(function () {
            if (_this.flour.length) {
                _this.push(new Bread(_this.flour));
            }
            _this.flour = [];
            cb();
        });
    };
    Bakery.prototype._transform = function (flour, encoding, cb) {
        var _this = this;
        process.nextTick(function () {
            _this.flour.push(flour);
            if (_this.flour.length >= 3) {
                _this._flush(cb);
                return;
            }
            cb();
        });
    };
    return Bakery;
}(utils_1.Transform));
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(opts, out) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, Object.assign({ objectMode: true }, opts)) || this;
        _this.out = [];
        _this.out = out;
        return _this;
    }
    Person.prototype._write = function (bread, encoding, cb) {
        var _this = this;
        process.nextTick(function () {
            _this.out.push(bread);
            cb();
        });
    };
    return Person;
}(utils_1.Writable));
var Proxy = /** @class */ (function (_super) {
    __extends(Proxy, _super);
    function Proxy(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, Object.assign({ objectMode: true }, opts)) || this;
        _this.store = [];
        _this.outstanding = 0;
        return _this;
    }
    Proxy.prototype._write = function (bread, encoding, cb) {
        var _this = this;
        process.nextTick(function () {
            _this.store.push(bread);
            while (_this.outstanding && _this.store.length) {
                _this.outstanding--;
                _this.push(_this.store.shift());
            }
            cb();
        });
    };
    Proxy.prototype._final = function (cb) {
        this.push(null);
    };
    Proxy.prototype._read = function (size) {
        var _this = this;
        process.nextTick(function () {
            while (size--) {
                if (_this.store.length) {
                    _this.push(_this.store.shift());
                }
                else {
                    _this.outstanding = size + 1;
                    return;
                }
            }
        });
    };
    return Proxy;
}(utils_1.Duplex));
var Shop = /** @class */ (function (_super) {
    __extends(Shop, _super);
    function Shop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Shop;
}(Proxy));
function getNodeMajorVersion() {
    return parseInt(process.version.slice(1).replace(/\..*/, ''), 10);
}
ava_1.default.cb('Can stream', function (tst) {
    var stock = [];
    var farm = new Farm({});
    var bakery = new Bakery({});
    var shop = new Shop({});
    var person = new Person({}, stock);
    var supplyChain;
    if (getNodeMajorVersion() < 8) { // I used _final in Shop/Proxy<T> which is
        // only available in Node 8+
        supplyChain = farm.pipe(bakery).pipe(person);
    }
    else {
        supplyChain = farm.pipe(bakery).pipe(shop).pipe(person);
    }
    // Uncomment below for type error!
    // let badSupplyChain: Writable<Bread> = farm.pipe(person);
    supplyChain.on('finish', function () {
        tst.is(stock.length, 3, "There should be three loves was (" + stock.length + ")");
        tst.is(stock[0].size, Size.Large, "The first item of bread should have been large (" + stock[0].size + ")");
        tst.is(stock[1].size, Size.Large, "The first item of bread should have been large (" + stock[1].size + ")");
        tst.is(stock[2].size, Size.Medium, "The first item of bread should have been medium (" + stock[2].size + ")");
        tst.end();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0L3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFxRTtBQUNyRSwyQkFBdUI7QUFFdkI7SUFHSSxlQUFZLEVBQUU7UUFDVixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBRUQsSUFBSyxJQUE0QztBQUFqRCxXQUFLLElBQUk7SUFBRyxpREFBYSxDQUFBO0lBQUUsaUNBQUssQ0FBQTtJQUFFLG1DQUFNLENBQUE7SUFBRSxpQ0FBSyxDQUFBO0FBQUMsQ0FBQyxFQUE1QyxJQUFJLEtBQUosSUFBSSxRQUF3QztBQUVqRDtJQUlJLGVBQVksTUFBZTtRQUN2QixRQUFRLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDbkIsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDL0IsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZCLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN4QixNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdkIsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBRUQ7SUFBbUIsd0JBQWU7SUFJOUIsY0FBWSxJQUFTO1FBQVQscUJBQUEsRUFBQSxTQUFTO1FBQXJCLFlBQ0ksa0JBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FB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