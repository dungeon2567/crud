const dateFormat = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/;

function reviver(key, value) {
    if (typeof value === "string" && dateFormat.test(value)) {
        return new Date(value);
    }

    return value;
}

const jsonParse = JSON.parse;

JSON.parse = function(text){
    return jsonParse(text, reviver);
}