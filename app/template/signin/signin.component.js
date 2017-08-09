"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var user_service_1 = require("../../service/user/user.service");
var globals_1 = require("../../globals/globals");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var Toast = require("nativescript-toast");
var SigninComponent = (function () {
    // Your TypeScript logic goes here
    function SigninComponent(router, page, routerExtensions, userService) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.userService = userService;
        this.user = {};
        page.actionBarHidden = true;
        this.user = {
            email: "lorenzo.brach@sportsuite.it",
            password: "giorgio2017"
        };
        this.indicator = new nativescript_loading_indicator_1.LoadingIndicator();
    }
    SigninComponent.prototype.showLoading = function (msg) {
        // this.loading.show = true;
        this.indicator.show({
            message: msg
        });
    };
    SigninComponent.prototype.hideLoading = function () {
        // this.loading.show = false;
        this.indicator.hide();
    };
    SigninComponent.prototype.message = function (msg) {
        Toast.makeText(msg).show();
    };
    SigninComponent.prototype.checkLoginInfo = function () {
        var retVal = false;
        if (this.user.email && this.user.password) {
            retVal = true;
        }
        else {
            alert("Please input correct email address and password.");
        }
        return retVal;
    };
    SigninComponent.prototype.goMainScreen = function () {
        this.routerExtensions.navigate([
            "main"
        ], {
            clearHistory: true
        });
    };
    SigninComponent.prototype.passwordFieldLoaded = function (args) {
        var textF = args.object;
        textF.secure = true;
    };
    SigninComponent.prototype.signin = function () {
        var _this = this;
        var valid = this.checkLoginInfo();
        if (valid) {
            this.showLoading("Signing in...");
            this.userService
                .login(this.user)
                .subscribe(function (res) {
                _this.hideLoading();
                globals_1.GlobalSettings.access_token = res.token;
                globals_1.GlobalSettings.star_id = res.star_id;
                _this.message("You\'ve signed in successfully.");
                _this.goMainScreen();
            }, function (err) {
                _this.hideLoading();
                _this.message("Error. please try later");
            });
        }
    };
    SigninComponent.prototype.forgot = function () {
    };
    SigninComponent.prototype.signup = function () {
    };
    return SigninComponent;
}());
SigninComponent = __decorate([
    core_1.Component({
        selector: "signin",
        templateUrl: "template/signin/signin.html",
        styleUrls: ["template/signin/signin.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page, router_2.RouterExtensions, user_service_1.UserService])
], SigninComponent);
exports.SigninComponent = SigninComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ25pbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsMENBQXlDO0FBQ3pDLHNEQUEwRTtBQUUxRSxnQ0FBNkI7QUFJN0IsZ0VBQThEO0FBQzlELGlEQUF1RDtBQUV2RCxpRkFBa0U7QUFDbEUsMENBQTRDO0FBTzVDLElBQWEsZUFBZTtJQUcxQixrQ0FBa0M7SUFDbEMseUJBQW9CLE1BQWMsRUFBRSxJQUFVLEVBQVUsZ0JBQWtDLEVBQVUsV0FBd0I7UUFBeEcsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFzQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFINUgsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUliLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRTVCLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixLQUFLLEVBQUUsNkJBQTZCO1lBQ3BDLFFBQVEsRUFBRSxhQUFhO1NBQ3hCLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFhLEdBQVc7UUFDdEIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLE9BQU8sRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFTLEdBQVc7UUFDbEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsd0NBQWMsR0FBZDtRQUNFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsc0NBQVksR0FBWjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQzVCO1lBQ0UsTUFBTTtTQUNQLEVBQ0Q7WUFDRSxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUNGLENBQUM7SUFDSixDQUFDO0lBRU0sNkNBQW1CLEdBQTFCLFVBQTRCLElBQUk7UUFDNUIsSUFBSSxLQUFLLEdBQXdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0MsS0FBSyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELGdDQUFNLEdBQU47UUFBQSxpQkFpQkM7UUFoQkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXO2lCQUNYLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNoQixTQUFTLENBQUMsVUFBQSxHQUFHO2dCQUNaLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsd0JBQWMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDeEMsd0JBQWMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztnQkFDckMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUNoRCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxFQUFFLFVBQUEsR0FBRztnQkFDSixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUM7SUFDSCxDQUFDO0lBRUQsZ0NBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCxnQ0FBTSxHQUFOO0lBRUEsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQXBGRCxJQW9GQztBQXBGWSxlQUFlO0lBTDNCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzFDLENBQUM7cUNBSzRCLGVBQU0sRUFBUSxXQUFJLEVBQTRCLHlCQUFnQixFQUF1QiwwQkFBVztHQUpqSCxlQUFlLENBb0YzQjtBQXBGWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zLCBQYWdlUm91dGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUTlNGb250SWNvblNlcnZpY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtbmcyLWZvbnRpY29uJztcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3VzZXIvdXNlclwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS91c2VyL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9nbG9iYWxzL2dsb2JhbHMnO1xuXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yJztcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzaWduaW5cIixcbiAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGUvc2lnbmluL3NpZ25pbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1widGVtcGxhdGUvc2lnbmluL3NpZ25pbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgU2lnbmluQ29tcG9uZW50IHtcbiAgdXNlcjogYW55ID0ge307XG4gIHByaXZhdGUgaW5kaWNhdG9yOiBMb2FkaW5nSW5kaWNhdG9yO1xuICAvLyBZb3VyIFR5cGVTY3JpcHQgbG9naWMgZ29lcyBoZXJlXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcbiAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cbiAgICB0aGlzLnVzZXIgPSB7XG4gICAgICBlbWFpbDogXCJsb3JlbnpvLmJyYWNoQHNwb3J0c3VpdGUuaXRcIixcbiAgICAgIHBhc3N3b3JkOiBcImdpb3JnaW8yMDE3XCJcbiAgICB9O1xuICAgIHRoaXMuaW5kaWNhdG9yID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbiAgfVxuXG4gIHNob3dMb2FkaW5nIChtc2c6IHN0cmluZykge1xuICAgIC8vIHRoaXMubG9hZGluZy5zaG93ID0gdHJ1ZTtcbiAgICB0aGlzLmluZGljYXRvci5zaG93KHtcbiAgICAgIG1lc3NhZ2U6IG1zZ1xuICAgIH0pO1xuICB9XG5cbiAgaGlkZUxvYWRpbmcgKCkge1xuICAgIC8vIHRoaXMubG9hZGluZy5zaG93ID0gZmFsc2U7XG4gICAgdGhpcy5pbmRpY2F0b3IuaGlkZSgpO1xuICB9XG5cbiAgbWVzc2FnZSAobXNnOiBzdHJpbmcpIHtcbiAgICBUb2FzdC5tYWtlVGV4dChtc2cpLnNob3coKTtcbiAgfVxuXG4gIGNoZWNrTG9naW5JbmZvICgpIHtcbiAgICB2YXIgcmV0VmFsID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy51c2VyLmVtYWlsICYmIHRoaXMudXNlci5wYXNzd29yZCkge1xuICAgICAgcmV0VmFsID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJQbGVhc2UgaW5wdXQgY29ycmVjdCBlbWFpbCBhZGRyZXNzIGFuZCBwYXNzd29yZC5cIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIGdvTWFpblNjcmVlbiAoKSB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFxuICAgICAgW1xuICAgICAgICBcIm1haW5cIlxuICAgICAgXSxcbiAgICAgIHtcbiAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXNzd29yZEZpZWxkTG9hZGVkIChhcmdzKXtcbiAgICAgIHZhciB0ZXh0RjpUZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgdGV4dEYuc2VjdXJlPXRydWU7XG4gIH1cblxuICBzaWduaW4gKCkge1xuICAgIHZhciB2YWxpZCA9IHRoaXMuY2hlY2tMb2dpbkluZm8oKTtcbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIHRoaXMuc2hvd0xvYWRpbmcoXCJTaWduaW5nIGluLi4uXCIpO1xuICAgICAgdGhpcy51c2VyU2VydmljZVxuICAgICAgICAgIC5sb2dpbih0aGlzLnVzZXIpXG4gICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgR2xvYmFsU2V0dGluZ3MuYWNjZXNzX3Rva2VuID0gcmVzLnRva2VuO1xuICAgICAgICAgICAgR2xvYmFsU2V0dGluZ3Muc3Rhcl9pZCA9IHJlcy5zdGFyX2lkO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlKFwiWW91XFwndmUgc2lnbmVkIGluIHN1Y2Nlc3NmdWxseS5cIik7XG4gICAgICAgICAgICB0aGlzLmdvTWFpblNjcmVlbigpO1xuICAgICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UoXCJFcnJvci4gcGxlYXNlIHRyeSBsYXRlclwiKTtcbiAgICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmb3Jnb3QgKCkge1xuXG4gIH1cblxuICBzaWdudXAgKCkge1xuXG4gIH1cbn1cbiJdfQ==