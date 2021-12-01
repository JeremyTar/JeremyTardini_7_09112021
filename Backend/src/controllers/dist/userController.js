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
exports.__esModule = true;
exports.deleteUser = exports.newPassword = exports.updateUser = exports.createUser = exports.getOneUser = exports.userLogin = exports.getAllusers = void 0;
var User_1 = require("../entity/User");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();
// FUNCTION GET ALL USERS
function getAllusers(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userRepository, allUsers, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User)];
                case 1:
                    userRepository = _a.sent();
                    return [4 /*yield*/, userRepository.find()];
                case 2:
                    allUsers = _a.sent();
                    res.send(allUsers);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, next(err_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getAllusers = getAllusers;
//FONCTION USER LOGIN
function userLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userRepository, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    if (!(email && password)) {
                        res.status(400).send("veuillez rentrer vos informations");
                    }
                    userRepository = typeorm_1.getConnection().getRepository(User_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail({ where: { email: email } })];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    res.status(401).send("Utilisateur inexistant");
                    return [3 /*break*/, 4];
                case 4:
                    // Comparaison des mots de passe par Bcrypt,
                    bcrypt.compare(req.body.password, user.password)
                        .then(function (valid) {
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect !' });
                        }
                        res.status(200).json({
                            userId: user.userId,
                            token: jwt.sign({ userId: user.userId }, process.env.JWT_TOKEN, { expiresIn: '12h' })
                        });
                    })["catch"](function (error) { return res.status(500).json({ error: error }); });
                    return [2 /*return*/];
            }
        });
    });
}
exports.userLogin = userLogin;
// FUNCTION GET ONE USER
function getOneUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userRepository, oneUser, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User)];
                case 1:
                    userRepository = _a.sent();
                    return [4 /*yield*/, userRepository.findOne(req.params.id)];
                case 2:
                    oneUser = _a.sent();
                    res.send(oneUser);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, next(err_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getOneUser = getOneUser;
// FUNCTION CREATE USER
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userRepository, hash, NewUser, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User)];
                case 1:
                    userRepository = _a.sent();
                    return [4 /*yield*/, bcrypt.hash(req.body.password, 10)];
                case 2:
                    hash = _a.sent();
                    NewUser = new User_1.User();
                    NewUser.firstName = req.body.firstName;
                    NewUser.lastName = req.body.lastName;
                    NewUser.email = req.body.email;
                    NewUser.password = hash;
                    return [4 /*yield*/, userRepository.save(NewUser)];
                case 3:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    return [2 /*return*/, next(err_3)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
// FUNCTION UPTADE USER
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userRepository, SaveUser, result, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User)];
                case 1:
                    userRepository = _a.sent();
                    return [4 /*yield*/, userRepository.findOne(req.params.id)];
                case 2:
                    SaveUser = _a.sent();
                    SaveUser.firstName = req.body.firstName;
                    SaveUser.lastName = req.body.lastName;
                    SaveUser.email = req.body.email;
                    SaveUser.bio = req.body.bio;
                    SaveUser.role = req.body.role;
                    return [4 /*yield*/, userRepository.save(SaveUser)];
                case 3:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 5];
                case 4:
                    err_4 = _a.sent();
                    return [2 /*return*/, next(err_4)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
function newPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, oldPassword, newPassword_1, userRepository, user, compare, hash, result, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    _a = req.body, oldPassword = _a.oldPassword, newPassword_1 = _a.newPassword;
                    if (!(oldPassword && newPassword_1)) {
                        res.status(400).send("veuillez rentrer vos informations");
                    }
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User)];
                case 1:
                    userRepository = _b.sent();
                    return [4 /*yield*/, userRepository.findOne(req.params.id)];
                case 2:
                    user = _b.sent();
                    console.log(user);
                    console.log(req.params.id);
                    return [4 /*yield*/, bcrypt.compare(req.body.oldPassword, user.password)];
                case 3:
                    compare = _b.sent();
                    if (!compare) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcrypt.hash(req.body.newPassword, 10)];
                case 4:
                    hash = _b.sent();
                    user.password = hash;
                    console.log(user.password);
                    result = userRepository.save(user);
                    res.send(result);
                    return [3 /*break*/, 6];
                case 5: return [2 /*return*/, res.status(401).json({ error: 'Mot de passe incorrect !' })];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_5 = _b.sent();
                    return [2 /*return*/, next(err_5)];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.newPassword = newPassword;
// FUNCTION DELETE USER
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userRepository, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User)];
                case 1:
                    userRepository = _a.sent();
                    return [4 /*yield*/, userRepository["delete"](req.params.id)];
                case 2:
                    _a.sent();
                    res.send("User id : " + req.params.id + " was delete");
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _a.sent();
                    return [2 /*return*/, next(err_6)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteUser = deleteUser;
