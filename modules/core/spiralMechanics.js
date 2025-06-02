"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadScrollUniverse = loadScrollUniverse;
exports.loadJSON = loadJSON;
exports.loadMedia = loadMedia;
exports.loadVRScene = loadVRScene;
// Correct JSON import for NodeNext ESM
var universes_json_1 = require("../scrolls/universes.json");
var universes = universes_json_1.default;
function loadScrollUniverse(payload) {
    return universes[payload] || null;
}
function loadJSON(payload) {
    return payload;
}
function loadMedia(payload) {
    return { status: 'media loaded', payload: payload };
}
function loadVRScene(payload) {
    return { status: 'vr scene loaded', payload: payload };
}
