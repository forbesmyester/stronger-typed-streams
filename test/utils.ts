import { Readable, Writable, Transform } from '../src/utils';
import test from 'ava';

class Flour {
    kg: number;

    constructor(kg) {
        this.kg = kg;
    }
}

enum Size { OnlyPackaging, Small, Medium, Large };

class Bread {

    size: Size;

    constructor(flours: Flour[]) {
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
}

class Farm extends Readable<Flour> {

    private i: number = 0;

    constructor(opts = {}) {
        super(Object.assign({objectMode: true}, opts));
    }

    _read() {
        let v = this.i++ < 8 ? new Flour(1) : null;
        process.nextTick(() => {
            this.push(v);
        });
    }
}

class Bakery extends Transform<Flour, Bread> {

    private flour: Flour[] = [];

    constructor(opts = {}) {
        super(Object.assign({objectMode: true}, opts));
    }

    _flush(cb) {
        process.nextTick(() => {
            if (this.flour.length) {
                this.push(new Bread(this.flour));
            }
            this.flour = [];
            cb();
        });
    }

    _transform(flour: Flour, encoding, cb) {
        process.nextTick(() => {
            this.flour.push(flour);
            if (this.flour.length >= 3) {
                this._flush(cb);
                return;
            }
            cb();
        });
    }

}

class Shop extends Writable<Bread> {

    out: Bread[] = [];

    constructor(opts = {}, out) {
        super(Object.assign({objectMode: true}, opts));
        this.out = out;
    }

    _write(bread: Bread, encoding, cb) {
        process.nextTick(() => {
            this.out.push(bread);
            cb();
        });
    }
}


test('Can stream', function(tst) {

    let stock: Bread[] = [];
    let farm = new Farm({highWaterMark: 1});
    let bakery = new Bakery({highWaterMark: 1});
    let shop = new Shop({highWaterMark: 1}, stock);

    let supplyChain = farm.pipe(bakery).pipe(shop);

    // Uncomment below for type error!
    // let badSupplyChain: Writable<Bread> = farm.pipe(shop);

    return new Promise((resolve) => {
        supplyChain.on('finish', () => {
            tst.is(stock.length, 3, `There should be three loves was (${stock.length})`);
            tst.is(stock[0].size, Size.Large, `The first item of bread should have been large (${stock[0].size})`);
            tst.is(stock[1].size, Size.Large, `The first item of bread should have been large (${stock[1].size})`);
            tst.is(stock[2].size, Size.Medium, `The first item of bread should have been medium (${stock[2].size})`);
            resolve(true);
            tst.pass();
        });
    });

});

