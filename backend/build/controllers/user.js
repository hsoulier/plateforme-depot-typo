"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addingUser = exports.loginUser = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var User_js_1 = __importDefault(require("../models/User.js"));
var global_js_1 = require("./global.js");
var loginUser = function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, userDb, result, token, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.body.email;
                password = req.body.password;
                console.log({ email: email, password: password });
                return [4 /*yield*/, User_js_1.default.findOne({ email: email })];
            case 1:
                userDb = _a.sent();
                if (!userDb)
                    return [2 /*return*/, reply.send("Error, wrong email")];
                console.log({ db: userDb });
                result = bcrypt_1.default.compareSync(password, userDb.password);
                console.log({ result: result });
                token = global_js_1.createToken(userDb);
                return [2 /*return*/, reply.send({ token: token })];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [2 /*return*/, reply.send({ message: "Error, no user found" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
// export const getInfosUser = async (req, res) => {
// 	const user = await User.findById(req.token.id, "-password")
// 	console.log(user)
// 	return res.json(user)
// }
// export async function updatePassword(req, res) {
// 	const method = req.method.toLowerCase()
// 	if (method === "get") return res.render("update")
// 	const { password, user } = req.body
// 	bcrypt.hash(password, 10, async (err, hash) => {
// 		if (err) return res.json({ message: `Error, password not updated, ${e}` })
// 		const newUser = await User.updateOne({ user }, { password: hash })
// 	})
// 	req.session.loggedIn = undefined
// 	return res.render("login")
// }
var addingUser = function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password;
    return __generator(this, function (_b) {
        _a = req.body, email = _a.email, password = _a.password;
        bcrypt_1.default.hash(password, 10, function (err, hash) { return __awaiter(void 0, void 0, void 0, function () {
            var login, newUser, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        login = new User_js_1.default({ email: email, password: hash });
                        return [4 /*yield*/, login.save()];
                    case 1:
                        newUser = _a.sent();
                        console.log(newUser);
                        reply.send({ message: "Success, user created" });
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        reply.send({ message: "Error, user not created, " + e_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.addingUser = addingUser;
//# sourceMappingURL=user.js.map