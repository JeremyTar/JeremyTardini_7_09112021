"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
;
var UserService = /** @class */ (function () {
    function UserService(http, router) {
        this.http = http;
        this.router = router;
        this.isAuth = true;
        this.showCreateForm = false;
    }
    // get function
    UserService.prototype.getUsers = function () {
        return this.http.get('http://localhost:3000/api/users');
    };
    UserService.prototype.getUser = function (id) {
        return this.http.get('http://localhost:3000/api/users/' + id);
    };
    //updates
    UserService.prototype.updateUser = function (data, id) {
        return this.http.put("http://localhost:3000/api/users/" + id, data);
    };
    UserService.prototype.sendAvatarPhoto = function (id, formdata) {
        return this.http.put("http://localhost:3000/api/users/" + id, formdata);
    };
    UserService.prototype.deleteUser = function (id) {
        return this.http["delete"]("http://localhost:3000/api/users/" + id);
    };
    UserService.prototype.changePassword = function (passwords, id) {
        return this.http.put("http://localhost:3000/api/users/password/" + id, passwords);
    };
    UserService.prototype.changeEmail = function (content, id) {
        return this.http.put("http://localhost:3000/api/users/email/" + id, content);
    };
    //auth
    UserService.prototype.loginUser = function (email, password) {
        return this.http.post('http://localhost:3000/api/users/login', { email: email, password: password });
    };
    UserService.prototype.createUser = function (newUser) {
        return this.http.post('http://localhost:3000/api/users', newUser);
    };
    UserService.prototype.signOut = function () {
        localStorage.clear();
        this.isAuth = false;
        this.router.navigate(['']);
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
