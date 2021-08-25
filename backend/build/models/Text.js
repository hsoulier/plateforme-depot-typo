"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var model = mongoose_1.default.model, Schema = mongoose_1.default.Schema;
var textSchema = new Schema({
    type: String,
    content: String,
});
exports.default = model("text", textSchema);
//# sourceMappingURL=Text.js.map