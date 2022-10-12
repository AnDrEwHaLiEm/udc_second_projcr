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
var dataBase_1 = __importDefault(require("../../dataBase"));
var DefaultRespons_1 = __importDefault(require("../DefaultRespons"));
var Order = /** @class */ (function () {
    function Order() {
    }
    Order.prototype.getQuantityBack = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, product_id, query, conn, result, userOrderproduct, secondQuery, secondconn, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        _id = req.body.decodedToken._id;
                        product_id = req.params.product_id;
                        query = "SELECT product_quantity FROM orders WHERE userid='".concat(_id, "' AND productid ='").concat(product_id, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        userOrderproduct = result.rows[0].product_quantity;
                        secondQuery = "UPDATE products SET product_quantity=product_quantity + ".concat(userOrderproduct, " WHERE product_id ='").concat(product_id, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 3:
                        secondconn = _a.sent();
                        return [4 /*yield*/, secondconn.query(secondQuery)];
                    case 4:
                        _a.sent();
                        secondconn.release();
                        return [2 /*return*/, true];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.delete = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _id, product_id, itemIsReturn, query, conn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = new DefaultRespons_1.default();
                        _id = req.body.decodedToken._id;
                        product_id = req.params.product_id;
                        return [4 /*yield*/, this.getQuantityBack(req)];
                    case 1:
                        itemIsReturn = _a.sent();
                        if (!itemIsReturn) return [3 /*break*/, 4];
                        query = "DELETE FROM orders WHERE productid='".concat(product_id, "' AND userid ='").concat(_id, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 3:
                        _a.sent();
                        conn.release();
                        return [3 /*break*/, 5];
                    case 4:
                        response.state = 400;
                        response.text = "Can't delete this Order";
                        _a.label = 5;
                    case 5: return [2 /*return*/, response];
                }
            });
        });
    };
    Order.prototype.getAll = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, query, conn, result, returnResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req.body.decodedToken._id;
                        query = "SELECT orders.product_quantity,orders.total_price, products.product_name FROM products INNER JOIN orders ON productid = products.product_id WHERE orders.userid ='".concat(_id, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        returnResult = result.rows;
                        return [2 /*return*/, returnResult];
                }
            });
        });
    };
    Order.prototype.getOne = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, product_id, query, conn, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req.body.decodedToken._id;
                        product_id = req.params.product_id;
                        query = "SELECT products.product_id,orders.product_quantity,orders.total_price, products.product_name FROM products INNER JOIN orders  ON productid = products.product_id WHERE orders.userid ='".concat(_id, "' AND orders.productid='").concat(product_id, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length) {
                            return [2 /*return*/, result.rows[0]];
                        }
                        return [2 /*return*/, {
                                product_id: '-1',
                                product_name: '-1',
                                total_price: -1,
                                product_quantity: -1,
                            }];
                }
            });
        });
    };
    Order.prototype.checkProductExist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, product_id, product_quantity, query, conn, result, remender, query_1, conn_1, product_price, total_price;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, product_id = _a.product_id, product_quantity = _a.product_quantity;
                        query = "SELECT product_price,product_quantity FROM products WHERE product_id='".concat(product_id, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 1:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        result = _b.sent();
                        conn.release();
                        if (!(result.rows[0].product_quantity >= product_quantity &&
                            product_quantity >= 1)) return [3 /*break*/, 5];
                        remender = result.rows[0].product_quantity - product_quantity;
                        query_1 = "UPDATE products SET product_quantity='".concat(remender, "' WHERE product_id='").concat(product_id, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 3:
                        conn_1 = _b.sent();
                        return [4 /*yield*/, conn_1.query(query_1)];
                    case 4:
                        _b.sent();
                        conn_1.release();
                        product_price = result.rows[0].product_price;
                        total_price = product_quantity * product_price;
                        req.body.total_price = total_price;
                        next();
                        return [3 /*break*/, 6];
                    case 5:
                        res.sendStatus(404);
                        return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.addNewProduct = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _id, _a, product_id, product_quantity, total_price, query, conn, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = new DefaultRespons_1.default();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _id = req.body.decodedToken._id;
                        _a = req.body, product_id = _a.product_id, product_quantity = _a.product_quantity, total_price = _a.total_price;
                        query = "INSERT INTO orders(userid,productid,product_quantity,total_price) Values('".concat(_id, "','").concat(product_id, "','").concat(product_quantity, "','").concat(total_price, "');");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 2:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 3:
                        _b.sent();
                        conn.release();
                        res.state = 200;
                        res.text = 'Success';
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
    return Order;
}());
var productOrder = new Order();
exports.default = productOrder;
