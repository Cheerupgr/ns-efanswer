"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var fasks_service_1 = require("../../service/fasks/fasks.service");
var globals_1 = require("../../globals/globals");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var ChaptersComponent = (function () {
    function ChaptersComponent(router, fasksService, activeRoute) {
        this.router = router;
        this.fasksService = fasksService;
        this.activeRoute = activeRoute;
        this.fasks = [];
        this.page = 0;
        this.indicator = new nativescript_loading_indicator_1.LoadingIndicator();
    }
    ChaptersComponent.prototype.ngAfterViewInit = function () {
    };
    ChaptersComponent.prototype.ngOnInit = function () {
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
    ChaptersComponent.prototype.showLoading = function (msg) {
        // this.loading.show = true;
        this.indicator.show({
            message: msg
        });
    };
    ChaptersComponent.prototype.hideLoading = function () {
        // this.loading.show = false;
        this.indicator.hide();
    };
    ChaptersComponent.prototype.onFanswer = function (args) {
        var selected_id = args.object.thisitem;
        var item = this.fasks.filter(function (fask) { return fask.question_id == selected_id; })[0];
        this.navigationExtras = {
            queryParams: {
                "parent_list": "chapter",
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
    ChaptersComponent.prototype.onComment = function (args) {
        var selected_id = args.object.thisitem;
        var item = this.fasks.filter(function (fask) { return fask.question_id == selected_id; })[0];
        this.navigationExtras = {
            queryParams: {
                "parent_list": "chapter",
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
    ChaptersComponent.prototype.onLike = function (item) {
        console.log(item);
    };
    return ChaptersComponent;
}());
ChaptersComponent = __decorate([
    core_1.Component({
        selector: "chapterfask",
        templateUrl: "template/chapterfask/chapterfask.html",
        styleUrls: ["template/chapterfask/chapterfask.css"]
    })
    // >> listview-getting-started-angular
    ,
    __metadata("design:paramtypes", [router_1.Router, fasks_service_1.FasksService,
        router_1.ActivatedRoute])
], ChaptersComponent);
exports.ChaptersComponent = ChaptersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcHRlcmZhc2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hhcHRlcmZhc2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUEyRTtBQUkzRSxtRUFBaUU7QUFDakUsaURBQXVEO0FBRXZELGlGQUFrRTtBQVFsRSxJQUFhLGlCQUFpQjtJQU81QiwyQkFBb0IsTUFBYyxFQUFVLFlBQTBCLEVBQzVELFdBQTJCO1FBRGpCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUM1RCxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFQN0IsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBT3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCwyQ0FBZSxHQUFmO0lBQ0EsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDekMsS0FBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLHdCQUFjLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7YUFDL0UsU0FBUyxDQUFDLFVBQUEsR0FBRztZQUNaLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQzNDLENBQUMsRUFBRSxVQUFBLEdBQUc7WUFDSixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFhLEdBQVc7UUFDdEIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLE9BQU8sRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDRSw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0scUNBQVMsR0FBaEIsVUFBa0IsSUFBSTtRQUNwQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxFQUEvQixDQUErQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3RCLFdBQVcsRUFBRTtnQkFDWCxhQUFhLEVBQUUsU0FBUztnQkFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQzdCO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUNsQjtZQUNFLE9BQU8sRUFBRTtnQkFDUCxPQUFPLEVBQUU7b0JBQ1AsVUFBVSxFQUFDLENBQUMsU0FBUyxDQUFDO2lCQUN2QjthQUNGO1NBQ0YsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQ3pCLENBQUM7SUFDSixDQUFDO0lBRU0scUNBQVMsR0FBaEIsVUFBa0IsSUFBSTtRQUNwQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxFQUEvQixDQUErQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3RCLFdBQVcsRUFBRTtnQkFDWCxhQUFhLEVBQUUsU0FBUztnQkFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQzdCO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUNsQjtZQUNFLE1BQU0sRUFBRTtnQkFDTixPQUFPLEVBQUU7b0JBQ1AsVUFBVSxFQUFDLENBQUMsWUFBWSxDQUFDO2lCQUMxQjthQUNGO1NBQ0YsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQ3pCLENBQUM7SUFDSixDQUFDO0lBRU0sa0NBQU0sR0FBYixVQUFlLElBQUk7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBMUZELElBMEZDO0FBMUZZLGlCQUFpQjtJQU43QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztLQUNwRCxDQUFDO0lBQ0Ysc0NBQXNDOztxQ0FRUixlQUFNLEVBQXdCLDRCQUFZO1FBQy9DLHVCQUFjO0dBUjFCLGlCQUFpQixDQTBGN0I7QUExRlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFJhZExpc3RWaWV3LCBMaXN0Vmlld0V2ZW50RGF0YSwgTGlzdFZpZXdMb2FkT25EZW1hbmRNb2RlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL2xpc3R2aWV3XCI7XG5cbmltcG9ydCB7IEZhc2tzU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2Zhc2tzL2Zhc2tzLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdsb2JhbFNldHRpbmdzIH0gZnJvbSAnLi4vLi4vZ2xvYmFscy9nbG9iYWxzJztcblxuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJjaGFwdGVyZmFza1wiLFxuICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZS9jaGFwdGVyZmFzay9jaGFwdGVyZmFzay5odG1sXCIsXG4gIHN0eWxlVXJsczogW1widGVtcGxhdGUvY2hhcHRlcmZhc2svY2hhcHRlcmZhc2suY3NzXCJdXG59KVxuLy8gPj4gbGlzdHZpZXctZ2V0dGluZy1zdGFydGVkLWFuZ3VsYXJcbmV4cG9ydCBjbGFzcyBDaGFwdGVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgZmFza3M6IGFueSA9IFtdO1xuICBwcml2YXRlIHBhZ2U6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc3RyX3VzZTogc3RyaW5nO1xuICBwcml2YXRlIGluZGljYXRvcjogTG9hZGluZ0luZGljYXRvcjtcbiAgcHJpdmF0ZSBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZmFza3NTZXJ2aWNlOiBGYXNrc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICAgIHRoaXMuaW5kaWNhdG9yID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWN0aXZlUm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgIHRoaXMuc3RyX3VzZSA9IHBhcmFtc1tcInN0cl91c2VcIl07XG4gICAgfSk7XG5cbiAgICB0aGlzLnNob3dMb2FkaW5nKFwiTG9hZGluZy4uLlwiKTtcbiAgICB0aGlzLmZhc2tzU2VydmljZS5nZXQoR2xvYmFsU2V0dGluZ3MuYWNjZXNzX3Rva2VuLCB0aGlzLnN0cl91c2UsIHRoaXMucGFnZSAqIDEwKVxuICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcbiAgICAgIHRoaXMuZmFza3MgPSByZXMucXVlc3Rpb25zLnF1ZXN0aW9uX2xpc3Q7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcbiAgICAgIGFsZXJ0KFwiRXJyb3IuIHBsZWFzZSB0cnkgbGF0ZXJcIik7XG4gICAgfSk7XG4gIH1cblxuICBzaG93TG9hZGluZyAobXNnOiBzdHJpbmcpIHtcbiAgICAvLyB0aGlzLmxvYWRpbmcuc2hvdyA9IHRydWU7XG4gICAgdGhpcy5pbmRpY2F0b3Iuc2hvdyh7XG4gICAgICBtZXNzYWdlOiBtc2dcbiAgICB9KTtcbiAgfVxuXG4gIGhpZGVMb2FkaW5nICgpIHtcbiAgICAvLyB0aGlzLmxvYWRpbmcuc2hvdyA9IGZhbHNlO1xuICAgIHRoaXMuaW5kaWNhdG9yLmhpZGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkZhbnN3ZXIgKGFyZ3MpIHtcbiAgICB2YXIgc2VsZWN0ZWRfaWQgPSBhcmdzLm9iamVjdC50aGlzaXRlbTtcbiAgICB2YXIgaXRlbSA9IHRoaXMuZmFza3MuZmlsdGVyKGZhc2sgPT4gZmFzay5xdWVzdGlvbl9pZCA9PSBzZWxlY3RlZF9pZClbMF07XG5cbiAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICBcInBhcmVudF9saXN0XCI6IFwiY2hhcHRlclwiLFxuICAgICAgICBcIml0ZW1cIjogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXG4gICAgICBbXG4gICAgICAgIFwiL21haW5cIiwge1xuICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgIG1haW5vdXRsZXQ6WydmYW5zd2VyJ11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sIHRoaXMubmF2aWdhdGlvbkV4dHJhc1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25Db21tZW50IChhcmdzKSB7XG4gICAgdmFyIHNlbGVjdGVkX2lkID0gYXJncy5vYmplY3QudGhpc2l0ZW07XG4gICAgdmFyIGl0ZW0gPSB0aGlzLmZhc2tzLmZpbHRlcihmYXNrID0+IGZhc2sucXVlc3Rpb25faWQgPT0gc2VsZWN0ZWRfaWQpWzBdO1xuXG4gICAgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgXCJwYXJlbnRfbGlzdFwiOiBcImNoYXB0ZXJcIixcbiAgICAgICAgXCJpdGVtXCI6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFxuICAgICAgW1xuICAgICAgICBcIm1haW5cIiwge1xuICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgIG1haW5vdXRsZXQ6WydhZGRjb21tZW50J11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sIHRoaXMubmF2aWdhdGlvbkV4dHJhc1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25MaWtlIChpdGVtKSB7XG4gICAgY29uc29sZS5sb2coaXRlbSk7XG4gIH1cbn1cbiJdfQ==