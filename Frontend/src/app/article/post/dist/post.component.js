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
exports.PostComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var PostComponent = /** @class */ (function () {
    function PostComponent(commentService, userService, postService, articleComponent, formBuilder) {
        this.commentService = commentService;
        this.userService = userService;
        this.postService = postService;
        this.articleComponent = articleComponent;
        this.formBuilder = formBuilder;
        this.showComments = false;
        this.currentUtilisator = false;
        this.isLiked = false;
        this.isDisliked = false;
    }
    PostComponent.prototype.ngOnInit = function () {
        // init attachment of post
        var _this = this;
        if (this.attachement != "http://localhost:3000/images/posts/") {
            this.urlAttachment = this.attachement;
        }
        else {
            this.urlAttachment = undefined;
        }
        console.log(this.attachement);
        this.commentForm = this.formBuilder.group({
            content: ['', forms_1.Validators.required]
        });
        // get informations
        var UserId = localStorage.getItem('userId');
        var userIdPost = this.createdUserId;
        // authentification of user    
        if (userIdPost == UserId) {
            this.currentUtilisator = true;
        }
        // to get the name
        this.userService.getUser(userIdPost)
            .subscribe(function (data) {
            _this.userNamePost = data;
            _this.firstName = _this.userNamePost.firstName;
            _this.lastName = _this.userNamePost.lastName;
        });
        // to get if tis admin
        this.userService.getUser(UserId)
            .subscribe(function (data) {
            _this.LocalUserInformations = data;
            _this.isAdmin = _this.LocalUserInformations.isAdmin;
        });
        // set like status
        if (this.likes == null) {
            this.nbrOfLike = 0;
        }
        else {
            this.nbrOfLike = this.likes.length;
            if (this.likes.some(function (like) { return like === UserId; })) {
                this.isLiked = true;
            }
        }
        if (this.dislikes == null) {
            this.nbrOfDislike = 0;
        }
        else {
            this.nbrOfDislike = this.dislikes.length;
            if (this.dislikes.some(function (dislike) { return dislike === UserId; })) {
                this.isDisliked = true;
            }
        }
    };
    // Open / CLose comments
    PostComponent.prototype.openComments = function () {
        var _this = this;
        this.commentService.getAllCommentsOfPost(this.postId)
            .subscribe(function (data) {
            _this.comments = data;
            _this.comments.reverse();
            _this.showComments = true;
        });
    };
    PostComponent.prototype.closeComment = function () {
        this.showComments = false;
    };
    PostComponent.prototype.AddComment = function () {
        var _this = this;
        var formValue = this.commentForm.value;
        if (formValue) {
            formValue.userTag = localStorage.getItem('userId');
            this.commentService.sendComment(this.postId, formValue)
                .subscribe(function () {
                _this.openComments();
            });
        }
        else {
            console.log("veuillez rentré un commentaire");
        }
    };
    // Option Like
    PostComponent.prototype.onLiked = function () {
        var _this = this;
        this.postService.addLike(this.postId, localStorage.getItem('userId'))
            .subscribe(function () {
            if (_this.isLiked == true) {
                _this.isLiked = false;
            }
            if (_this.isLiked == false) {
                _this.isLiked = true;
            }
            _this.articleComponent.ngOnInit();
        });
    };
    PostComponent.prototype.onDisliked = function () {
        var _this = this;
        this.postService.addDislike(this.postId, localStorage.getItem('userId'))
            .subscribe(function () {
            if (_this.isDisliked == true) {
                _this.isDisliked = false;
            }
            if (_this.isDisliked == false) {
                _this.isDisliked = true;
            }
            _this.articleComponent.ngOnInit();
        });
    };
    PostComponent.prototype.deletePost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.postService.deletePost(this.postId)
                    .subscribe(function () {
                    _this.articleComponent.ngOnInit();
                });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.Input()
    ], PostComponent.prototype, "postId");
    __decorate([
        core_1.Input()
    ], PostComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], PostComponent.prototype, "content");
    __decorate([
        core_1.Input()
    ], PostComponent.prototype, "categorie");
    __decorate([
        core_1.Input()
    ], PostComponent.prototype, "attachement");
    __decorate([
        core_1.Input()
    ], PostComponent.prototype, "likes");
    __decorate([
        core_1.Input()
    ], PostComponent.prototype, "dislikes");
    __decorate([
        core_1.Input()
    ], PostComponent.prototype, "createdUserId");
    PostComponent = __decorate([
        core_1.Component({
            selector: 'app-post',
            templateUrl: './post.component.html',
            styleUrls: ['./post.component.scss']
        })
    ], PostComponent);
    return PostComponent;
}());
exports.PostComponent = PostComponent;
