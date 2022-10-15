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
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var product_1 = __importDefault(require("../Model Method/product"));
var productRouter = express_1.default.Router();
var checkAuthorty = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var privateKey, authorizationHeader, token;
    return __generator(this, function (_a) {
        privateKey = process.env.PRIVATE_KEY;
        authorizationHeader = req.headers['authorization'];
        token = authorizationHeader && authorizationHeader.split('=')[1];
        if (!token) {
            return [2 /*return*/];
        }
        return [2 /*return*/, jsonwebtoken_1.default.verify(token, privateKey, function (err, decodedToken) { return __awaiter(void 0, void 0, void 0, function () {
                var admin_authority;
                return __generator(this, function (_a) {
                    if (err) {
                        res.status(401);
                        res.json('Unauthorized');
                        return [2 /*return*/];
                    }
                    else {
                        req.body.decodedToken = decodedToken;
                        admin_authority = req.body.decodedToken.admin_authority;
                        if (admin_authority == 'admin') {
                            next();
                            return [2 /*return*/];
                        }
                        res.status(401);
                        res.json('Unauthorized');
                        return [2 /*return*/];
                    }
                    return [2 /*return*/];
                });
            }); })];
    });
}); };
productRouter.post('/create', checkAuthorty, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productData, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productData = {
                    product_name: req.body.product_name,
                    product_price: req.body.product_price,
                    product_quantity: req.body.product_quantity,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, product_1.default.createNewProduct(productData)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
productRouter.put('/edit', checkAuthorty, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productData, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productData = {
                    product_id: req.body.product_id,
                    product_name: req.body.product_name,
                    product_price: req.body.product_price,
                    product_quantity: req.body.product_quantity,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, product_1.default.edit(productData)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
productRouter.delete('/delete/:_id', checkAuthorty, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productData, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productData = {
                    product_id: req.params._id,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, product_1.default.delete(productData)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 3:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
productRouter.get('/getAll', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_1.default.getAll()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                err_4 = _a.sent();
                res.status(400);
                res.json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
productRouter.get('/getOne/:_id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productData, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productData = {
                    product_id: req.params._id,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, product_1.default.getOne(productData)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 3:
                err_5 = _a.sent();
                res.status(404);
                res.json(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = productRouter;
