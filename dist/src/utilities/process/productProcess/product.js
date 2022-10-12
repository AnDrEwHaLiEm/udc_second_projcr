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
var dataBase_1 = __importDefault(require("../../../dataBase"));
var DefaultRespons_1 = __importDefault(require("../../DefaultRespons"));
var Product = /** @class */ (function () {
    function Product() {
    }
    Product.prototype.createNewProduct = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, product_name, product_price, product_quantity, query_1, conn, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = new DefaultRespons_1.default();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = req.body, product_name = _a.product_name, product_price = _a.product_price, product_quantity = _a.product_quantity;
                        query_1 = "INSERT INTO products(product_name,product_price,product_quantity) VALUES ('".concat(product_name, "','").concat(product_price, "','").concat(product_quantity, "');");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 2:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(query_1)];
                    case 3:
                        _b.sent();
                        conn.release();
                        res.state = 200;
                        res.text = "Success";
                        return [2 /*return*/, res];
                    case 4:
                        error_1 = _b.sent();
                        res.state = 400;
                        res.text = "Error ".concat(error_1);
                        return [2 /*return*/, res];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.edit = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, product_id, product_name, product_price, product_quantity, query_2, conn, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = new DefaultRespons_1.default();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = req.body, product_id = _a.product_id, product_name = _a.product_name, product_price = _a.product_price, product_quantity = _a.product_quantity;
                        query_2 = "UPDATE products SET product_name = '".concat(product_name, "',product_price='").concat(product_price, "',product_quantity='").concat(product_quantity, "' WHERE product_id='").concat(product_id, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 2:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(query_2)];
                    case 3:
                        result = _b.sent();
                        conn.release();
                        res.text = "Success";
                        return [2 /*return*/, res];
                    case 4:
                        error_2 = _b.sent();
                        res.state = 400;
                        res.text = "Error ".concat(error_2);
                        return [2 /*return*/, res];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.delete = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, query_3, conn, q, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        _id = req.params._id;
                        query_3 = "DELETE FROM products WHERE product_id='".concat(_id, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query_3)];
                    case 2:
                        q = _a.sent();
                        conn.release();
                        return [2 /*return*/, { state: 200, text: "DELETED" }];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, { state: 400, text: "Error ".concat(error_3) }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.getOne = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, query, conn, result, returnResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req.params._id;
                        query = "SELECT * FROM products WHERE product_id='".concat(_id, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length) {
                            returnResult = result.rows[0];
                            return [2 /*return*/, returnResult];
                        }
                        return [2 /*return*/, { product_id: "-1", product_name: "-1", product_quantity: -1, product_price: -1 }];
                }
            });
        });
    };
    Product.prototype.getAll = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, result, returnResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * from products";
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        returnResult = result.rows.map(function (element) {
                            var product_id = element.product_id, product_name = element.product_name, product_price = element.product_price, product_quantity = element.product_quantity;
                            return { product_id: product_id, product_name: product_name, product_price: product_price, product_quantity: product_quantity };
                        });
                        return [2 /*return*/, returnResult];
                }
            });
        });
    };
    return Product;
}());
var product = new Product();
exports.default = product;
