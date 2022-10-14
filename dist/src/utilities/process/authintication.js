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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var dotenv_1 = __importDefault(require("dotenv"));
var dataBase_1 = require("../../dataBase");
dotenv_1.default.config();
var Authintication = /** @class */ (function () {
    function Authintication() {
        this.getPrivateKey = this.getPrivateKey.bind(this);
        this.logIn = this.logIn.bind(this);
        this.createMyToken = this.createMyToken.bind(this);
        this.authinticate = this.authinticate.bind(this);
    }
    Authintication.prototype.getPrivateKey = function () {
        var PRIVATE_KEY = process.env.PRIVATE_KEY;
        return PRIVATE_KEY;
    };
    Authintication.prototype.createMyToken = function (decodedToken) {
        var token = jsonwebtoken_1.default.sign(decodedToken, this.getPrivateKey());
        if (!token)
            throw new Error('internal server error');
        return token;
    };
    Authintication.prototype.logIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user_email, password, query, conn, user, user_password, passwordIsCorrect, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, user_email = _a.user_email, password = _a.password;
                        query = "SELECT user_id,user_password from users WHERE user_email='".concat(user_email, "'");
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 1:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        user = _b.sent();
                        conn.release();
                        if (!user.rows.length) {
                            return [2 /*return*/, res.status(404).send('Email or password is uncorrect')];
                        }
                        user_password = user.rows[0].user_password;
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user_password)];
                    case 3:
                        passwordIsCorrect = _b.sent();
                        if (!passwordIsCorrect) {
                            return [2 /*return*/, res.status(404).send('Email or password is uncorrect')];
                        }
                        token = this.createMyToken({
                            _id: user.rows[0].user_id,
                            email: user_email,
                        });
                        return [2 /*return*/, res.send({ token: token })];
                }
            });
        });
    };
    Authintication.prototype.authinticate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var authorizationHeader, token, privateKey;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    authorizationHeader = req.headers['authorization'];
                    token = authorizationHeader && authorizationHeader.split('=')[1];
                    if (!token) {
                        res.status(401);
                        return [2 /*return*/];
                    }
                    privateKey = this.getPrivateKey();
                    return [2 /*return*/, jsonwebtoken_1.default.verify(token, privateKey, function (error, decodedToken) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (error)
                                    return [2 /*return*/, res.status(401).send({ error: error })];
                                req.body.decodedToken = decodedToken;
                                return [2 /*return*/, next()];
                            });
                        }); })];
                }
                catch (error) {
                    res.status(400).send({ error: error });
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    };
    return Authintication;
}());
var authintication = new Authintication();
exports.default = authintication;
