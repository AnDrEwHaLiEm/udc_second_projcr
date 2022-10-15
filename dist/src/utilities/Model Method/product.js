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
Object.defineProperty(exports, "__esModule", { value: true });
var dataBase_1 = require("../../dataBase");
var Product = /** @class */ (function () {
    function Product() {
    }
    Product.prototype.createNewProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var product_name, product_price, product_quantity, query, conn, result, newProduct, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        product_name = product.product_name, product_price = product.product_price, product_quantity = product.product_quantity;
                        query = "INSERT INTO products(product_name,product_price,product_quantity) VALUES ($1,$2,$3) RETURNING *;";
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [
                                product_name,
                                product_price,
                                product_quantity,
                            ])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        newProduct = result.rows[0];
                        return [2 /*return*/, newProduct];
                    case 3:
                        err_1 = _a.sent();
                        throw 'unable to Create Product';
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.edit = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var product_id, product_name, product_price, product_quantity, query, conn, result, updatedProduct, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        product_id = product.product_id, product_name = product.product_name, product_price = product.product_price, product_quantity = product.product_quantity;
                        query = "UPDATE products SET product_name = $1 ,product_price=$2,product_quantity=$3 WHERE product_id=$4 RETURNING *;";
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [
                                product_name,
                                product_price,
                                product_quantity,
                                product_id,
                            ])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        updatedProduct = result.rows[0];
                        return [2 /*return*/, updatedProduct];
                    case 3:
                        error_1 = _a.sent();
                        throw 'unable to Edit Product';
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.delete = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var product_id, query, conn, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        product_id = product.product_id;
                        query = "DELETE FROM products WHERE product_id=$1;";
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [product_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount)
                            return [2 /*return*/, 'Deleted'];
                        else
                            throw 'Error when Delete Product';
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        throw 'Error when Delete Product';
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.getOne = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var product_id, query, conn, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product_id = product.product_id;
                        query = "SELECT * FROM products WHERE product_id=$1;";
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [product_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length) {
                            return [2 /*return*/, result.rows[0]];
                        }
                        throw 'Not Found';
                }
            });
        });
    };
    Product.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, products, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'SELECT * from products';
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        products = _a.sent();
                        conn.release();
                        result = products.rows.map(function (element) {
                            var product_id = element.product_id, product_name = element.product_name, product_price = element.product_price, product_quantity = element.product_quantity;
                            return { product_id: product_id, product_name: product_name, product_price: product_price, product_quantity: product_quantity };
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Product;
}());
var product = new Product();
exports.default = product;
