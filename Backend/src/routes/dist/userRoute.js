"use strict";
exports.__esModule = true;
exports.UserRouter = void 0;
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var multer_1 = require("../middleware/multer");
exports.UserRouter = express_1.Router();
// liste des routes users
exports.UserRouter.post('/users/login', userController_1.userLogin);
exports.UserRouter.get('/users', userController_1.getAllusers);
exports.UserRouter.get('/users/:id', userController_1.getOneUser);
exports.UserRouter.post('/users', userController_1.createUser);
exports.UserRouter.put('/users/:id', multer_1.UserMulter, userController_1.updateUser);
exports.UserRouter.put('/users/password/:id', userController_1.newPassword);
exports.UserRouter["delete"]('/users/:id', userController_1.deleteUser);
