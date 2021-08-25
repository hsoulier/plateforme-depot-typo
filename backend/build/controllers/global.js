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
exports.checkToken = exports.createToken = exports.home = void 0;
var Word_js_1 = __importDefault(require("../models/Word.js"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var utils_1 = require("../utils/");
var imgs = [];
function home(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var word;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imgs = utils_1.getFilesRecursively("./public/uploads");
                    imgs = imgs
                        .map(function (img) {
                        return img.includes("public") ? img.replace("public", "") : img;
                    })
                        .filter(function (file) {
                        return !file.includes(".DS_Store") &&
                            file
                                .split(".")[file.split(".").length - 1].match(/jp(e)?g|png/g);
                    });
                    utils_1.shuffleArray(imgs);
                    return [4 /*yield*/, Word_js_1.default.findOne({ isCurrent: true })];
                case 1:
                    word = _a.sent();
                    return [2 /*return*/, res.render("home", { text: req.rules, word: word, imgs: imgs })];
            }
        });
    });
}
exports.home = home;
function createToken(_a) {
    var email = _a.email, isAdmin = _a.isAdmin;
    var token = jsonwebtoken_1.default.sign({
        isAdmin: isAdmin,
        email: email,
    }, 
    // @ts-ignore
    process.env.SECRET_JWT, { expiresIn: "1d" });
    return token;
}
exports.createToken = createToken;
var extractBearerToken = function (headerValue) {
    console.log(headerValue);
    if (typeof headerValue !== "string") {
        return false;
    }
    var matches = headerValue.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2];
};
function checkToken(req, res, next) {
    console.log(req.headers);
    var token = req.headers.authorization &&
        extractBearerToken(req.headers.authorization);
    if (!token) {
        return res.status(401).json({ message: "Error no token found in headers " + JSON.stringify(req.headers) });
    }
    // @ts-ignore
    jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT, function (err, decodedToken) {
        if (err) {
            res.status(401).json({ error: "Error. Bad token" });
        }
        else {
            req.token = decodedToken;
            return next();
        }
    });
}
exports.checkToken = checkToken;
//# sourceMappingURL=global.js.map