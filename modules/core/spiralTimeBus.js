"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bus = void 0;
exports.emitDoorway = emitDoorway;
var mitt_1 = require("mitt");
exports.bus = (0, mitt_1.default)();
/** Emit doorway (every **n** petals) and wobble (every 3rd) */
function emitDoorway(petal, loops) {
    var ts = Date.now();
    exports.bus.emit('doorway', { type: 'doorway', petal: petal, loops: loops, ts: ts });
    if ((petal + 1) % 3 === 0)
        exports.bus.emit('wobble', { type: 'wobble', ticks: petal, ts: ts });
}
