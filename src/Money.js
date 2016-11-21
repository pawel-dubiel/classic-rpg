"use strict";
export default class Money {
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;

        //the money object is inmutable
        Object.freeze(this);
    }
}


var assertSameCurrency = function(left, right) {
    if (left.currency !== right.currency)
        throw new Error('Different currencies');
};

var assertType = function(other) {
    if (!(other instanceof Money))
        throw new TypeError('Instance of Money required');
};

var currencies = {
    "COIN": {
        "symbol": "C",
        "name": "Coin",
        "symbol_native": "C",
        "decimal_digits": 1,
        "rounding": 0,
        "code": "COIN",
        "name_plural": "Coins"
    },
    "Blank": {
        "symbol": "B",
        "name": "Blank",
        "symbol_native": "B",
        "decimal_digits": 1,
        "rounding": 0,
        "code": "BLANK",
        "name_plural": "Blank"
    }
};

// Object.keys(currencies).forEach(function (currency) {
//    module.exports[currency] = currencies[currency]; 
// });

Money.prototype.equals = function(other) {
    let self = this;

    if (!(other instanceof Money)) {
        throw new TypeError('Instance of Money required');
    }

    return self.amount === other.amount && self.currency === other.currency;
};

Money.prototype.add = function(other) {
    let self = this;
    assertType(other);
    assertSameCurrency(self, other);

    return new Money(self.amount + other.amount, self.currency);
};

Money.prototype.subtract = function(other) {
    let self = this;
    assertType(other);
    assertSameCurrency(self, other);

    return new Money(self.amount - other.amount, self.currency);
};

Money.prototype.toString = function() {
    let currency = currencies[this.currency];
    return (this.amount / Math.pow(10, currency.decimal_digits)).toFixed(currency.decimal_digits);
};