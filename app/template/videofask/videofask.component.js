"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var fasks_service_1 = require("../../service/fasks/fasks.service");
var globals_1 = require("../../globals/globals");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var VideofaskComponent = (function () {
    function VideofaskComponent(router, fasksService, activeRoute) {
        this.router = router;
        this.fasksService = fasksService;
        this.activeRoute = activeRoute;
        this.fasks = [];
        this.page = 0;
        this.indicator = new nativescript_loading_indicator_1.LoadingIndicator();
    }
    VideofaskComponent.prototype.ngAfterViewInit = function () {
    };
    VideofaskComponent.prototype.ngOnInit = function () {
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
    VideofaskComponent.prototype.showLoading = function (msg) {
        // this.loading.show = true;
        this.indicator.show({
            message: msg
        });
    };
    VideofaskComponent.prototype.hideLoading = function () {
        // this.loading.show = false;
        this.indicator.hide();
    };
    VideofaskComponent.prototype.onLoadMoreItemsRequested = function (args) {
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
    VideofaskComponent.prototype.onPullToRefreshInitiated = function (args) {
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
    VideofaskComponent.prototype.onFanswer = function (args) {
        var selected_id = args.object.thisitem;
        var item = this.fasks.filter(function (fask) { return fask.question_id == selected_id; })[0];
        this.navigationExtras = {
            queryParams: {
                "parent_list": "video",
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
    VideofaskComponent.prototype.onComment = function (args) {
        var selected_id = args.object.thisitem;
        var item = this.fasks.filter(function (fask) { return fask.question_id == selected_id; })[0];
        this.navigationExtras = {
            queryParams: {
                "parent_list": "video",
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
    VideofaskComponent.prototype.onLike = function (item) {
        console.log(item);
    };
    return VideofaskComponent;
}());
VideofaskComponent = __decorate([
    core_1.Component({
        selector: "videofask",
        templateUrl: "template/videofask/videofask.html",
        styleUrls: ["template/videofask/videofask.css"]
    })
    // >> listview-getting-started-angular
    ,
    __metadata("design:paramtypes", [router_1.Router, fasks_service_1.FasksService,
        router_1.ActivatedRoute])
], VideofaskComponent);
exports.VideofaskComponent = VideofaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9mYXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZGVvZmFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQTJFO0FBSTNFLG1FQUFpRTtBQUNqRSxpREFBdUQ7QUFFdkQsaUZBQWtFO0FBUWxFLElBQWEsa0JBQWtCO0lBTzdCLDRCQUFvQixNQUFjLEVBQVUsWUFBMEIsRUFDNUQsV0FBMkI7UUFEakIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzVELGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQVA3QixVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFPckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUE7SUFDM0MsQ0FBQztJQUVELDRDQUFlLEdBQWY7SUFDQSxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUFBLGlCQWNDO1FBYkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUN6QyxLQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsd0JBQWMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzthQUMvRSxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ1osS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDM0MsQ0FBQyxFQUFFLFVBQUEsR0FB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QixXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO0tBQ2hELENBQUM7SUFDRixzQ0FBc0M7O3FDQVFSLGVBQU0sRUFBd0IsNEJBQVk7UUFDL0MsdUJBQWM7R0FSMUIsa0JBQWtCLENBNEg5QjtBQTVIWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgUmFkTGlzdFZpZXcsIExpc3RWaWV3RXZlbnREYXRhLCBMaXN0Vmlld0xvYWRPbkRlbWFuZE1vZGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXdcIjtcblxuaW1wb3J0IHsgRmFza3NTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvZmFza3MvZmFza3Muc2VydmljZVwiO1xuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9nbG9iYWxzL2dsb2JhbHMnO1xuXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInZpZGVvZmFza1wiLFxuICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZS92aWRlb2Zhc2svdmlkZW9mYXNrLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJ0ZW1wbGF0ZS92aWRlb2Zhc2svdmlkZW9mYXNrLmNzc1wiXVxufSlcbi8vID4+IGxpc3R2aWV3LWdldHRpbmctc3RhcnRlZC1hbmd1bGFyXG5leHBvcnQgY2xhc3MgVmlkZW9mYXNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBmYXNrczogYW55ID0gW107XG4gIHByaXZhdGUgcGFnZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBzdHJfdXNlOiBzdHJpbmc7XG4gIHByaXZhdGUgaW5kaWNhdG9yOiBMb2FkaW5nSW5kaWNhdG9yO1xuICBwcml2YXRlIG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBmYXNrc1NlcnZpY2U6IEZhc2tzU2VydmljZSxcbiAgICBwcml2YXRlIGFjdGl2ZVJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgICAgdGhpcy5pbmRpY2F0b3IgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjdGl2ZVJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICB0aGlzLnN0cl91c2UgPSBwYXJhbXNbXCJzdHJfdXNlXCJdO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zaG93TG9hZGluZyhcIkxvYWRpbmcuLi5cIik7XG4gICAgdGhpcy5mYXNrc1NlcnZpY2UuZ2V0KEdsb2JhbFNldHRpbmdzLmFjY2Vzc190b2tlbiwgdGhpcy5zdHJfdXNlLCB0aGlzLnBhZ2UgKiAxMClcbiAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgICB0aGlzLmZhc2tzID0gcmVzLnF1ZXN0aW9ucy5xdWVzdGlvbl9saXN0O1xuICAgIH0sIGVyciA9PiB7XG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgICBhbGVydChcIkVycm9yLiBwbGVhc2UgdHJ5IGxhdGVyXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd0xvYWRpbmcgKG1zZzogc3RyaW5nKSB7XG4gICAgLy8gdGhpcy5sb2FkaW5nLnNob3cgPSB0cnVlO1xuICAgIHRoaXMuaW5kaWNhdG9yLnNob3coe1xuICAgICAgbWVzc2FnZTogbXNnXG4gICAgfSk7XG4gIH1cblxuICBoaWRlTG9hZGluZyAoKSB7XG4gICAgLy8gdGhpcy5sb2FkaW5nLnNob3cgPSBmYWxzZTtcbiAgICB0aGlzLmluZGljYXRvci5oaWRlKCk7XG4gIH1cblxuICBwdWJsaWMgb25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgdGhpcy5wYWdlKys7XG4gICAgbGV0IGxpc3RWaWV3OiBSYWRMaXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgIHRoaXMuZmFza3NTZXJ2aWNlLmdldChHbG9iYWxTZXR0aW5ncy5hY2Nlc3NfdG9rZW4sIHRoaXMuc3RyX3VzZSwgdGhpcy5wYWdlICogMTApXG4gICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5xdWVzdGlvbnMucXVlc3Rpb25fbGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZmFza3MgPSBbXTtcbiAgICAgICAgdGhpcy5mYXNrcyA9IHJlcy5xdWVzdGlvbnMucXVlc3Rpb25fbGlzdDtcbiAgICAgIH1cbiAgICAgIGxpc3RWaWV3Lm5vdGlmeUxvYWRPbkRlbWFuZEZpbmlzaGVkKCk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIGFsZXJ0KFwiRXJyb3IuIHBsZWFzZSB0cnkgbGF0ZXJcIik7XG4gICAgICBsaXN0Vmlldy5ub3RpZnlMb2FkT25EZW1hbmRGaW5pc2hlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uUHVsbFRvUmVmcmVzaEluaXRpYXRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgIGlmICh0aGlzLnBhZ2UgPiAwKSB7XG4gICAgICB0aGlzLnBhZ2UtLTtcbiAgICB9XG4gICAgbGV0IGxpc3RWaWV3OiBSYWRMaXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgIHRoaXMuZmFza3NTZXJ2aWNlLmdldChHbG9iYWxTZXR0aW5ncy5hY2Nlc3NfdG9rZW4sIHRoaXMuc3RyX3VzZSwgdGhpcy5wYWdlICogMTApXG4gICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5xdWVzdGlvbnMucXVlc3Rpb25fbGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZmFza3MgPSBbXTtcbiAgICAgICAgdGhpcy5mYXNrcyA9IHJlcy5xdWVzdGlvbnMucXVlc3Rpb25fbGlzdDtcbiAgICAgIH1cbiAgICAgIGxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICBhbGVydChcIkVycm9yLiBwbGVhc2UgdHJ5IGxhdGVyXCIpO1xuICAgICAgbGlzdFZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25GYW5zd2VyIChhcmdzKSB7XG4gICAgdmFyIHNlbGVjdGVkX2lkID0gYXJncy5vYmplY3QudGhpc2l0ZW07XG4gICAgdmFyIGl0ZW0gPSB0aGlzLmZhc2tzLmZpbHRlcihmYXNrID0+IGZhc2sucXVlc3Rpb25faWQgPT0gc2VsZWN0ZWRfaWQpWzBdO1xuXG4gICAgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgXCJwYXJlbnRfbGlzdFwiOiBcInZpZGVvXCIsXG4gICAgICAgIFwiaXRlbVwiOiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcbiAgICAgIFtcbiAgICAgICAgXCIvbWFpblwiLCB7XG4gICAgICAgICAgb3V0bGV0czoge1xuICAgICAgICAgICAgbWFpbm91dGxldDpbJ2ZhbnN3ZXInXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSwgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvbW1lbnQgKGFyZ3MpIHtcbiAgICB2YXIgc2VsZWN0ZWRfaWQgPSBhcmdzLm9iamVjdC50aGlzaXRlbTtcbiAgICB2YXIgaXRlbSA9IHRoaXMuZmFza3MuZmlsdGVyKGZhc2sgPT4gZmFzay5xdWVzdGlvbl9pZCA9PSBzZWxlY3RlZF9pZClbMF07XG5cbiAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICBcInBhcmVudF9saXN0XCI6IFwidmlkZW9cIixcbiAgICAgICAgXCJpdGVtXCI6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFxuICAgICAgW1xuICAgICAgICBcIm1haW5cIiwge1xuICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgIG1haW5vdXRsZXQ6WydhZGRjb21tZW50J11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sIHRoaXMubmF2aWdhdGlvbkV4dHJhc1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25MaWtlIChpdGVtKSB7XG4gICAgY29uc29sZS5sb2coaXRlbSk7XG4gIH1cbn1cbiJdfQ==