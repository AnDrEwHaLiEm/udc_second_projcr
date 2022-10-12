"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authinticationRoutes_1 = __importDefault(require("./utilities/routes/authinticationRoutes"));
var cors_1 = __importDefault(require("cors"));
var userRouter_1 = __importDefault(require("./utilities/routes/userRouter"));
var authintication_1 = __importDefault(require("./utilities/process//authintication"));
var checkAuthory_1 = __importDefault(require("./utilities/process/checkAuthory"));
var productRouter_1 = require("./utilities/routes/productRouter");
var productOrderRouter_1 = __importDefault(require("./utilities/routes/productOrderRouter"));
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/login', authinticationRoutes_1.default);
app.use('/user', userRouter_1.default);
app.use('/product', productRouter_1.productClientRouter);
app.use(authintication_1.default.authinticate);
app.use(checkAuthory_1.default);
app.use('/product', productRouter_1.productAdminRouter);
app.use('/order', productOrderRouter_1.default);
app.listen(port, function () {
    console.log("server run at http://localhost:".concat(port));
});
exports.default = app;
