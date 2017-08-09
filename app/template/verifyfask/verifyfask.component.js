"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var fasks_service_1 = require("../../service/fasks/fasks.service");
var globals_1 = require("../../globals/globals");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var VerifyfaskComponent = (function () {
    function VerifyfaskComponent(router, fasksService, activeRoute) {
        this.router = router;
        this.fasksService = fasksService;
        this.activeRoute = activeRoute;
        this.fasks = [];
        this.page = 0;
        this.indicator = new nativescript_loading_indicator_1.LoadingIndicator();
    }
    VerifyfaskComponent.prototype.ngAfterViewInit = function () {
    };
    VerifyfaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.queryParams.subscribe(function (params) {
            _this.str_use = params["str_use"];
        });
        this.showLoading("Loading...");
        this.fasksService.get(globals_1.GlobalSettings.access_token, this.str_use, this.page * 10)
            .subscribe(function (res) {
            _this.hideLoading();
            _this.fasks = res.questions.question_list;
        }, function (err) {
            _this.hideLoading();
            alert("Error. please try later");
        });
    };
    VerifyfaskComponent.prototype.showLoading = function (msg) {
        // this.loading.show = true;
        this.indicator.show({
            message: msg
        });
    };
    VerifyfaskComponent.prototype.hideLoading = function () {
        // this.loading.show = false;
        this.indicator.hide();
    };
    VerifyfaskComponent.prototype.onLoadMoreItemsRequested = function (args) {
        var _this = this;
        this.page++;
        var listView = args.object;
        this.fasksService.get(globals_1.GlobalSettings.access_token, this.str_use, this.page * 10)
            .subscribe(function (res) {
            if (res.questions.question_list.length > 0) {
                _this.fasks = [];
                _this.fasks = res.questions.question_list;
            }
            listView.notifyLoadOnDemandFinished();
        }, function (err) {
            alert("Error. please try later");
            listView.notifyLoadOnDemandFinished();
        });
    };
    VerifyfaskComponent.prototype.onPullToRefreshInitiated = function (args) {
        var _this = this;
        if (this.page > 0) {
            this.page--;
        }
        var listView = args.object;
        this.fasksService.get(globals_1.GlobalSettings.access_token, this.str_use, this.page * 10)
            .subscribe(function (res) {
            if (res.questions.question_list.length > 0) {
                _this.fasks = [];
                _this.fasks = res.questions.question_list;
            }
            listView.notifyPullToRefreshFinished();
        }, function (err) {
            alert("Error. please try later");
            listView.notifyPullToRefreshFinished();
        });
    };
    VerifyfaskComponent.prototype.onFanswer = function (args) {
        var selected_id = args.object.thisitem;
        var item = this.fasks.filter(function (fask) { return fask.question_id == selected_id; })[0];
        this.navigationExtras = {
            queryParams: {
                "parent_list": "verify",
                "item": JSON.stringify(item)
            }
        };
        this.router.navigate([
            "/main", {
                outlets: {
                    mainoutlet: ['fanswer']
                }
            }
        ], this.navigationExtras);
    };
    VerifyfaskComponent.prototype.onComment = function (args) {
        var selected_id = args.object.thisitem;
        var item = this.fasks.filter(function (fask) { return fask.question_id == selected_id; })[0];
        this.navigationExtras = {
            queryParams: {
                "parent_list": "verify",
                "item": JSON.stringify(item)
            }
        };
        this.router.navigate([
            "main", {
                outlets: {
                    mainoutlet: ['addcomment']
                }
            }
        ], this.navigationExtras);
    };
    VerifyfaskComponent.prototype.onLike = function (item) {
        console.log(item);
    };
    return VerifyfaskComponent;
}());
VerifyfaskComponent = __decorate([
    core_1.Component({
        selector: "verifyfask",
        templateUrl: "template/verifyfask/verifyfask.html",
        styleUrls: ["template/verifyfask/verifyfask.css"]
    })
    // >> listview-getting-started-angular
    ,
    __metadata("design:paramtypes", [router_1.Router, fasks_service_1.FasksService,
        router_1.ActivatedRoute])
], VerifyfaskComponent);
exports.VerifyfaskComponent = VerifyfaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5ZmFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2ZXJpZnlmYXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBMkU7QUFJM0UsbUVBQWlFO0FBQ2pFLGlEQUF1RDtBQUV2RCxpRkFBa0U7QUFRbEUsSUFBYSxtQkFBbUI7SUFPOUIsNkJBQW9CLE1BQWMsRUFBVSxZQUEwQixFQUM1RCxXQUEyQjtRQURqQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDNUQsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBUDdCLFVBQUssR0FBUSxFQUFFLENBQUM7UUFDaEIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQU9yQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsNkNBQWUsR0FBZjtJQUNBLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQUEsaUJBY0M7UUFiQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3pDLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2FBQy9FLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDWixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUMzQyxDQUFDLEVBQUUsVUFBQSxH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Q3RCLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsU0FBUyxFQUFFLENBQUMsb0NBQW9DLENBQUM7S0FDbEQsQ0FBQztJQUNGLHNDQUFzQzs7cUNBUVIsZUFBTSxFQUF3Qiw0QkFBWTtRQUMvQyx1QkFBYztHQVIxQixtQkFBbUIsQ0E0SC9CO0FBNUhZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBSYWRMaXN0VmlldywgTGlzdFZpZXdFdmVudERhdGEsIExpc3RWaWV3TG9hZE9uRGVtYW5kTW9kZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlld1wiO1xuXG5pbXBvcnQgeyBGYXNrc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9mYXNrcy9mYXNrcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHbG9iYWxTZXR0aW5ncyB9IGZyb20gJy4uLy4uL2dsb2JhbHMvZ2xvYmFscyc7XG5cbmltcG9ydCB7IExvYWRpbmdJbmRpY2F0b3IgfSBmcm9tICduYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwidmVyaWZ5ZmFza1wiLFxuICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZS92ZXJpZnlmYXNrL3ZlcmlmeWZhc2suaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInRlbXBsYXRlL3ZlcmlmeWZhc2svdmVyaWZ5ZmFzay5jc3NcIl1cbn0pXG4vLyA+PiBsaXN0dmlldy1nZXR0aW5nLXN0YXJ0ZWQtYW5ndWxhclxuZXhwb3J0IGNsYXNzIFZlcmlmeWZhc2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIGZhc2tzOiBhbnkgPSBbXTtcbiAgcHJpdmF0ZSBwYWdlOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHN0cl91c2U6IHN0cmluZztcbiAgcHJpdmF0ZSBpbmRpY2F0b3I6IExvYWRpbmdJbmRpY2F0b3I7XG4gIHByaXZhdGUgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGZhc2tzU2VydmljZTogRmFza3NTZXJ2aWNlLFxuICAgIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgICB0aGlzLmluZGljYXRvciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjdGl2ZVJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICB0aGlzLnN0cl91c2UgPSBwYXJhbXNbXCJzdHJfdXNlXCJdO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zaG93TG9hZGluZyhcIkxvYWRpbmcuLi5cIik7XG4gICAgdGhpcy5mYXNrc1NlcnZpY2UuZ2V0KEdsb2JhbFNldHRpbmdzLmFjY2Vzc190b2tlbiwgdGhpcy5zdHJfdXNlLCB0aGlzLnBhZ2UgKiAxMClcbiAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgICB0aGlzLmZhc2tzID0gcmVzLnF1ZXN0aW9ucy5xdWVzdGlvbl9saXN0O1xuICAgIH0sIGVyciA9PiB7XG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgICBhbGVydChcIkVycm9yLiBwbGVhc2UgdHJ5IGxhdGVyXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd0xvYWRpbmcgKG1zZzogc3RyaW5nKSB7XG4gICAgLy8gdGhpcy5sb2FkaW5nLnNob3cgPSB0cnVlO1xuICAgIHRoaXMuaW5kaWNhdG9yLnNob3coe1xuICAgICAgbWVzc2FnZTogbXNnXG4gICAgfSk7XG4gIH1cblxuICBoaWRlTG9hZGluZyAoKSB7XG4gICAgLy8gdGhpcy5sb2FkaW5nLnNob3cgPSBmYWxzZTtcbiAgICB0aGlzLmluZGljYXRvci5oaWRlKCk7XG4gIH1cblxuICBwdWJsaWMgb25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgdGhpcy5wYWdlKys7XG4gICAgbGV0IGxpc3RWaWV3OiBSYWRMaXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgIHRoaXMuZmFza3NTZXJ2aWNlLmdldChHbG9iYWxTZXR0aW5ncy5hY2Nlc3NfdG9rZW4sIHRoaXMuc3RyX3VzZSwgdGhpcy5wYWdlICogMTApXG4gICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5xdWVzdGlvbnMucXVlc3Rpb25fbGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZmFza3MgPSBbXTtcbiAgICAgICAgdGhpcy5mYXNrcyA9IHJlcy5xdWVzdGlvbnMucXVlc3Rpb25fbGlzdDtcbiAgICAgIH1cbiAgICAgIGxpc3RWaWV3Lm5vdGlmeUxvYWRPbkRlbWFuZEZpbmlzaGVkKCk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIGFsZXJ0KFwiRXJyb3IuIHBsZWFzZSB0cnkgbGF0ZXJcIik7XG4gICAgICBsaXN0Vmlldy5ub3RpZnlMb2FkT25EZW1hbmRGaW5pc2hlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uUHVsbFRvUmVmcmVzaEluaXRpYXRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgIGlmICh0aGlzLnBhZ2UgPiAwKSB7XG4gICAgICB0aGlzLnBhZ2UtLTtcbiAgICB9XG4gICAgbGV0IGxpc3RWaWV3OiBSYWRMaXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgIHRoaXMuZmFza3NTZXJ2aWNlLmdldChHbG9iYWxTZXR0aW5ncy5hY2Nlc3NfdG9rZW4sIHRoaXMuc3RyX3VzZSwgdGhpcy5wYWdlICogMTApXG4gICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5xdWVzdGlvbnMucXVlc3Rpb25fbGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZmFza3MgPSBbXTtcbiAgICAgICAgdGhpcy5mYXNrcyA9IHJlcy5xdWVzdGlvbnMucXVlc3Rpb25fbGlzdDtcbiAgICAgIH1cbiAgICAgIGxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICBhbGVydChcIkVycm9yLiBwbGVhc2UgdHJ5IGxhdGVyXCIpO1xuICAgICAgbGlzdFZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25GYW5zd2VyIChhcmdzKSB7XG4gICAgdmFyIHNlbGVjdGVkX2lkID0gYXJncy5vYmplY3QudGhpc2l0ZW07XG4gICAgdmFyIGl0ZW0gPSB0aGlzLmZhc2tzLmZpbHRlcihmYXNrID0+IGZhc2sucXVlc3Rpb25faWQgPT0gc2VsZWN0ZWRfaWQpWzBdO1xuXG4gICAgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgXCJwYXJlbnRfbGlzdFwiOiBcInZlcmlmeVwiLFxuICAgICAgICBcIml0ZW1cIjogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXG4gICAgICBbXG4gICAgICAgIFwiL21haW5cIiwge1xuICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgIG1haW5vdXRsZXQ6WydmYW5zd2VyJ11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sIHRoaXMubmF2aWdhdGlvbkV4dHJhc1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25Db21tZW50IChhcmdzKSB7XG4gICAgdmFyIHNlbGVjdGVkX2lkID0gYXJncy5vYmplY3QudGhpc2l0ZW07XG4gICAgdmFyIGl0ZW0gPSB0aGlzLmZhc2tzLmZpbHRlcihmYXNrID0+IGZhc2sucXVlc3Rpb25faWQgPT0gc2VsZWN0ZWRfaWQpWzBdO1xuXG4gICAgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgXCJwYXJlbnRfbGlzdFwiOiBcInZlcmlmeVwiLFxuICAgICAgICBcIml0ZW1cIjogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXG4gICAgICBbXG4gICAgICAgIFwibWFpblwiLCB7XG4gICAgICAgICAgb3V0bGV0czoge1xuICAgICAgICAgICAgbWFpbm91dGxldDpbJ2FkZGNvbW1lbnQnXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSwgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkxpa2UgKGl0ZW0pIHtcbiAgICBjb25zb2xlLmxvZyhpdGVtKTtcbiAgfVxufVxuIl19