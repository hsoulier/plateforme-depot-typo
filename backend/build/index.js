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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var fastify_cors_1 = __importDefault(require("fastify-cors"));
var fastify_helmet_1 = __importDefault(require("fastify-helmet"));
var fastify_static_1 = __importDefault(require("fastify-static"));
var path_1 = require("path");
var router_1 = __importDefault(require("./router"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
mongoose_1.default
    .connect(process.env.DB_URI || "", {})
    .then(function () {
    console.log("Connected");
})
    .catch(function (err) {
    console.error("connection error: " + err);
});
var server = fastify_1.default({
    // logger: !!(process.env.NODE_ENV !== "development"),
    logger: false
});
server.register(fastify_cors_1.default, {});
server.register(fastify_helmet_1.default, { contentSecurityPolicy: false });
server.register(fastify_static_1.default, {
    root: path_1.join(__dirname, "public"),
    prefix: "/public/",
});
server.register(router_1.default);
server.listen(process.env.PORT || 3000, function (err, address) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Server listening at " + address);
});
exports.default = server;
//# sourceMappingURL=index.js.map