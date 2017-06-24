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
    Farm.prototype._read = function (size) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0L3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFxRTtBQUNyRSwyQkFBdUI7QUFFdkI7SUFHSSxlQUFZLEVBQUU7UUFDVixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBRUQsSUFBSyxJQUE0QztBQUFqRCxXQUFLLElBQUk7SUFBRyxpREFBYSxDQUFBO0lBQUUsaUNBQUssQ0FBQTtJQUFFLG1DQUFNLENBQUE7SUFBRSxpQ0FBSyxDQUFBO0FBQUMsQ0FBQyxFQUE1QyxJQUFJLEtBQUosSUFBSSxRQUF3QztBQUFBLENBQUM7QUFFbEQ7SUFJSSxlQUFZLE1BQWU7UUFDdkIsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDL0IsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdkIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdkIsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQUVEO0lBQW1CLHdCQUFlO0lBSTlCLGNBQVksSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUztRQUFyQixZQUNJLGtCQUFNLE1BQU0sQ0FBQyxN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QyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsc0NBQW9DLEtBQUssQ0FBQyxNQUFNLE1BQUcsQ0FBQyxDQUFDO1FBQzdFLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLHFEQUFtRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFHLENBQUMsQ0FBQztRQUN2RyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxxREFBbUQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBRyxDQUFDLENBQUM7UUFDdkcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsc0RBQW9ELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQUcsQ0FBQyxDQUFDO1FBQ3pHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMifQ==