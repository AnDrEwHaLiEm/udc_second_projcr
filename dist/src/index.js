"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authinticationRoutes_1 = __importDefault(require("./utilities/Handler Method/authinticationRoutes"));
var cors_1 = __importDefault(require("cors"));
var productOrderRouter_1 = __importDefault(require("./utilities/Handler Method/productOrderRouter"));
var userHandlerMethod_1 = __importDefault(require("./utilities/Handler Method/userHandlerMethod"));
var productRouter_1 = __importDefault(require("./utilities/Handler Method/productRouter"));
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/login', authinticationRoutes_1.default);
app.use('/user', userHandlerMethod_1.default);
app.use('/product', productRouter_1.default);
app.use('/order', productOrderRouter_1.default);
app.listen(port, function () {
    console.log("server run at http://localhost:".concat(port));
});
exports.default = app;
