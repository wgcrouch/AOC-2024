"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitToNumber = splitToNumber;
function splitToNumber(delimeter) {
    if (delimeter === void 0) { delimeter = ""; }
    return function (input) {
        return input.split(delimeter).map(function (x) { return parseInt(x); });
    };
}
