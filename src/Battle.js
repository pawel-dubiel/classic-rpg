"use strict";

let Battle = (function() {




    function Battle(spec) {


        let {
            party
        } = spec;

        return Object.freeze({});
    }


    Battle.round = 0;

    // Prototype declarations
    Battle.prototype.someFunction = function() {};
    Battle.prototype.someValue = 1;

    return Battle;
})();

export default Battle;