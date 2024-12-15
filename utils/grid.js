"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xyCache = exports.xyToDir = exports.W = exports.SW = exports.S = exports.SE = exports.E = exports.NE = exports.N = exports.NW = void 0;
exports.getFromDirection = getFromDirection;
exports.getAt = getAt;
exports.setAt = setAt;
exports.move = move;
exports.findInGrid = findInGrid;
exports.reduceGrid = reduceGrid;
exports.inBounds = inBounds;
exports.sumGrid = sumGrid;
exports.getAllNeighbours = getAllNeighbours;
exports.getNeighbours = getNeighbours;
exports.NW = [-1, -1];
exports.N = [0, -1];
exports.NE = [1, -1];
exports.E = [1, 0];
exports.SE = [1, 1];
exports.S = [0, 1];
exports.SW = [-1, 1];
exports.W = [-1, 0];
var xyDirMap = {
    "-1": { "-1": "NW", "0": "N", "1": "NE" },
    "0": { "-1": "W", "0": "", "1": "E" },
    "1": { "-1": "SW", "0": "S", "1": "SE" },
};
var xyToDir = function (_a) {
    var _b;
    var x = _a[0], y = _a[1];
    return (_b = xyDirMap[y.toString()]) === null || _b === void 0 ? void 0 : _b[x];
};
exports.xyToDir = xyToDir;
function getFromDirection(grid, dir, current, steps) {
    var _a;
    if (current === void 0) { current = [0, 0]; }
    if (steps === void 0) { steps = 1; }
    var newPos = move(grid, current, dir, steps);
    if (!newPos) {
        return undefined;
    }
    var x = newPos[0], y = newPos[1];
    return (_a = grid[y]) === null || _a === void 0 ? void 0 : _a[x];
}
function getAt(grid, xy) {
    var _a;
    if (!xy) {
        return undefined;
    }
    if (!inBounds(grid, xy)) {
        return undefined;
    }
    return (_a = grid[xy[1]]) === null || _a === void 0 ? void 0 : _a[xy[0]];
}
function setAt(grid, pos, val) {
    var x = pos[0], y = pos[1];
    if (inBounds(grid, pos)) {
        grid[y][x] = val;
    }
}
function move(grid, _a, _b, steps) {
    var x = _a[0], y = _a[1];
    var dx = _b[0], dy = _b[1];
    if (steps === void 0) { steps = 1; }
    var newX = x + dx * steps;
    if (newX >= grid[y].length || newX < 0) {
        return undefined;
    }
    var newY = y + dy * steps;
    if (newY >= grid.length || newY < 0) {
        return undefined;
    }
    return [x + dx * steps, y + dy * steps];
}
function findInGrid(grid, s) {
    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid.length; x++) {
            if (grid[y][x] === s) {
                return [x, y];
            }
        }
    }
    return undefined;
}
function reduceGrid(grid, cb, initial) {
    var _a;
    var acc = initial;
    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
            acc = cb(acc, (_a = grid[y]) === null || _a === void 0 ? void 0 : _a[x], [x, y]);
        }
    }
    return acc;
}
function inBounds(grid, _a) {
    var x = _a[0], y = _a[1];
    return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
}
function sumGrid(grid, fn) {
    var total = 0;
    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid.length; x++) {
            total += fn(grid, [x, y]);
        }
    }
    return total;
}
function getAllNeighbours(grid, xy) {
    var neighbours = [exports.NW, exports.N, exports.NE, exports.W, exports.E, exports.SW, exports.S, exports.SE]
        .map(function (dir) { return move(grid, xy, dir); })
        .filter(function (x) { return x !== undefined; });
    return neighbours;
}
function getNeighbours(grid, xy) {
    var neighbours = [exports.N, exports.W, exports.E, exports.S]
        .map(function (dir) { return move(grid, xy, dir); })
        .filter(function (x) { return x !== undefined; });
    return neighbours;
}
var xyCache = /** @class */ (function () {
    function xyCache() {
        this.cache = [];
    }
    xyCache.prototype.add = function (xy, val) {
        var _a;
        var x = xy[0], y = xy[1];
        this.cache[y] = (_a = this.cache[y]) !== null && _a !== void 0 ? _a : [];
        this.cache[y][x] = val;
    };
    xyCache.prototype.get = function (_a) {
        var _b;
        var x = _a[0], y = _a[1];
        return (_b = this.cache[y]) === null || _b === void 0 ? void 0 : _b[x];
    };
    return xyCache;
}());
exports.xyCache = xyCache;
