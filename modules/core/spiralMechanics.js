"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadScrollUniverse = loadScrollUniverse;
exports.loadJSON = loadJSON;
exports.loadMedia = loadMedia;
exports.loadVRScene = loadVRScene;
var universes_json_1 = require("../scrolls/universes.json");
function loadScrollUniverse(payload) {
    // Return the requested universe, or null if not found
    return universes_json_1.default[payload] || null;
}
function loadJSON(payload) {
    // Just returns the provided payload
    return payload;
}
function loadMedia(payload) {
    // Placeholder for media loading logic
    return { status: 'media loaded', payload: payload };
}
function loadVRScene(payload) {
    // Placeholder for VR scene logic
    return { status: 'vr scene loaded', payload: payload };
}
