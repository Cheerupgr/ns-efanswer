"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var gestures_1 = require("ui/gestures");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var globals_1 = require("../../globals/globals");
var douponfeed_service_1 = require("../../service/douponfeed/douponfeed.service");
var docommentonfeed_service_1 = require("../../service/docommentonfeed/docommentonfeed.service");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var Toast = require("nativescript-toast");
var AddCommentComponent = (function () {
    function AddCommentComponent(page, router, activeRoute, douponfeedService, doCommentFeedService) {
        var _this = this;
        this.page = page;
        this.router = router;
        this.activeRoute = activeRoute;
        this.douponfeedService = douponfeedService;
        this.doCommentFeedService = doCommentFeedService;
        this.item = {};
        this.parent_list = "";
        this.activeRoute.queryParams.subscribe(function (params) {
            _this.item = JSON.parse(params["item"]);
            _this.parent_list = params["parent_list"];
        });
        this.indicator = new nativescript_loading_indicator_1.LoadingIndicator();
    }
    AddCommentComponent.prototype.ngAfterViewInit = function () {
    };
    AddCommentComponent.prototype.ngOnInit = function () {
        var textview = this.page.getViewById("textView");
        var layout = this.page.getViewById("layout");
        var observer = layout.observe(gestures_1.GestureTypes.tap, function (args) {
            console.log("Page Tapped");
            textview.dismissSoftInput();
        });
    };
    AddCommentComponent.prototype.showLoading = function (msg) {
        // this.loading.show = true;
        this.indicator.show({
            message: msg
        });
    };
    AddCommentComponent.prototype.hideLoading = function () {
        // this.loading.show = false;
        this.indicator.hide();
    };
    AddCommentComponent.prototype.message = function (msg) {
        Toast.makeText(msg).show();
    };
    AddCommentComponent.prototype.onFanswer = function (item) {
        this.navigationExtras = {
            queryParams: {
                "item": JSON.stringify(this.item)
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
    AddCommentComponent.prototype.onComment = function (item) {
        this.navigationExtras = {
            queryParams: {
                "item": JSON.stringify(this.item)
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
    AddCommentComponent.prototype.onLike = function (item) {
        var _this = this;
        this.showLoading("Saving...");
        this.douponfeedService
            .doupon(globals_1.GlobalSettings.access_token, this.item.question_id)
            .subscribe(function (res) {
            _this.hideLoading();
            _this.message("You liked this fask.");
            _this.backToList();
        }, function (err) {
            _this.hideLoading();
            _this.message("Error. Please try later.");
        });
    };
    AddCommentComponent.prototype.onCancel = function (item) {
        if (this.item.answer_text) {
            this.item.answer_text = "";
        }
        this.backToList();
    };
    AddCommentComponent.prototype.onOk = function (item) {
        var _this = this;
        this.showLoading("Saving...");
        if (this.item.answer_text) {
            this.doCommentFeedService
                .docomment(globals_1.GlobalSettings.access_token, this.item.question_id, this.item.answer_text)
                .subscribe(function (res) {
                _this.hideLoading();
                _this.message("You commented on this fask.");
                _this.backToList();
            }, function (err) {
                _this.hideLoading();
                _this.message("Error. Please try later.");
            });
        }
    };
    AddCommentComponent.prototype.backToList = function () {
        console.log(this.parent_list);
        if (this.parent_list == "all") {
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
        }
        if (this.parent_list == "video") {
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
        }
        if (this.parent_list == "verify") {
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
        }
        if (this.parent_list == "chapter") {
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
        }
    };
    return AddCommentComponent;
}());
AddCommentComponent = __decorate([
    core_1.Component({
        selector: "addcomment",
        templateUrl: "template/comment/addcomment.html",
        styleUrls: ["template/comment/addcomment.css"]
    })
    // >> listview-getting-started-angular
    ,
    __metadata("design:paramtypes", [page_1.Page, router_1.Router, router_1.ActivatedRoute,
        douponfeed_service_1.DouponFeedService, docommentonfeed_service_1.DoCommentFeedService])
], AddCommentComponent);
exports.AddCommentComponent = AddCommentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkY29tbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRjb21tZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCx3Q0FBNkQ7QUFDN0QsZ0NBQStCO0FBRy9CLDBDQUEyRTtBQUkzRSxpREFBdUQ7QUFDdkQsa0ZBQWdGO0FBQ2hGLGlHQUE2RjtBQUU3RixpRkFBa0U7QUFDbEUsMENBQTRDO0FBUTVDLElBQWEsbUJBQW1CO0lBTTlCLDZCQUFvQixJQUFVLEVBQVUsTUFBYyxFQUFVLFdBQTJCLEVBQ2pGLGlCQUFvQyxFQUFVLG9CQUEwQztRQURsRyxpQkFPQztRQVBtQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUNqRixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQU4xRixTQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ2YsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFNL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUMzQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsNkNBQWUsR0FBZjtJQUVBLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBRUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQVcsVUFBVSxDQUFDLENBQUM7UUFD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bE1ELElBa01DO0FBbE1ZLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFlBQVk7UUFDdEIsV0FBVyxFQUFFLGtDQUFrQztRQUMvQyxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztLQUMvQyxDQUFDO0lBQ0Ysc0NBQXNDOztxQ0FPVixXQUFJLEVBQWtCLGVBQU0sRUFBdUIsdUJBQWM7UUFDOUQsc0NBQWlCLEVBQWdDLDhDQUFvQjtHQVB2RixtQkFBbUIsQ0FrTS9CO0FBbE1ZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEdlc3R1cmVUeXBlcywgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiXG5pbXBvcnQgeyBUZXh0VmlldyB9IGZyb20gXCJ1aS90ZXh0LXZpZXdcIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBUTlNGb250SWNvblNlcnZpY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtbmcyLWZvbnRpY29uJztcblxuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9nbG9iYWxzL2dsb2JhbHMnO1xuaW1wb3J0IHsgRG91cG9uRmVlZFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlL2RvdXBvbmZlZWQvZG91cG9uZmVlZC5zZXJ2aWNlJztcbmltcG9ydCB7IERvQ29tbWVudEZlZWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZS9kb2NvbW1lbnRvbmZlZWQvZG9jb21tZW50b25mZWVkLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBMb2FkaW5nSW5kaWNhdG9yIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yJztcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJhZGRjb21tZW50XCIsXG4gIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlL2NvbW1lbnQvYWRkY29tbWVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1widGVtcGxhdGUvY29tbWVudC9hZGRjb21tZW50LmNzc1wiXVxufSlcbi8vID4+IGxpc3R2aWV3LWdldHRpbmctc3RhcnRlZC1hbmd1bGFyXG5leHBvcnQgY2xhc3MgQWRkQ29tbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgaXRlbTogYW55ID0ge307XG4gIHByaXZhdGUgcGFyZW50X2xpc3Q6IHN0cmluZyA9IFwiXCI7XG4gIHByaXZhdGUgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcztcbiAgcHJpdmF0ZSBpbmRpY2F0b3I6IExvYWRpbmdJbmRpY2F0b3I7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGFjdGl2ZVJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIGRvdXBvbmZlZWRTZXJ2aWNlOiBEb3Vwb25GZWVkU2VydmljZSwgcHJpdmF0ZSBkb0NvbW1lbnRGZWVkU2VydmljZTogRG9Db21tZW50RmVlZFNlcnZpY2UpIHtcbiAgICB0aGlzLmFjdGl2ZVJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgdGhpcy5pdGVtID0gSlNPTi5wYXJzZShwYXJhbXNbXCJpdGVtXCJdKTtcbiAgICAgIHRoaXMucGFyZW50X2xpc3QgPSBwYXJhbXNbXCJwYXJlbnRfbGlzdFwiXTtcbiAgICB9KTtcbiAgICB0aGlzLmluZGljYXRvciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdmFyIHRleHR2aWV3ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkPFRleHRWaWV3PihcInRleHRWaWV3XCIpO1xuICAgIHZhciBsYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQ8U3RhY2tMYXlvdXQ+KFwibGF5b3V0XCIpO1xuICAgIHZhciBvYnNlcnZlciA9IGxheW91dC5vYnNlcnZlKEdlc3R1cmVUeXBlcy50YXAsIGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFnZSBUYXBwZWRcIik7XG4gICAgICAgIHRleHR2aWV3LmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dMb2FkaW5nIChtc2c6IHN0cmluZykge1xuICAgIC8vIHRoaXMubG9hZGluZy5zaG93ID0gdHJ1ZTtcbiAgICB0aGlzLmluZGljYXRvci5zaG93KHtcbiAgICAgIG1lc3NhZ2U6IG1zZ1xuICAgIH0pO1xuICB9XG5cbiAgaGlkZUxvYWRpbmcgKCkge1xuICAgIC8vIHRoaXMubG9hZGluZy5zaG93ID0gZmFsc2U7XG4gICAgdGhpcy5pbmRpY2F0b3IuaGlkZSgpO1xuICB9XG5cbiAgbWVzc2FnZSAobXNnOiBzdHJpbmcpIHtcbiAgICBUb2FzdC5tYWtlVGV4dChtc2cpLnNob3coKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkZhbnN3ZXIgKGl0ZW0pIHtcbiAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICBcIml0ZW1cIjogSlNPTi5zdHJpbmdpZnkodGhpcy5pdGVtKVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcbiAgICAgIFtcbiAgICAgICAgXCIvbWFpblwiLCB7XG4gICAgICAgICAgb3V0bGV0czoge1xuICAgICAgICAgICAgbWFpbm91dGxldDpbJ2ZhbnN3ZXInXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSwgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvbW1lbnQgKGl0ZW0pIHtcbiAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICBcIml0ZW1cIjogSlNPTi5zdHJpbmdpZnkodGhpcy5pdGVtKVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcbiAgICAgIFtcbiAgICAgICAgXCJtYWluXCIsIHtcbiAgICAgICAgICBvdXRsZXRzOiB7XG4gICAgICAgICAgICBtYWlub3V0bGV0OlsnYWRkY29tbWVudCddXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLCB0aGlzLm5hdmlnYXRpb25FeHRyYXNcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG9uTGlrZSAoaXRlbSkge1xuICAgIHRoaXMuc2hvd0xvYWRpbmcoXCJTYXZpbmcuLi5cIik7XG4gICAgdGhpcy5kb3Vwb25mZWVkU2VydmljZVxuICAgIC5kb3Vwb24oR2xvYmFsU2V0dGluZ3MuYWNjZXNzX3Rva2VuLCB0aGlzLml0ZW0ucXVlc3Rpb25faWQpXG4gICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgdGhpcy5tZXNzYWdlKFwiWW91IGxpa2VkIHRoaXMgZmFzay5cIik7XG5cbiAgICAgIHRoaXMuYmFja1RvTGlzdCgpO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgICB0aGlzLm1lc3NhZ2UoXCJFcnJvci4gUGxlYXNlIHRyeSBsYXRlci5cIik7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBvbkNhbmNlbCAoaXRlbSkge1xuICAgIGlmICh0aGlzLml0ZW0uYW5zd2VyX3RleHQpIHtcbiAgICAgIHRoaXMuaXRlbS5hbnN3ZXJfdGV4dCA9IFwiXCI7XG4gICAgfVxuICAgIHRoaXMuYmFja1RvTGlzdCgpO1xuICB9XG5cbiAgcHVibGljIG9uT2sgKGl0ZW0pIHtcbiAgICB0aGlzLnNob3dMb2FkaW5nKFwiU2F2aW5nLi4uXCIpO1xuICAgIGlmICh0aGlzLml0ZW0uYW5zd2VyX3RleHQpIHtcbiAgICAgIHRoaXMuZG9Db21tZW50RmVlZFNlcnZpY2VcbiAgICAgIC5kb2NvbW1lbnQoR2xvYmFsU2V0dGluZ3MuYWNjZXNzX3Rva2VuLCB0aGlzLml0ZW0ucXVlc3Rpb25faWQsIHRoaXMuaXRlbS5hbnN3ZXJfdGV4dClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UoXCJZb3UgY29tbWVudGVkIG9uIHRoaXMgZmFzay5cIik7XG4gICAgICAgIHRoaXMuYmFja1RvTGlzdCgpO1xuICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UoXCJFcnJvci4gUGxlYXNlIHRyeSBsYXRlci5cIik7XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGJhY2tUb0xpc3QgKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucGFyZW50X2xpc3QpO1xuXG4gICAgaWYgKHRoaXMucGFyZW50X2xpc3QgPT0gXCJhbGxcIikge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgIFwic3RyX3VzZVwiOiBcImFsbFwiXG4gICAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXG4gICAgICAgIFtcbiAgICAgICAgICBcIm1haW5cIiwge1xuICAgICAgICAgICAgb3V0bGV0czoge1xuICAgICAgICAgICAgICBtYWlub3V0bGV0OlsnZmFza2xpc3QnXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSwgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudF9saXN0ID09IFwidmlkZW9cIikge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgIFwic3RyX3VzZVwiOiBcInZpZGVvXCJcbiAgICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcbiAgICAgICAgW1xuICAgICAgICAgIFwibWFpblwiLCB7XG4gICAgICAgICAgICBvdXRsZXRzOiB7XG4gICAgICAgICAgICAgIG1haW5vdXRsZXQ6Wyd2aWRlb2Zhc2snXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSwgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudF9saXN0ID09IFwidmVyaWZ5XCIpIHtcbiAgICAgIHRoaXMubmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICBcInN0cl91c2VcIjogXCJ2ZXJpZnlcIlxuICAgICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFxuICAgICAgICBbXG4gICAgICAgICAgXCJtYWluXCIsIHtcbiAgICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgICAgbWFpbm91dGxldDpbJ3ZlcmlmeWZhc2snXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSwgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudF9saXN0ID09IFwiY2hhcHRlclwiKSB7XG4gICAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgXCJzdHJfdXNlXCI6IFwiY2hhcHRlcmJvb2tcIlxuICAgICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFxuICAgICAgICBbXG4gICAgICAgICAgXCJtYWluXCIsIHtcbiAgICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgICAgbWFpbm91dGxldDpbJ2NoYXB0ZXJmYXNrJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF0sIHRoaXMubmF2aWdhdGlvbkV4dHJhc1xuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==