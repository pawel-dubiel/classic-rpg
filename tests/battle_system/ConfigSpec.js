"use strict";
import config from "../../src/config.js";

it("shouldn't be allowed to extend abilities, crafts during runtime", function() {

    expect(function() {
        config.crafts['new_name'] = 10;
    }).toThrow();

    expect(function() {
        config.abilities['new_name'] = 10;
    }).toThrow();

});