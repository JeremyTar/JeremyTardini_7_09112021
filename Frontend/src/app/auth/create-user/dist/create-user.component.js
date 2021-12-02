"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CreateUserComponent = /** @class */ (function () {
    function CreateUserComponent(formBuilder, userService, router, authComponent) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.router = router;
        this.authComponent = authComponent;
        this.hide = false;
    }
    CreateUserComponent.prototype.ngOnInit = function () {
        this.signupForm = this.formBuilder.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', forms_1.Validators.required],
            firstName: ['', forms_1.Validators.required],
            lastName: ['', forms_1.Validators.required]
        });
    };
    CreateUserComponent.prototype.onSignup = function () {
        var _this = this;
        var formValue = this.signupForm.value;
        console.log(formValue);
        this.userService.createUser(formValue)
            .subscribe(function (data) {
            localStorage.setItem('key', JSON.stringify(data));
            _this.userService.isAuth = true;
            var formValue = _this.signupForm.value;
            var email = formValue.email;
            var password = formValue.password;
            _this.userService.loginUser(email, password)
                .subscribe(function (data) {
                var splitData = data;
                var token = splitData.token;
                var userId = splitData.userId;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                _this.userService.isAuth = true;
                _this.router.navigate(['/main']);
            }, function (error) {
                _this.errorMsg = error.message;
                console.log(_this.errorMsg);
            });
            _this.router.navigate(['/']);
        }, function (error) {
            _this.errorMsg = error.message;
            console.log(_this.errorMsg);
        });
    };
    CreateUserComponent = __decorate([
        core_1.Component({
            selector: 'app-create-user',
            templateUrl: './create-user.component.html',
            styleUrls: ['./create-user.component.scss']
        })
    ], CreateUserComponent);
    return CreateUserComponent;
}());
exports.CreateUserComponent = CreateUserComponent;
