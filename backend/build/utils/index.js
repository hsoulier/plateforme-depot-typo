"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.hashPassword = exports.delAt = exports.formatBytes = exports.jsonReader = exports.getFilesRecursively = exports.shuffleArray = void 0;
var fs_1 = __importStar(require("fs"));
var path_1 = require("path");
var bcrypt_1 = __importDefault(require("bcrypt"));
var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};
exports.shuffleArray = shuffleArray;
var isDirectory = function (path) { return fs_1.statSync(path).isDirectory(); };
var getDirectories = function (path) {
    return fs_1.readdirSync(path)
        .map(function (name) { return path_1.join(path, name); })
        .filter(isDirectory);
};
var isFile = function (path) { return fs_1.statSync(path).isFile(); };
var getFiles = function (path) {
    return fs_1.readdirSync(path)
        .map(function (name) { return path_1.join(path, name); })
        .filter(isFile);
};
var getFilesRecursively = function (path) {
    var dirs = getDirectories(path);
    var files = dirs
        .map(function (dir) { return exports.getFilesRecursively(dir); })
        .reduce(function (a, b) { return a.concat(b); }, []);
    return files.concat(getFiles(path));
};
exports.getFilesRecursively = getFilesRecursively;
function jsonReader(filePath, cb) {
    fs_1.default.readFile(filePath, function (err, fileData) {
        if (err) {
            return cb && cb(err);
        }
        try {
            var object = JSON.parse(fileData.toString());
            return cb && cb(null, object);
        }
        catch (err) {
            return cb && cb(err);
        }
    });
}
exports.jsonReader = jsonReader;
function formatBytes(bytes, decimals) {
    if (decimals === void 0) { decimals = 2; }
    if (bytes === 0)
        return "0 Bytes";
    var k = 1024;
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
exports.formatBytes = formatBytes;
var delAt = function (str) {
    if (str[0] === "@") {
        return str.substring(1);
    }
    else {
        return str;
    }
};
exports.delAt = delAt;
var hashPassword = function (password, saltRounds) {
    if (saltRounds === void 0) { saltRounds = 10; }
    return __awaiter(void 0, void 0, void 0, function () {
        var salt, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, bcrypt_1.default.genSalt(saltRounds)];
                case 1:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, null];
            }
        });
    });
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=index.js.map