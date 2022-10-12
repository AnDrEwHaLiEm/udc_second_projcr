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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var DefaultRespons_1 = __importDefault(require("../../DefaultRespons"));
var dataBase_1 = __importDefault(require("../../../dataBase"));
var User = /** @class */ (function () {
    function User() {
    }
    /*async deleteModelsById(req: Request): Promise<DefaultResponseInterface> {
      const returnResponse = new DefaultRespons();
      try {
        const { _ids } = req.params;
        const query = `DELETE from users WHERE user_id IN (${_ids});`;
        const conn = await client.connect();
  
        await conn.query(query);
        returnResponse.text = "Deleted";
        return returnResponse;
      } catch (error) {
        returnResponse.state = 400;
        returnResponse.text = `Error Operation ${error}`;
        return returnResponse;
      }
    }*/
    User.prototype.bcryptPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_password, hashPassword;
            return __generator(this, function (_a) {
                try {
                    user_password = req.body.user_password;
                    if (user_password) {
                        hashPassword = bcryptjs_1.default.hashSync(user_password, 10);
                        req.body.user_password = hashPassword;
                        return [2 /*return*/, next()];
                    }
                    else {
                        res.sendStatus(406);
                        return [2 /*return*/];
                    }
                }
                catch (error) {
                    res.sendStatus(400);
                }
                return [2 /*return*/];
            });
        });
    };
    User.prototype.checkEmailAvailabilty = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_email, query, conn, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_email = req.body.user_email;
                        query = "SELECT * FROM users WHERE user_email='".concat(user_email, "';");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        user = _a.sent();
                        conn.release();
                        if (user.rows[0]) {
                            res.status(409).send('User is Exist');
                            return [2 /*return*/];
                        }
                        else
                            next();
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.createNewUser = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, user_name, user_email, user_password, admin_authority, query, conn, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = new DefaultRespons_1.default();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = req.body, user_name = _a.user_name, user_email = _a.user_email, user_password = _a.user_password, admin_authority = _a.admin_authority;
                        query = "INSERT INTO users(user_name,user_email,user_password,admin_authority) VALUES (\n                            '".concat(user_name, "', '").concat(user_email, "', '").concat(user_password, "', '").concat(admin_authority, "');");
                        return [4 /*yield*/, dataBase_1.default.connect()];
                    case 2:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(query)];
                    case 3:
                        _b.sent();
                        conn.release();
                        res.text = 'Success';
                        return [2 /*return*/, res];
                    case 4:
                        error_1 = _b.sent();
                        res.state = 400;
                        res.text = "error ".concat(error_1);
                        return [2 /*return*/, res];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
var user = new User();
exports.default = user;
