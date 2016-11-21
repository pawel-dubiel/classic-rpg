import * as config_crafts from "./config/crafts.js";
import * as config_abilities from "./config/abilities.js";


var config = Object.freeze({
    crafts: config_crafts.attr_crafts,
    abilities: config_abilities.attr_abilities
});

export default config;