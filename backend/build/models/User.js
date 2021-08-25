"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var model = mongoose_1.default.model, Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    socials: Object,
});
exports.default = model("user", userSchema);
//# sourceMappingURL=User.js.map