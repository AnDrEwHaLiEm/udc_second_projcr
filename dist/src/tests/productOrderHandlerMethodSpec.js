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
var supertest_1 = __importDefault(require("supertest"));
var __1 = __importDefault(require(".."));
var LoginHandlerMethodSpec_1 = require("./LoginHandlerMethodSpec");
var request = (0, supertest_1.default)(__1.default);
function compare(a, b) {
    if (a.product_id < b.product_id) {
        return -1;
    }
    if (a.product_id > b.product_id) {
        return 1;
    }
    return 0;
}
describe('order Tests EndPoint', function () {
    it('add new Order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, result, productRes;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    req = {
                        products: [
                            { product_id: 1, quantity: 2 },
                            { product_id: 2, quantity: 3 },
                            { product_id: 3, quantity: 4 },
                        ],
                    };
                    return [4 /*yield*/, request
                            .post('/order/add')
                            .send(req)
                            .set('authorization', LoginHandlerMethodSpec_1.clientToken)];
                case 1:
                    result = _b.sent();
                    productRes = {
                        order_id: 1,
                        user_id: 2,
                        total_price: '68.00',
                        product_info: [
                            { order_id: 1, product_id: 1, quantity: 2, price: '20.00' },
                            { order_id: 1, product_id: 2, quantity: 3, price: '36.00' },
                            { order_id: 1, product_id: 3, quantity: 4, price: '12.00' },
                        ],
                    };
                    expect(result.status).toEqual(200);
                    expect(result.body.user_id).toEqual(2);
                    expect(result.body.order_id).toEqual(1);
                    expect(result.body.total_price).toBeCloseTo(68);
                    (_a = result.body.product_info) === null || _a === void 0 ? void 0 : _a.sort(compare);
                    expect(result.body.product_info).toEqual(productRes.product_info);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Client Get one order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, order, productRes;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request
                        .get("/order/getOne/1")
                        .set('authorization', LoginHandlerMethodSpec_1.clientToken)];
                case 1:
                    result = _b.sent();
                    order = result.body.result;
                    productRes = {
                        order_id: 1,
                        user_id: 2,
                        total_price: '68.00',
                        product_info: [
                            { price: 20, quantity: 2, product_id: 1, product_name: 'Apple' },
                            { price: 36, quantity: 3, product_id: 2, product_name: 'Banana' },
                            { price: 12, quantity: 4, product_id: 3, product_name: 'Tomato' },
                        ],
                    };
                    (_a = result.body.product_info) === null || _a === void 0 ? void 0 : _a.sort(compare);
                    expect(result.status).toEqual(200);
                    expect(order).toEqual(productRes);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Client Get Not Exist order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get("/order/getOne/-1")
                        .set('authorization', LoginHandlerMethodSpec_1.clientToken)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toEqual(404);
                    expect(result.body).toEqual('Not Found');
                    return [2 /*return*/];
            }
        });
    }); });
    it('get  All order for one user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, order, productRes;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request
                        .get("/order/getAll")
                        .set('authorization', LoginHandlerMethodSpec_1.clientToken)];
                case 1:
                    result = _b.sent();
                    order = result.body.result;
                    productRes = {
                        order_id: 1,
                        user_id: 2,
                        total_price: '68.00',
                        product_info: [
                            { price: 20, quantity: 2, product_id: 1, product_name: 'Apple' },
                            { price: 36, quantity: 3, product_id: 2, product_name: 'Banana' },
                            { price: 12, quantity: 4, product_id: 3, product_name: 'Tomato' },
                        ],
                    };
                    (_a = result.body.product_info) === null || _a === void 0 ? void 0 : _a.sort(compare);
                    expect(result.status).toEqual(200);
                    expect(order).toEqual([productRes]);
                    return [2 /*return*/];
            }
        });
    }); });
});
