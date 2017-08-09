"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var sideDrawerModule = require("nativescript-telerik-ui/sidedrawer");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var stardetail_service_1 = require("../../service/stardetail/stardetail.service");
var globals_1 = require("../../globals/globals");
var MainComponent = (function () {
    function MainComponent(router, _page, _changeDetectionRef, starDetailService) {
        this.router = router;
        this._page = _page;
        this._changeDetectionRef = _changeDetectionRef;
        this.starDetailService = starDetailService;
        this.background_image = "~/images/logo.png";
        this._page.on("loaded", this.onLoaded, this);
        this.title = "HOME";
    }
    MainComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    MainComponent.prototype.ngOnInit = function () {
        this.getDetails();
    };
    MainComponent.prototype.getDetails = function () {
        var _this = this;
        this.starDetailService.get(globals_1.GlobalSettings.access_token, globals_1.GlobalSettings.star_id)
            .subscribe(function (res) {
            _this.background_image = "http://developer.efanswer.com/" + res.star_details.background_image;
        }, function (err) {
            alert(JSON.stringify(err));
        });
    };
    MainComponent.prototype.onLoaded = function (args) {
        this._sideDrawerTransition = new sideDrawerModule.PushTransition();
    };
    Object.defineProperty(MainComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainComponent.prototype, "currentNotification", {
        get: function () {
            return this._currentNotification;
        },
        enumerable: true,
        configurable: true
    });
    MainComponent.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    MainComponent.prototype.onDrawerOpening = function () {
        console.log("Drawer opening");
        this._currentNotification = "Drawer opening";
    };
    MainComponent.prototype.onDrawerOpened = function () {
        console.log("Drawer opened");
        this._currentNotification = "Drawer opened";
    };
    MainComponent.prototype.onDrawerClosing = function () {
        console.log("Drawer closing");
        this._currentNotification = "Drawer closing";
    };
    MainComponent.prototype.onDrawerClosed = function () {
        console.log("Drawer closed");
        this._currentNotification = "Drawer closed";
    };
    MainComponent.prototype.showAllFask = function () {
        this.title = "ALL FASK";
        this.navigationExtras = {
            queryParams: {
                "str_use": "all"
            }
        };
        this.router.navigate([
            "main", {
                outlets: {
                    mainoutlet: ['fasklist']
                }
            }
        ], this.navigationExtras);
        this.drawer.closeDrawer();
    };
    MainComponent.prototype.showAllChapter = function () {
        this.title = "CHAPTER";
        this.navigationExtras = {
            queryParams: {
                "str_use": "chapterbook"
            }
        };
        this.router.navigate([
            "main", {
                outlets: {
                    mainoutlet: ['chapterfask']
                }
            }
        ], this.navigationExtras);
        this.drawer.closeDrawer();
    };
    MainComponent.prototype.showAllVerify = function () {
        this.title = "VERIFY";
        this.navigationExtras = {
            queryParams: {
                "str_use": "verify"
            }
        };
        this.router.navigate([
            "main", {
                outlets: {
                    mainoutlet: ['verifyfask']
                }
            }
        ], this.navigationExtras);
        this.drawer.closeDrawer();
    };
    MainComponent.prototype.showAllVFask = function () {
        this.title = "VIDEO FASK";
        this.navigationExtras = {
            queryParams: {
                "str_use": "video"
            }
        };
        this.router.navigate([
            "main", {
                outlets: {
                    mainoutlet: ['videofask']
                }
            }
        ], this.navigationExtras);
        this.drawer.closeDrawer();
    };
    MainComponent.prototype.showAllCelebration = function () {
        this.title = "CELEBRATION";
        this.drawer.closeDrawer();
    };
    MainComponent.prototype.logout = function () {
        this.router.navigate(["signin"]);
    };
    return MainComponent;
}());
__decorate([
    core_1.ViewChild(angular_1.RadSideDrawerComponent),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], MainComponent.prototype, "drawerComponent", void 0);
