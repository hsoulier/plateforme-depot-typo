"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var model = mongoose_1.default.model, Schema = mongoose_1.default.Schema, Types = mongoose_1.default.Types;
var optString = {
    type: String,
    required: false
};
var repoSchema = new Schema({
    userId: Types.ObjectId,
    wordId: Types.ObjectId,
    name: String,
    email: String,
    description: optString,
    date: { type: Date, default: Date.now },
    socialNetwork: {
        type: Object,
        required: false
    },
    files: Array
});
exports.default = model("repo", repoSchema);
//# sourceMappingURL=Repo.js.map