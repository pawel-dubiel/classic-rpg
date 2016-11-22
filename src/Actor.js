import Money from "./Money.js";
import {
    object_id
} from "./GameUtils.js";
import config from "./config.js";

/*
 attributes are from 1-10
 0 - none - cannot perform actions related 
 1 - inadequate
 2 - Average
 3 - Gifted
 4 - Trained
 5 - Well Trained
 6 - Master
 7 - Champion - max for human
 8 - Mythic - and higher for special beasts like dragons
 9 - 
 10 -



 Agility:                Acrobatics, Balance, Contortions, Dodge, Quickness
 Animal Handling:        Charm, Drive, Ride, Train
 Athletics:              Climb, Jump, Run, Strength, Swim, Throw
 Awareness:              Empathy, Notice
 Cunning:                Decipher, Logic, Memory
 Deception:              Act, Bluff, Cheat, Disguise
 Endurance:              Resilience, Stamina
 Fighting:               Axes, Bludgeons, Brawling, Fencing, Long Blades, Pole-Arms, Shields, Short Blades, Spears 
 Healing:                Diagnose, Treat Ailment, Treat Injury
 Knowledge:              Education, Research, Streetwise
 Language:
 Marksmanship:           Bows, Crossbows, Siege, Thrown
 Persuasion:             Bargain, Charm, Convince, Incite, Intimidate, Seduce, Taunt
 Status:                 Breeding, Reputation, Stewardship, Tournaments
 Stealth:                Blend In, Sneak
 Survival:               Forage, Hunt, Orientation, Track
 Thievery:               Pick Lock, Sleight of Hand, Steal
 Warfare:                Command, Strategy, Tactics
 Will:                   Courage, Coordinate, Dedication
 */






class BodyPart {
    constructor() {
        this.slot = '';
    }
}

class Head extends BodyPart {

    constructor() {
        super();
    }
}

class Leg extends BodyPart {

    constructor() {
        super();
    }
}
class Corpus extends BodyPart {

    constructor() {
        super();
    }
}

class Hand extends BodyPart {
    constructor() {
        super();
    }
}

let Actor = (function() {

    //todo it will me more flexible to pass single argument
    function Actor(spec) {
        "use strict";

        let {
            abilities,
            crafts,
            m_amount,
            side
        } = spec;

        if (arguments.length !== 1) {
            throw `Actor constructor expects 1 argument, passed ${arguments.length} arguments`;
        }

        if (m_amount === undefined) {
            throw "missing money amount in actor";
        }

        if (abilities === undefined && abilities === null && typeof abilities !== 'object') {
            throw "missing abilities object";
        }

        if (crafts === undefined && crafts === null && typeof crafts !== 'object') {
            throw "missing crafts object";
        }

        if (side === undefined && side === null) {
            throw "missing side";
        }


        this.attr = {};
        this.craft = {};

        //@todo that should be configurable, different monsters may have for example more hands, or more heads.
        this.body = [];

        this.body.push(new Head());
        this.body.push(new Corpus("main"));
        this.body.push(new Leg("right leg"));
        this.body.push(new Leg("left leg"));
        this.body.push(new Hand('right hand'));
        this.body.push(new Hand('left hand'));


        this.money = new Money(m_amount, 'COIN');

        this.object_id = object_id();

        /* create only allowed abilities in the object */
        Object.keys(abilities).forEach(function(value) {
            if (config.abilities.indexOf(value) !== -1) {
                Object.defineProperty(this.attr, value, {
                    value: abilities[value],
                    writable: true,
                    enumerable: true,
                    configurable: false
                });
            } else {
                throw new Error(`trying to set not allowed property ${value}`);
            }
        }, this);


        /* create only allowed crafts in the object */
        Object.keys(crafts).forEach(function(value) {
            if (config.crafts.indexOf(value) !== -1) {
                Object.defineProperty(this.craft, value, {
                    value: crafts[value],
                    writable: true,
                    enumerable: true,
                    configurable: false
                });
            } else {
                throw new Error(`trying to set not allowed property ${value}`);
            }
        }, this);

        //specify the rest of default abilities with value 0
        config.abilities.forEach(function(value) {
            if (!(value in abilities)) {
                Object.defineProperty(this.attr, value, {
                    value: 0,
                    writable: true,
                    enumerable: true,
                    configurable: false
                });
            }
        }, this);

        //specify the rest of default crafts with value 0
        config.crafts.forEach(function(value) {
            if (!(value in crafts)) {
                Object.defineProperty(this.craft, value, {
                    value: 0,
                    writable: true,
                    enumerable: true,
                    configurable: false
                });
            }
        }, this);

        this.attr.side = side;

        /**
         * I am using proxy as I want catch getters and setters so we can get/set only specific attributes
         */
        return new Proxy(this, {
            get: function(target, name) {
                if (name == 'object_id') {
                    return target.object_id;
                }

                if (!(name in target.attr) && !(name in target.craft)) {
                    throw new Error('You can only access attributes in Actor class; non existent attribute "' + name + '"');
                }

                if (name !== 'constructor' && (name in target.attr) && (name in target.craft)) {
                    throw new Error('Duplicated attribute  "' + name + '" in attr and craft');
                }

                if (name in target.attr) {
                    return target.attr[name];
                }

                if (name in target.craft) {
                    return target.craft[name];
                }

            },

            set: function(target, name, value) {

                if (config.abilities.indexOf(name) !== -1) {
                    target.attr[name] = value;
                    return true;
                }

                if (config.crafts.indexOf(name) !== -1) {
                    target.craft[name] = value;
                    return true;
                }

                // add more properties here
                throw new Error(`Invalid ability or craft name "${name}"`);

            }
        });
    }



    return Actor;
})();

export default Actor;