MainComponent = __decorate([
    core_1.Component({
        selector: "welcome",
        templateUrl: "template/main/main.html",
        styleUrls: ["template/main/main.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page,
        core_1.ChangeDetectorRef,
        stardetail_service_1.StarDetailService])
], MainComponent);
exports.MainComponent = MainComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RztBQUN4RywwQ0FBMkQ7QUFHM0QsZ0NBQStCO0FBRS9CLHFFQUF3RTtBQUN4RSxzRUFBb0c7QUFJcEcsa0ZBQWdGO0FBQ2hGLGlEQUF1RDtBQU92RCxJQUFhLGFBQWE7SUFPeEIsdUJBQW9CLE1BQWMsRUFBVSxLQUFXLEVBQzdDLG1CQUFzQyxFQUN0QyxpQkFBb0M7UUFGMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFDN0Msd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUN0QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTnZDLHFCQUFnQixHQUFXLG1CQUFtQixDQUFDO1FBUWxELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFLRCx1Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELGtDQUFVLEdBQVY7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsd0JBQWMsQ0FBQyxZQUFZLEVBQUUsd0JBQWMsQ0FBQyxPQUFPLENBQUM7YUFDOUUsU0FBUyxDQUFDLFVBQUEsR0FBRztZQUNaLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQ0FBZ0MsR0FBRyxH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YSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbmplY3RhYmxlLCBPbkluaXQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQWN0aW9uSXRlbSB9IGZyb20gXCJ1aS9hY3Rpb24tYmFyXCI7XG5pbXBvcnQgc2lkZURyYXdlck1vZHVsZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXInKTtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xuXG5pbXBvcnQgeyBUTlNGb250SWNvblNlcnZpY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtbmcyLWZvbnRpY29uJztcblxuaW1wb3J0IHsgU3RhckRldGFpbFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9zdGFyZGV0YWlsL3N0YXJkZXRhaWwuc2VydmljZVwiO1xuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9nbG9iYWxzL2dsb2JhbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwid2VsY29tZVwiLFxuICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZS9tYWluL21haW4uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInRlbXBsYXRlL21haW4vbWFpbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTWFpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgX2N1cnJlbnROb3RpZmljYXRpb246IHN0cmluZztcbiAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IHNpZGVEcmF3ZXJNb2R1bGUuRHJhd2VyVHJhbnNpdGlvbkJhc2U7XG4gIHB1YmxpYyBiYWNrZ3JvdW5kX2ltYWdlOiBzdHJpbmcgPSBcIn4vaW1hZ2VzL2xvZ28ucG5nXCI7XG4gIHByaXZhdGUgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcztcbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgc3RhckRldGFpbFNlcnZpY2U6IFN0YXJEZXRhaWxTZXJ2aWNlLFxuICApIHtcbiAgICAgIHRoaXMuX3BhZ2Uub24oXCJsb2FkZWRcIiwgdGhpcy5vbkxvYWRlZCwgdGhpcyk7XG4gICAgICB0aGlzLnRpdGxlID0gXCJIT01FXCI7XG4gIH1cblxuICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIHByaXZhdGUgZHJhd2VyOiBTaWRlRHJhd2VyVHlwZTtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICB0aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXREZXRhaWxzKCk7XG4gIH1cblxuICBnZXREZXRhaWxzICgpIHtcbiAgICB0aGlzLnN0YXJEZXRhaWxTZXJ2aWNlLmdldChHbG9iYWxTZXR0aW5ncy5hY2Nlc3NfdG9rZW4sIEdsb2JhbFNldHRpbmdzLnN0YXJfaWQpXG4gICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kX2ltYWdlID0gXCJodHRwOi8vZGV2ZWxvcGVyLmVmYW5zd2VyLmNvbS9cIiArIHJlcy5zdGFyX2RldGFpbHMuYmFja2dyb3VuZF9pbWFnZTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25Mb2FkZWQoYXJncykge1xuICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgc2lkZURyYXdlck1vZHVsZS5QdXNoVHJhbnNpdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBzaWRlRHJhd2VyTW9kdWxlLkRyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY3VycmVudE5vdGlmaWNhdGlvbigpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnROb3RpZmljYXRpb247XG4gIH1cblxuICBwdWJsaWMgb3BlbkRyYXdlcigpIHtcbiAgICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkRyYXdlck9wZW5pbmcoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkRyYXdlciBvcGVuaW5nXCIpO1xuICAgICAgdGhpcy5fY3VycmVudE5vdGlmaWNhdGlvbiA9IFwiRHJhd2VyIG9wZW5pbmdcIjtcbiAgfVxuXG4gIHB1YmxpYyBvbkRyYXdlck9wZW5lZCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRHJhd2VyIG9wZW5lZFwiKTtcbiAgICAgIHRoaXMuX2N1cnJlbnROb3RpZmljYXRpb24gPSBcIkRyYXdlciBvcGVuZWRcIjtcbiAgfVxuXG4gIHB1YmxpYyBvbkRyYXdlckNsb3NpbmcoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkRyYXdlciBjbG9zaW5nXCIpO1xuICAgICAgdGhpcy5fY3VycmVudE5vdGlmaWNhdGlvbiA9IFwiRHJhd2VyIGNsb3NpbmdcIjtcbiAgfVxuXG4gIHB1YmxpYyBvbkRyYXdlckNsb3NlZCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRHJhd2VyIGNsb3NlZFwiKTtcbiAgICAgIHRoaXMuX2N1cnJlbnROb3RpZmljYXRpb24gPSBcIkRyYXdlciBjbG9zZWRcIjtcbiAgfVxuXG4gIHB1YmxpYyBzaG93QWxsRmFzayAoKSB7XG4gICAgdGhpcy50aXRsZSA9IFwiQUxMIEZBU0tcIjtcbiAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICBcInN0cl91c2VcIjogXCJhbGxcIlxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFxuICAgICAgW1xuICAgICAgICBcIm1haW5cIiwge1xuICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgIG1haW5vdXRsZXQ6WydmYXNrbGlzdCddXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLCB0aGlzLm5hdmlnYXRpb25FeHRyYXNcbiAgICApO1xuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gIH1cblxuICBwdWJsaWMgc2hvd0FsbENoYXB0ZXIgKCkge1xuICAgIHRoaXMudGl0bGUgPSBcIkNIQVBURVJcIjtcbiAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICBcInN0cl91c2VcIjogXCJjaGFwdGVyYm9va1wiXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXG4gICAgICBbXG4gICAgICAgIFwibWFpblwiLCB7XG4gICAgICAgICAgb3V0bGV0czoge1xuICAgICAgICAgICAgbWFpbm91dGxldDpbJ2NoYXB0ZXJmYXNrJ11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sIHRoaXMubmF2aWdhdGlvbkV4dHJhc1xuICAgICk7XG4gICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93QWxsVmVyaWZ5ICgpIHtcbiAgICB0aGlzLnRpdGxlID0gXCJWRVJJRllcIjtcbiAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICBcInN0cl91c2VcIjogXCJ2ZXJpZnlcIlxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFxuICAgICAgW1xuICAgICAgICBcIm1haW5cIiwge1xuICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgIG1haW5vdXRsZXQ6Wyd2ZXJpZnlmYXNrJ11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sIHRoaXMubmF2aWdhdGlvbkV4dHJhc1xuICAgICk7XG4gICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93QWxsVkZhc2sgKCkge1xuICAgIHRoaXMudGl0bGUgPSBcIlZJREVPIEZBU0tcIjtcbiAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICBcInN0cl91c2VcIjogXCJ2aWRlb1wiXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXG4gICAgICBbXG4gICAgICAgIFwibWFpblwiLCB7XG4gICAgICAgICAgb3V0bGV0czoge1xuICAgICAgICAgICAgbWFpbm91dGxldDpbJ3ZpZGVvZmFzayddXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLCB0aGlzLm5hdmlnYXRpb25FeHRyYXNcbiAgICApO1xuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gIH1cblxuICBwdWJsaWMgc2hvd0FsbENlbGVicmF0aW9uICgpIHtcbiAgICB0aGlzLnRpdGxlID0gXCJDRUxFQlJBVElPTlwiO1xuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gIH1cblxuICBwdWJsaWMgbG9nb3V0KCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInNpZ25pblwiXSk7XG4gIH1cbn1cbiJdfQ==