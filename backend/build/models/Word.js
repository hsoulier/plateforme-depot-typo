"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var model = mongoose_1.default.model, Schema = mongoose_1.default.Schema;
var wordSchema = new Schema({
    word: String,
    start: { type: Date, default: Date.now },
    end: Date,
    isCurrent: Boolean,
});
exports.default = model("word", wordSchema);
//# sourceMappingURL=Word.js.map