/**
 * DicesGenerator
 * Motivation:
 * 1) We need RNG that would work the same way on every js engine
 * 2) We should be able initiate it with SEED
 *  
 * @TODO: It could be better for game to implement shuffle bags 
 *
 */
let DicesGenerator = (function() {

    var instance, random_generator;
    var rng_alg = Alea;

    return Object.freeze({
        getInstance: function() {
            var args = Array.prototype.slice.call(arguments);
            random_generator = rng_alg.bind(rng_alg, args);
            random_generator = new random_generator();
            return instance || (instance = createInstance());
        }
    });

    function createInstance() {
        return Object.freeze({


            getD4roll: function(number_of_dices) {
                return _getDicesRoll(number_of_dices, 4);
            },

            getD6roll: function(number_of_dices) {
                return _getDicesRoll(number_of_dices, 6);
            },

            getD8roll: function(number_of_dices) {
                return _getDicesRoll(number_of_dices, 8);
            },

            getD9roll: function(number_of_dices) {
                return _getDicesRoll(number_of_dices, 9);
            },

            getD12roll: function(number_of_dices) {
                return _getDicesRoll(number_of_dices, 12);
            },

            getD20roll: function(number_of_dices) {
                return _getDicesRoll(number_of_dices, 20);
            },

            reset: function() {
                var args = Array.prototype.slice.call(arguments);
                random_generator = rng_alg.bind(rng_alg, args);
                random_generator = new random_generator();
            }
        });
    }

    function _getDicesRoll(number_of_dices, max) {
        if (undefined === max) {
            throw ('DicesGenerator getDicesRoll expect max param');
        }
        var values = [];
        for (var j = 1; j <= number_of_dices; j++) {
            values.push(Math.floor(random_generator() * (max - 1 + 1) + 1));
        }
        return values;
    }

    // From http://baagoe.com/en/RandomMusings/javascript/
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    function Mash() {
        var n = 0xefc8249d;

        var mash = function(data) {
            data = data.toString();
            for (var i = 0; i < data.length; i++) {
                n += data.charCodeAt(i);
                var h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
            }
            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
        };

        mash.version = 'Mash 0.9';
        return mash;
    }

    // From http://baagoe.com/en/RandomMusings/javascript/
    function Alea() {
        return (function(args) {
            // Johannes Baagøe <baagoe@baagoe.com>, 2010
            var s0 = 0;
            var s1 = 0;
            var s2 = 0;
            var c = 1;

            if (args.length === 0) {
                args = [+new Date()];
            }
            var mash = Mash();
            s0 = mash(' ');
            s1 = mash(' ');
            s2 = mash(' ');

            for (var i = 0; i < args.length; i++) {
                s0 -= mash(args[i]);
                if (s0 < 0) {
                    s0 += 1;
                }
                s1 -= mash(args[i]);
                if (s1 < 0) {
                    s1 += 1;
                }
                s2 -= mash(args[i]);
                if (s2 < 0) {
                    s2 += 1;
                }
            }
            mash = null;

            var random = function() {
                var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
                s0 = s1;
                s1 = s2;
                return s2 = t - (c = t | 0);
            };
            random.uint32 = function() {
                return random() * 0x100000000; // 2^32
            };
            random.fract53 = function() {
                return random() +
                    (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
            };
            random.version = 'Alea 0.9';
            random.args = args;
            return random;

        }(Array.prototype.slice.call(arguments)));
    }


})();

export {
    DicesGenerator
};