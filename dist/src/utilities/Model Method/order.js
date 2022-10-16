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
var Order = /** @class */ (function () {
    function Order() {
    }
    Order.prototype.addProductToOrder = function (OrderData) {
        return __awaiter(this, void 0, void 0, function () {
            var product_info, order_id, total_price, multiQuery, conn, result, orderProductData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product_info = OrderData.product_info, order_id = OrderData.order_id;
                        total_price = 0;
                        multiQuery = 'INSERT INTO order_product(order_id, product_id, quantity, price) VALUES ';
                        return [4 /*yield*/, Promise.all(product_info.map(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var product_id, quantity, query, conn, result, remender, query_1, conn_1, product_price, price;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            product_id = element.product_id, quantity = element.quantity;
                                            query = "SELECT product_price,product_quantity FROM products WHERE product_id='".concat(product_id, "';");
                                            return [4 /*yield*/, dataBase_1.client.connect()];
                                        case 1:
                                            conn = _a.sent();
                                            return [4 /*yield*/, conn.query(query)];
                                        case 2:
                                            result = _a.sent();
                                            conn.release();
                                            if (!(result.rows[0].product_quantity >= quantity && quantity >= 1)) return [3 /*break*/, 5];
                                            remender = result.rows[0].product_quantity - quantity;
                                            query_1 = "UPDATE products SET product_quantity='".concat(remender, "' WHERE product_id='").concat(product_id, "';");
                                            return [4 /*yield*/, dataBase_1.client.connect()];
                                        case 3:
                                            conn_1 = _a.sent();
                                            return [4 /*yield*/, conn_1.query(query_1)];
                                        case 4:
                                            _a.sent();
                                            conn_1.release();
                                            product_price = result.rows[0].product_price;
                                            price = quantity * product_price;
                                            total_price += price;
                                            multiQuery +=
                                                "('" +
                                                    order_id +
                                                    "','" +
                                                    product_id +
                                                    "','" +
                                                    quantity +
                                                    "','" +
                                                    price +
                                                    "'),";
                                            _a.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        multiQuery = multiQuery.slice(0, -1) + ' RETURNING *;';
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(multiQuery)];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        orderProductData = {
                            user_id: OrderData.user_id,
                            order_id: OrderData.order_id,
                            total_price: total_price,
                            product_info: result.rows,
                        };
                        return [2 /*return*/, orderProductData];
                }
            });
        });
    };
    Order.prototype.addNewProduct = function (orderData) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, query, conn, result, orderProduct, secondQuery, conn2, result2, orderProductResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        user_id = orderData.user_id;
                        query = "INSERT INTO orders(user_id) Values($1) RETURNING order_id;";
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        orderData.order_id = result.rows[0].order_id;
                        return [4 /*yield*/, this.addProductToOrder(orderData)];
                    case 3:
                        orderProduct = _a.sent();
                        secondQuery = "UPDATE orders SET total_price='".concat(orderProduct.total_price, "' WHERE order_id='").concat(orderProduct.order_id, "' RETURNING *;");
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 4:
                        conn2 = _a.sent();
                        return [4 /*yield*/, conn2.query(secondQuery)];
                    case 5:
                        result2 = _a.sent();
                        conn2.release();
                        orderProductResult = {
                            user_id: result2.rows[0].user_id,
                            order_id: result2.rows[0].order_id,
                            total_price: result2.rows[0].total_price,
                            product_info: orderProduct.product_info,
                        };
                        return [2 /*return*/, orderProductResult];
                    case 6:
                        error_1 = _a.sent();
                        throw "".concat(error_1);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.getAll = function (orderData) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, query, conn, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        user_id = orderData.user_id;
                        query = "SELECT orders.order_id,orders.user_id,orders.total_price,jsonb_agg(\n    JSON_BUILD_OBJECT(\n\t\t'product_id',order_product.product_id,\n\t\t'product_name',products.product_name,\n\t\t'quantity',order_product.quantity,\n\t\t'price',order_product.price\n    )) as product_info FROM orders\n    INNER JOIN order_product ON order_product.order_id = orders.order_id\n    INNER JOIN products ON products.product_id =order_product.product_id WHERE orders.user_id = $1\n    GROUP  BY orders.order_id,orders.total_price;";
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_2 = _a.sent();
                        throw "Error ".concat(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.getOne = function (orderData) {
        return __awaiter(this, void 0, void 0, function () {
            var order_id, query, conn, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order_id = orderData.order_id;
                        query = "SELECT orders.order_id,orders.user_id,orders.total_price,jsonb_agg(\n    JSON_BUILD_OBJECT(\n\t\t'product_id',order_product.product_id,\n\t\t'product_name',products.product_name,\n\t\t'quantity',order_product.quantity,\n\t\t'price',order_product.price\n    )) as product_info FROM orders\n    INNER JOIN order_product ON order_product.order_id = orders.order_id\n    INNER JOIN products ON products.product_id =order_product.product_id WHERE orders.order_id = $1\n    GROUP  BY orders.order_id,orders.total_price;";
                        return [4 /*yield*/, dataBase_1.client.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [order_id])];
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
    return Order;
}());
var order = new Order();
exports.default = order;
