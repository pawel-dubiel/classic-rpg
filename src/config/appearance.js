let gender = Object.freeze({
    "male": 1,
    "female": 2
});

let attr_appearance = Object.freeze({
    "name": {
        'type': 'string',
        'max_length': 100
    },
    "age": {
        'integer_range': '0-1000'
    },
    "gender": {
        "type": "enum",
        "values": gender
    },
    "height": {
        'integer_range': '0-1000'
    },
    "eyecolor": {
        'type': 'string'
    },
    "haircolor": {
        'type': 'string'
    },
});


export {
    attr_appearance
};