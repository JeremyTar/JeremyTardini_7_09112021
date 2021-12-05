"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var PostService = /** @class */ (function () {
    function PostService(http) {
        this.http = http;
        this.postsSubject$ = new rxjs_1.Subject();
        this.showNewPost = false;
    }
    ;
    PostService.prototype.getToken = function () {
        var token = (localStorage.getItem('token'));
        return token;
    };
    PostService.prototype.getUserId = function () {
        var userId = (localStorage.getItem('userId'));
        return userId;
    };
    PostService.prototype.getAllpost = function () {
        return this.http.get('http://localhost:3000/api/posts');
    };
    PostService.prototype.getOnepost = function (id) {
        return this.http.get('http://localhost:3000/api/posts' + id);
    };
    PostService.prototype.sendPost = function (content) {
        return this.http.post('http://localhost:3000/api/posts', content);
    };
    PostService.prototype.sendPostPhoto = function (formData) {
        return this.http.post('http://localhost:3000/api/posts/file', formData);
    };
    PostService.prototype.updatePost = function (id, content) {
        return this.http.post('http://localhost:3000/api/posts' + id, content);
    };
    PostService.prototype.deletePost = function (id) {
        return this.http["delete"]('http://localhost:3000/api/posts' + id);
    };
    PostService = __decorate([
        core_1.Injectable()
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
