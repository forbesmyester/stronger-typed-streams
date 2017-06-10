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
var utils_1 = require("../src/utils");
var ava_1 = require("ava");
var Flour = (function () {
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
;
var Bread = (function () {
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
var Farm = (function (_super) {
    __extends(Farm, _super);
    function Farm(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, Object.assign({ objectMode: true }, opts)) || this;
        _this.i = 0;
        return _this;
    }
    Farm.prototype._read = function () {
        var _this = this;
        var v = this.i++ < 8 ? new Flour(1) : null;
        process.nextTick(function () {
            _this.push(v);
        });
    };
    return Farm;
}(utils_1.Readable));
var Bakery = (function (_super) {
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
var Person = (function (_super) {
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
var Proxy = (function (_super) {
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
var Shop = (function (_super) {
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
    if (getNodeMajorVersion() < 8) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0L3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFxRTtBQUNyRSwyQkFBdUI7QUFFdkI7SUFHSSxlQUFZLEVBQUU7UUFDVixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBRUQsSUFBSyxJQUE0QztBQUFqRCxXQUFLLElBQUk7SUFBRyxpREFBYSxDQUFBO0lBQUUsaUNBQUssQ0FBQTtJQUFFLG1DQUFNLENBQUE7SUFBRSxpQ0FBSyxDQUFBO0FBQUMsQ0FBQyxFQUE1QyxJQUFJLEtBQUosSUFBSSxRQUF3QztBQUFBLENBQUM7QUFFbEQ7SUFJSSxlQUFZLE1BQWU7UUFDdkIsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDL0IsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdkIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdkIsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQUVEO0lBQW1CLHdCQUFlO0lBSTlCLGNBQVksSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUztRQUFyQixZQUNJLGtCQUFNLE1BQU0sQ0FBQyxN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QyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxzQ0FBb0MsS0FBSyxDQUFDLE1BQU0sTUFBRyxDQUFDLENBQUM7UUFDN0UsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUscURBQW1ELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQUcsQ0FBQyxDQUFDO1FBQ3ZHLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLHFEQUFtRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFHLENBQUMsQ0FBQztRQUN2RyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxzREFBb0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBRyxDQUFDLENBQUM7UUFDekcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDLENBQUMsQ0FBQyJ9