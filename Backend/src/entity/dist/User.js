"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var Post_1 = require("./Post");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("uuid")
    ], User.prototype, "userId");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 20 })
    ], User.prototype, "firstName");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 20 })
    ], User.prototype, "lastName");
    __decorate([
        typeorm_1.Column({ unique: true, type: "varchar", length: 50 })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({ type: "varchar", nullable: true })
    ], User.prototype, "avatarUrl");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 255 })
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 20, nullable: true })
    ], User.prototype, "role");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 255, nullable: true })
    ], User.prototype, "bio");
    __decorate([
        typeorm_1.Column({ "default": false })
    ], User.prototype, "isAdmin");
    __decorate([
        typeorm_1.OneToMany(function (type) { return Post_1.Post; }, function (post) { return post.user; }, {
            cascade: true
        }),
        typeorm_1.JoinColumn()
    ], User.prototype, "posts");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
