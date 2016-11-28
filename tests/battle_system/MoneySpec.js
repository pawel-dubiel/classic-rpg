"use strict";

import Money from "../../src/Money.js";

describe("Money", function() {

    it("should be able to add Money and return new Money Instance", function() {

        var m = new Money(100, 'COIN');
        var b = new Money(200, 'COIN');
        var c = m.add(b);

        expect(c).toEqual(jasmine.any(Money));
        expect(c.amount).toEqual(300);
    });

    it("should be able to subtract Money and return new Money Instance", function() {
        var m = new Money(200, 'COIN');
        var b = new Money(30, 'COIN');
        var c = m.subtract(b);

        expect(c).toEqual(jasmine.any(Money));
        expect(c.amount).toEqual(170);
    });

    it("should throw exception when operating on different currencies", function() {
        var m = new Money(200, 'COIN');
        var b = new Money(30, 'BLANK');

        expect(function() {
            var c = m.add(b);
        }).toThrowError("Different currencies");

        expect(function() {
            var c = m.subtract(b);
        }).toThrowError("Different currencies");

    });

    it("object should be inmutable", function() {

        var m = new Money(200, 'COIN');

        expect(function() {
            m.amount = 100;
        }).toThrowError();

        expect(function() {
            m.newvar = 100;
        }).toThrowError();

    });

});