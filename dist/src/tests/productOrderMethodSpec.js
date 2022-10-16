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
var order_1 = __importDefault(require("../utilities/Model Method/order"));
function compare(a, b) {
    if (a.product_id < b.product_id) {
        return -1;
    }
    if (a.product_id > b.product_id) {
        return 1;
    }
    return 0;
}
function mainCompare(a, b) {
    if (a.order_id < b.order_id) {
        return -1;
    }
    if (a.order_id > b.order_id) {
        return 1;
    }
    return 0;
}
describe('order Tests Model', function () {
    it('add new Order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    req = {
                        user_id: 2,
                        product_info: [
                            { product_id: 1, quantity: 2 },
                            { product_id: 2, quantity: 3 },
                            { product_id: 3, quantity: 4 },
                        ],
                    };
                    return [4 /*yield*/, order_1.default.addNewProduct(req)];
                case 1:
                    result = _b.sent();
                    (_a = result.product_info) === null || _a === void 0 ? void 0 : _a.sort(compare);
                    expect(result.order_id).toEqual(2);
                    expect(result.user_id).toBeCloseTo(2);
                    expect(result.total_price).toBeCloseTo(68.0);
                    expect(result.product_info).toEqual([
                        { order_id: 2, product_id: 1, quantity: 2, price: '20.00' },
                        { order_id: 2, product_id: 2, quantity: 3, price: '36.00' },
                        { order_id: 2, product_id: 3, quantity: 4, price: '12.00' },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Client Get one order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    req = {
                        order_id: 2,
                    };
                    return [4 /*yield*/, order_1.default.getOne(req)];
                case 1:
                    result = _b.sent();
                    (_a = result.product_info) === null || _a === void 0 ? void 0 : _a.sort(compare);
                    expect(result.order_id).toEqual(2);
                    expect(result.user_id).toEqual(2);
                    expect(result.total_price).toBeCloseTo(68);
                    expect(result.product_info).toEqual([
                        { price: 20, quantity: 2, product_id: 1, product_name: 'Apple' },
                        { price: 36, quantity: 3, product_id: 2, product_name: 'Banana' },
                        { price: 12, quantity: 4, product_id: 3, product_name: 'Tomato' },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Client Get Not Exist order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        order_id: -1,
                    };
                    return [4 /*yield*/, expectAsync(order_1.default.getOne(req)).toBeRejectedWith('Not Found')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('get All order for one user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, result;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    req = {
                        user_id: 2,
                    };
                    return [4 /*yield*/, order_1.default.getAll(req)];
                case 1:
                    result = _c.sent();
                    result.sort(mainCompare);
                    (_a = result[0].product_info) === null || _a === void 0 ? void 0 : _a.sort(compare);
                    (_b = result[1].product_info) === null || _b === void 0 ? void 0 : _b.sort(compare);
                    expect(result[0].order_id).toEqual(1);
                    expect(result[0].user_id).toEqual(2);
                    expect(result[0].total_price).toBeCloseTo(68);
                    expect(result[1].order_id).toEqual(2);
                    expect(result[1].user_id).toEqual(2);
                    expect(result[1].total_price).toBeCloseTo(68);
                    expect(result[0].product_info).toEqual([
                        { price: 20, quantity: 2, product_id: 1, product_name: 'Apple' },
                        { price: 36, quantity: 3, product_id: 2, product_name: 'Banana' },
                        { price: 12, quantity: 4, product_id: 3, product_name: 'Tomato' },
                    ]);
                    expect(result[1].product_info).toEqual([
                        { price: 20, quantity: 2, product_id: 1, product_name: 'Apple' },
                        { price: 36, quantity: 3, product_id: 2, product_name: 'Banana' },
                        { price: 12, quantity: 4, product_id: 3, product_name: 'Tomato' },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
