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
var __1 = __importDefault(require("../"));
var request = (0, supertest_1.default)(__1.default);
var AdminToken = '123=';
var clientToken = '123=';
describe('User Tests', function () {
    it('login with main admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = { user_email: 'admin@admin.com', password: 'admin' };
                    return [4 /*yield*/, request.post('/login').send(req)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    AdminToken += response.body.token;
                    expect(response.body.token).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('create new user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var Random, userData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Random = Math.random() * 100;
                    userData = {
                        user_name: 'Andrew',
                        admin_authority: 'client',
                        user_email: "an.roooof".concat(Random, "@gmail.com"),
                        user_password: 'admin',
                    };
                    return [4 /*yield*/, request.post('/user/signup').send(userData)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.text).toEqual('Success');
                    return [2 /*return*/];
            }
        });
    }); });
    it('create exist user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userData = {
                        user_name: 'Andrew',
                        admin_authority: 'client',
                        user_email: 'an.roooof@gmail.com',
                        user_password: 'admin',
                    };
                    return [4 /*yield*/, request.post('/user/signup').send(userData)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(409);
                    expect(response.text).toEqual('User is Exist');
                    return [2 /*return*/];
            }
        });
    }); });
    it('login with new user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = { user_email: 'an.roooof@gmail.com', password: 'admin' };
                    return [4 /*yield*/, request.post('/login').send(req)];
                case 1:
                    response = _a.sent();
                    clientToken += response.body.token;
                    expect(response.status).toEqual(200);
                    expect(response.body.token).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('login with wrong password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = { user_email: 'an.roooof@gmail.com', password: '012456' };
                    return [4 /*yield*/, request.post('/login').send(req)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    expect(response.text).toEqual('Email or password is uncorrect');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Product Tests', function () {
    it('Admin Create  product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var productData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productData = {
                        product_name: 'Chipsi',
                        product_price: 100,
                        product_quantity: 100,
                    };
                    return [4 /*yield*/, request
                            .post('/product/create')
                            .send(productData)
                            .set('authorization', AdminToken)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.text).toEqual('Success');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Client Create  product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var productData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productData = {
                        product_name: 'Chipsi',
                        product_price: 100,
                        product_quantity: 100,
                    };
                    return [4 /*yield*/, request
                            .post('/product/create')
                            .send(productData)
                            .set('authorization', clientToken)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    expect(response.text).toEqual('Unauthorized');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Admin Edit Product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var productData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productData = {
                        product_id: 4,
                        product_name: 'Tiger',
                        product_price: 100,
                        product_quantity: 100,
                    };
                    return [4 /*yield*/, request
                            .put('/product/edit')
                            .send(productData)
                            .set('authorization', AdminToken)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('any One show Products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/product/getAll')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body.length).toBeTruthy();
                    expect(response.body[0].product_id).toBeTruthy();
                    expect(response.body[0].product_name).toBeTruthy();
                    expect(response.body[0].product_price).toBeTruthy();
                    expect(response.body[0].product_quantity).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Any One get Exist One Product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/product/getOne/1")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.body.product_id).toEqual(1);
                    expect(response.body.product_name).toEqual('Apple');
                    expect(response.body.product_price).toEqual('10.00');
                    expect(response.body.product_quantity).toBeLessThanOrEqual(60);
                    expect(response.body.product_quantity).toBeGreaterThanOrEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Any One get Not Exist One Product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/product/getOne/-1')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    expect(response.text).toEqual('Not Found');
                    return [2 /*return*/];
            }
        });
    }); });
    it('admin delete Product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete("/product/delete/4")
                        .set('authorization', AdminToken)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('user delete Product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete("/product/delete/4")
                        .set('authorization', clientToken)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    expect(response.text).toEqual('Unauthorized');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('order Test', function () {
    it('add new Order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        products: [
                            { product_id: 1, product_quantity: 2 },
                            { product_id: 2, product_quantity: 3 },
                            { product_id: 3, product_quantity: 4 },
                        ],
                    };
                    return [4 /*yield*/, request
                            .post('/order/add')
                            .send(req)
                            .set('authorization', clientToken)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get one order ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get("/order/getOne/1")
                        .set('authorization', clientToken)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get  All order for one user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get("/order/getAll")
                        .set('authorization', clientToken)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
