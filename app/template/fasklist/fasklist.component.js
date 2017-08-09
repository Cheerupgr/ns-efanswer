"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var fasks_service_1 = require("../../service/fasks/fasks.service");
var globals_1 = require("../../globals/globals");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var FasklistComponent = (function () {
    function FasklistComponent(router, fasksService, activeRoute) {
        this.router = router;
        this.fasksService = fasksService;
        this.activeRoute = activeRoute;
        this.fasks = [];
        this.page = 0;
        this.indicator = new nativescript_loading_indicator_1.LoadingIndicator();
    }
    FasklistComponent.prototype.ngAfterViewInit = function () {
    };
    FasklistComponent.prototype.ngOnInit = function () {
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
    FasklistComponent.prototype.onLoadMoreItemsRequested = function (args) {
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
    FasklistComponent.prototype.showLoading = function (msg) {
        // this.loading.show = true;
        this.indicator.show({
            message: msg
        });
    };
    FasklistComponent.prototype.hideLoading = function () {
        // this.loading.show = false;
        this.indicator.hide();
    };
    FasklistComponent.prototype.onPullToRefreshInitiated = function (args) {
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
    FasklistComponent.prototype.initRecordFiles = function () {
        globals_1.GlobalSettings.audio_file = "";
        globals_1.GlobalSettings.video_file = "";
    };
    FasklistComponent.prototype.onFanswer = function (args) {
        var selected_id = args.object.thisitem;
        globals_1.GlobalSettings.question_id = selected_id;
        var item = this.fasks.filter(function (fask) { return fask.question_id == selected_id; })[0];
        this.initRecordFiles();
        this.navigationExtras = {
            queryParams: {
                "parent_list": "all",
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
    FasklistComponent.prototype.onComment = function (args) {
        var selected_id = args.object.thisitem;
        globals_1.GlobalSettings.question_id = selected_id;
        var item = this.fasks.filter(function (fask) { return fask.question_id == selected_id; })[0];
        this.navigationExtras = {
            queryParams: {
                "parent_list": "all",
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
    FasklistComponent.prototype.onLike = function (args) {
        var selected_id = args.object.thisitem;
        globals_1.GlobalSettings.question_id = selected_id;
        var item = this.fasks.filter(function (fask) { return fask.question_id == selected_id; })[0];
    };
    return FasklistComponent;
}());
FasklistComponent = __decorate([
    core_1.Component({
        selector: "fasklist",
        templateUrl: "template/fasklist/fasklist.html",
        styleUrls: ["template/fasklist/fasklist.css"]
    })
    // >> listview-getting-started-angular
    ,
    __metadata("design:paramtypes", [router_1.Router, fasks_service_1.FasksService,
        router_1.ActivatedRoute])
], FasklistComponent);
exports.FasklistComponent = FasklistComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFza2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFza2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUEyRTtBQUszRSxtRUFBaUU7QUFDakUsaURBQXVEO0FBQ3ZELGlGQUFrRTtBQVFsRSxJQUFhLGlCQUFpQjtJQU81QiwyQkFBb0IsTUFBYyxFQUFVLFlBQTBCLEVBQzVELFdBQTJCO1FBRGpCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUM1RCxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFQN0IsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBT3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCwyQ0FBZSxHQUFmO0lBQ0EsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDekMsS0FBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLHdCQUFjLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7YUFDL0UsU0FBUyxDQUFDLFVBQUEsR0FBRztZQUNaLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQzNDLENBQUMsRUFBRSxVQUFBLEdBQUc7WUFDSixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sb0RBQXdCLEdBQS9CLFVBQWdDLElBQXVCO1FBQXZELGlCQWNDO1FBYkMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxRQUFRLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsd0JBQWMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzthQUMvRSxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQzNDLENBQUM7WUFDRCxRQUFRLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUN4QyxDQUFDLEVBQUUsVUFBQSxHQUFHO1lBQ0osS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDakMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFhLEdBQVc7UUFDdEIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLE9BQU8sRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDRSw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sb0RBQXdCLEdBQS9CLFVBQWdDLElBQXVCO1FBQXZELGlCQWdCQztRQWZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0QsSUFBSSxRQUFRLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsd0JBQWMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzthQUMvRSxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQzNDLENBQUM7WUFDRCxRQUFRLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUN6QyxDQUFDLEVBQUUsVUFBQSxHQUFHO1lBQ0osS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDakMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMkNBQWUsR0FBZjtRQUNFLHdCQUFjLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMvQix3QkFBYyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLHFDQUFTLEdBQWhCLFVBQWtCLElBQUk7UUFDcEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDdkMsd0JBQWMsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBRXpDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFdBQVcsSUFBSSxXQUFXLEVBQS9CLENBQStCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3RCLFdBQVcsRUFBRTtnQkFDWCxhQUFhLEVBQUUsS0FBSztnQkFDcEIsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQzdCO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUNsQjtZQUNFLE9BQU8sRUFBRTtnQkFDUCxPQUFPLEVBQUU7b0JBQ1AsVUFBVSxFQUFDLENBQUMsU0FBUyxDQUFDO2lCQUN2QjthQUNGO1NBQ0YsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQ3pCLENBQUM7SUFDSixDQUFDO0lBRU0scUNBQVMsR0FBaEIsVUFBa0IsSUFBSTtRQUNwQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN2Qyx3QkFBYyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFFekMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUN0QixXQUFXLEVBQUU7Z0JBQ1gsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzthQUM3QjtTQUNGLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDbEI7WUFDRSxNQUFNLEVBQUU7Z0JBQ04sT0FBTyxFQUFFO29CQUNQLFVBQVUsRUFBQyxDQUFDLFlBQVksQ0FBQztpQkFDMUI7YUFDRjtTQUNGLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUN6QixDQUFDO0lBQ0osQ0FBQztJQUVNLGtDQUFNLEdBQWIsVUFBZSxJQUFJO1FBQ2pCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLHdCQUFjLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUV6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxFQUEvQixDQUErQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQTFJRCxJQTBJQztBQTFJWSxpQkFBaUI7SUFON0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7S0FDOUMsQ0FBQztJQUNGLHNDQUFzQzs7cUNBUVIsZUFBTSxFQUF3Qiw0QkFBWTtRQUMvQyx1QkFBYztHQVIxQixpQkFBaUIsQ0EwSTdCO0FBMUlZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBSYWRMaXN0VmlldywgTGlzdFZpZXdFdmVudERhdGEsIExpc3RWaWV3TG9hZE9uRGVtYW5kTW9kZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlld1wiO1xuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xuXG5pbXBvcnQgeyBGYXNrc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9mYXNrcy9mYXNrcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHbG9iYWxTZXR0aW5ncyB9IGZyb20gJy4uLy4uL2dsb2JhbHMvZ2xvYmFscyc7XG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZhc2tsaXN0XCIsXG4gIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlL2Zhc2tsaXN0L2Zhc2tsaXN0Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJ0ZW1wbGF0ZS9mYXNrbGlzdC9mYXNrbGlzdC5jc3NcIl1cbn0pXG4vLyA+PiBsaXN0dmlldy1nZXR0aW5nLXN0YXJ0ZWQtYW5ndWxhclxuZXhwb3J0IGNsYXNzIEZhc2tsaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBmYXNrczogYW55ID0gW107XG4gIHByaXZhdGUgcGFnZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBzdHJfdXNlOiBzdHJpbmc7XG4gIHByaXZhdGUgaW5kaWNhdG9yOiBMb2FkaW5nSW5kaWNhdG9yO1xuICBwcml2YXRlIG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBmYXNrc1NlcnZpY2U6IEZhc2tzU2VydmljZSxcbiAgICBwcml2YXRlIGFjdGl2ZVJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgICAgdGhpcy5pbmRpY2F0b3IgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hY3RpdmVSb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgdGhpcy5zdHJfdXNlID0gcGFyYW1zW1wic3RyX3VzZVwiXTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2hvd0xvYWRpbmcoXCJMb2FkaW5nLi4uXCIpO1xuICAgIHRoaXMuZmFza3NTZXJ2aWNlLmdldChHbG9iYWxTZXR0aW5ncy5hY2Nlc3NfdG9rZW4sIHRoaXMuc3RyX3VzZSwgdGhpcy5wYWdlICogMTApXG4gICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgdGhpcy5mYXNrcyA9IHJlcy5xdWVzdGlvbnMucXVlc3Rpb25fbGlzdDtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgYWxlcnQoXCJFcnJvci4gcGxlYXNlIHRyeSBsYXRlclwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvbkxvYWRNb3JlSXRlbXNSZXF1ZXN0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICB0aGlzLnBhZ2UrKztcbiAgICBsZXQgbGlzdFZpZXc6IFJhZExpc3RWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgdGhpcy5mYXNrc1NlcnZpY2UuZ2V0KEdsb2JhbFNldHRpbmdzLmFjY2Vzc190b2tlbiwgdGhpcy5zdHJfdXNlLCB0aGlzLnBhZ2UgKiAxMClcbiAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLnF1ZXN0aW9ucy5xdWVzdGlvbl9saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5mYXNrcyA9IFtdO1xuICAgICAgICB0aGlzLmZhc2tzID0gcmVzLnF1ZXN0aW9ucy5xdWVzdGlvbl9saXN0O1xuICAgICAgfVxuICAgICAgbGlzdFZpZXcubm90aWZ5TG9hZE9uRGVtYW5kRmluaXNoZWQoKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgYWxlcnQoXCJFcnJvci4gcGxlYXNlIHRyeSBsYXRlclwiKTtcbiAgICAgIGxpc3RWaWV3Lm5vdGlmeUxvYWRPbkRlbWFuZEZpbmlzaGVkKCk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93TG9hZGluZyAobXNnOiBzdHJpbmcpIHtcbiAgICAvLyB0aGlzLmxvYWRpbmcuc2hvdyA9IHRydWU7XG4gICAgdGhpcy5pbmRpY2F0b3Iuc2hvdyh7XG4gICAgICBtZXNzYWdlOiBtc2dcbiAgICB9KTtcbiAgfVxuXG4gIGhpZGVMb2FkaW5nICgpIHtcbiAgICAvLyB0aGlzLmxvYWRpbmcuc2hvdyA9IGZhbHNlO1xuICAgIHRoaXMuaW5kaWNhdG9yLmhpZGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBvblB1bGxUb1JlZnJlc2hJbml0aWF0ZWQoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICBpZiAodGhpcy5wYWdlID4gMCkge1xuICAgICAgdGhpcy5wYWdlLS07XG4gICAgfVxuICAgIGxldCBsaXN0VmlldzogUmFkTGlzdFZpZXcgPSBhcmdzLm9iamVjdDtcbiAgICB0aGlzLmZhc2tzU2VydmljZS5nZXQoR2xvYmFsU2V0dGluZ3MuYWNjZXNzX3Rva2VuLCB0aGlzLnN0cl91c2UsIHRoaXMucGFnZSAqIDEwKVxuICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIGlmIChyZXMucXVlc3Rpb25zLnF1ZXN0aW9uX2xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZhc2tzID0gW107XG4gICAgICAgIHRoaXMuZmFza3MgPSByZXMucXVlc3Rpb25zLnF1ZXN0aW9uX2xpc3Q7XG4gICAgICB9XG4gICAgICBsaXN0Vmlldy5ub3RpZnlQdWxsVG9SZWZyZXNoRmluaXNoZWQoKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgYWxlcnQoXCJFcnJvci4gcGxlYXNlIHRyeSBsYXRlclwiKTtcbiAgICAgIGxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdFJlY29yZEZpbGVzICgpIHtcbiAgICBHbG9iYWxTZXR0aW5ncy5hdWRpb19maWxlID0gXCJcIjtcbiAgICBHbG9iYWxTZXR0aW5ncy52aWRlb19maWxlID0gXCJcIjtcbiAgfVxuXG4gIHB1YmxpYyBvbkZhbnN3ZXIgKGFyZ3MpIHtcbiAgICB2YXIgc2VsZWN0ZWRfaWQgPSBhcmdzLm9iamVjdC50aGlzaXRlbTtcbiAgICBHbG9iYWxTZXR0aW5ncy5xdWVzdGlvbl9pZCA9IHNlbGVjdGVkX2lkO1xuXG4gICAgdmFyIGl0ZW0gPSB0aGlzLmZhc2tzLmZpbHRlcihmYXNrID0+IGZhc2sucXVlc3Rpb25faWQgPT0gc2VsZWN0ZWRfaWQpWzBdO1xuXG4gICAgdGhpcy5pbml0UmVjb3JkRmlsZXMoKTtcblxuICAgIHRoaXMubmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIFwicGFyZW50X2xpc3RcIjogXCJhbGxcIixcbiAgICAgICAgXCJpdGVtXCI6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFxuICAgICAgW1xuICAgICAgICBcIi9tYWluXCIsIHtcbiAgICAgICAgICBvdXRsZXRzOiB7XG4gICAgICAgICAgICBtYWlub3V0bGV0OlsnZmFuc3dlciddXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLCB0aGlzLm5hdmlnYXRpb25FeHRyYXNcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG9uQ29tbWVudCAoYXJncykge1xuICAgIHZhciBzZWxlY3RlZF9pZCA9IGFyZ3Mub2JqZWN0LnRoaXNpdGVtO1xuICAgIEdsb2JhbFNldHRpbmdzLnF1ZXN0aW9uX2lkID0gc2VsZWN0ZWRfaWQ7XG5cbiAgICB2YXIgaXRlbSA9IHRoaXMuZmFza3MuZmlsdGVyKGZhc2sgPT4gZmFzay5xdWVzdGlvbl9pZCA9PSBzZWxlY3RlZF9pZClbMF07XG5cbiAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICBcInBhcmVudF9saXN0XCI6IFwiYWxsXCIsXG4gICAgICAgIFwiaXRlbVwiOiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcbiAgICAgIFtcbiAgICAgICAgXCJtYWluXCIsIHtcbiAgICAgICAgICBvdXRsZXRzOiB7XG4gICAgICAgICAgICBtYWlub3V0bGV0OlsnYWRkY29tbWVudCddXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLCB0aGlzLm5hdmlnYXRpb25FeHRyYXNcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG9uTGlrZSAoYXJncykge1xuICAgIHZhciBzZWxlY3RlZF9pZCA9IGFyZ3Mub2JqZWN0LnRoaXNpdGVtO1xuICAgIEdsb2JhbFNldHRpbmdzLnF1ZXN0aW9uX2lkID0gc2VsZWN0ZWRfaWQ7XG5cbiAgICB2YXIgaXRlbSA9IHRoaXMuZmFza3MuZmlsdGVyKGZhc2sgPT4gZmFzay5xdWVzdGlvbl9pZCA9PSBzZWxlY3RlZF9pZClbMF07XG4gIH1cbn1cbiJdfQ==