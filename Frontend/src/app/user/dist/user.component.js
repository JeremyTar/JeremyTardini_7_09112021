"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.UserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UserComponent = /** @class */ (function () {
    function UserComponent(router, userService, postService, commentService) {
        this.router = router;
        this.userService = userService;
        this.postService = postService;
        this.commentService = commentService;
        this.changeAvatar = false;
        // For component
        this.showLastName = false;
        this.showFirstName = false;
        this.showEmail = false;
        this.showRole = false;
        this.showAvatar = false;
        this.disableSelect = new forms_1.FormControl;
        this.haveBio = false;
        this.haveAvatar = false;
        this.haveRole = false;
    }
    UserComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.userService.getUser(localStorage.getItem("userId"))
                    .subscribe(function (data) {
                    _this.user = data;
                    console.log(data);
                    if (_this.user.bio) {
                        _this.haveBio = true;
                    }
                    if (_this.user.avatarUrl) {
                        _this.haveAvatar = true;
                    }
                    if (_this.user.role) {
                        _this.haveRole = true;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    // personnal FUNCTION
    UserComponent.prototype.modifyFirstName = function () {
        if (this.showFirstName) {
            this.showFirstName = false;
        }
        else {
            this.showFirstName = true;
        }
    };
    UserComponent.prototype.changeFirstName = function (form) {
        var _this = this;
        this.userService.updateUser(form.value, this.user.userId)
            .subscribe(function (response) {
            console.log(response);
            _this.ngOnInit();
            _this.showFirstName = false;
        });
    };
    UserComponent.prototype.modifyLastName = function () {
        if (this.showLastName) {
            this.showLastName = false;
        }
        else {
            this.showLastName = true;
        }
    };
    UserComponent.prototype.changeLastName = function (form) {
        var _this = this;
        this.userService.updateUser(form.value, this.user.userId)
            .subscribe(function (response) {
            console.log(response);
            _this.ngOnInit();
            _this.showLastName = false;
        });
    };
    UserComponent.prototype.modifyRole = function () {
        if (this.showRole) {
            this.showRole = false;
        }
        else {
            this.showRole = true;
        }
    };
    UserComponent.prototype.changeRole = function (form) {
        var _this = this;
        this.userService.updateUser(form.value, this.user.userId)
            .subscribe(function (response) {
            console.log(response);
            _this.ngOnInit();
            _this.showRole = false;
        });
    };
    // Accompt FUNCTION
    // showPassword() {
    // }
    UserComponent.prototype.deleteAccompte = function () {
        var _this = this;
        this.commentService.getAllCommentsByUser(this.user.userId)
            .subscribe(function (data) {
            console.log(data);
            _this.comments = data;
            _this.comments.forEach(function (elem) {
                _this.commentService.deleteComments(elem.commentId)
                    .subscribe(function () {
                    console.log("comments user delete");
                });
            });
        });
        this.userService.deleteUser(this.user.userId)
            .subscribe(function () {
            console.log("User completely delete");
            _this.userService.signOut();
            _this.authStatus = _this.userService.isAuth;
            _this.router.navigate(['']);
        });
    };
    UserComponent.prototype.modifyEmail = function () {
    };
    UserComponent.prototype.modifyAvatar = function () {
        if (!this.showAvatar) {
            this.showAvatar = true;
        }
        else {
            this.showAvatar = false;
        }
    };
    UserComponent.prototype.selectedFileAvatar = function (event) {
        this.avatarFile = event.target.files[0];
        console.log(this.avatarFile);
    };
    UserComponent.prototype.sendNewAvatar = function () {
        var formdata = new FormData();
        formdata.set("file", this.avatarFile);
        this.userService.sendAvatarPhoto(localStorage.getItem('userId'), formdata)
            .subscribe(function (res) {
            console.log(res);
        });
        this.ngOnInit();
    };
    UserComponent.prototype.goOnPosts = function () {
        this.router.navigate(['main']);
    };
    UserComponent.prototype.userDeconnexion = function () {
        this.userService.signOut();
        this.authStatus = this.userService.isAuth;
        this.router.navigate(['']);
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.scss']
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
