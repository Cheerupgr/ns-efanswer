"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var walkthroughs_service_1 = require("../../service/walkthroughs/walkthroughs.service");
var WelcomeComponent = (function () {
    // Your TypeScript logic goes here
    function WelcomeComponent(router, page, walkthroughService) {
        this.router = router;
        this.page = page;
        this.walkthroughService = walkthroughService;
        this.walkthroughs = [];
        this.indicators_width = 0;
        page.actionBarHidden = true;
        this.indicator = new nativescript_loading_indicator_1.LoadingIndicator();
    }
    WelcomeComponent.prototype.ngAfterViewInit = function () {
    };
    WelcomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading("Loading...");
        this.walkthroughService.get()
            .subscribe(function (res) {
            console.log(JSON.stringify(res.walkthroughs));
            _this.initWalkthroughs(res.walkthroughs);
            _this.startDescribe();
            _this.hideLoading();
        }, function (err) {
            console.log(err);
            _this.hideLoading();
        });
    };
    WelcomeComponent.prototype.showLoading = function (msg) {
        // this.loading.show = true;
        this.indicator.show({
            message: msg
        });
    };
    WelcomeComponent.prototype.hideLoading = function () {
        // this.loading.show = false;
        this.indicator.hide();
    };
    WelcomeComponent.prototype.initWalkthroughs = function (items) {
        this.walkthroughs = items;
        this.walkthrough_index = 0;
        this.walkthrough_count = this.walkthroughs.length;
        this.indicators_width = 30 * this.walkthrough_count;
    };
    WelcomeComponent.prototype.startDescribe = function () {
        var _this = this;
        this.walkthrough_text = this.walkthroughs[this.walkthrough_index].Text;
        setTimeout(function () {
            _this.walkthrough_index++;
            if (_this.walkthrough_index == _this.walkthrough_count) {
                _this.walkthrough_index = 0;
            }
            _this.startDescribe();
        }, 3000);
    };
    WelcomeComponent.prototype.getOpacity = function (index) {
        var retVal = 1.0;
        if (index == this.walkthrough_index) {
            retVal = 0.5;
        }
        return retVal;
    };
    WelcomeComponent.prototype.getStart = function () {
        this.router.navigate(["/signin"]);
    };
    return WelcomeComponent;
}());
WelcomeComponent = __decorate([
    core_1.Component({
        selector: "welcome",
        templateUrl: "template/welcome/welcome.html",
        styleUrls: ["template/welcome/welcome.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page, walkthroughs_service_1.WalkthroughsService])
], WelcomeComponent);
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VsY29tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWxjb21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0NBQTZCO0FBRzdCLGlGQUFrRTtBQUVsRSx3RkFBc0Y7QUFRdEYsSUFBYSxnQkFBZ0I7SUFRM0Isa0NBQWtDO0lBQ2xDLDBCQUFvQixNQUFjLEVBQVUsSUFBVSxFQUFVLGtCQUF1QztRQUFuRixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7UUFOL0YsaUJBQVksR0FBUSxFQUFFLENBQUM7UUFJeEIscUJBQWdCLEdBQVcsQ0FBQyxDQUFBO1FBR2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCwwQ0FBZSxHQUFmO0lBRUEsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFhQztRQVpDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRTthQUM1QixTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzlDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEMsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUUsVUFBQSxHQUFHO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQVcsR0FBWCxVQUFhLEdBQVc7UUFDdEIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLE9BQU8sRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFDRSw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsMkNBQWdCLEdBQWhCLFVBQWtCLEtBQUs7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFFbEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDdEQsQ0FBQztJQUVELHdDQUFhLEdBQWI7UUFBQSxpQkFTQztRQVJDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2RSxVQUFVLENBQUU7WUFDVixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLElBQUksS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDckQsS0FBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBQ0QsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTSxxQ0FBVSxHQUFqQixVQUFtQixLQUFLO1FBQ3RCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQTNFRCxJQTJFQztBQTNFWSxnQkFBZ0I7SUFONUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSwrQkFBK0I7UUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7S0FDNUMsQ0FBQztxQ0FXNEIsZUFBTSxFQUFnQixXQUFJLEVBQThCLDBDQUFtQjtHQVQ1RixnQkFBZ0IsQ0EyRTVCO0FBM0VZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XG5cbmltcG9ydCB7IExvYWRpbmdJbmRpY2F0b3IgfSBmcm9tICduYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3InO1xuXG5pbXBvcnQgeyBXYWxrdGhyb3VnaHNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2Uvd2Fsa3Rocm91Z2hzL3dhbGt0aHJvdWdocy5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJ3ZWxjb21lXCIsXG4gIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlL3dlbGNvbWUvd2VsY29tZS5odG1sXCIsXG4gIHN0eWxlVXJsczogW1widGVtcGxhdGUvd2VsY29tZS93ZWxjb21lLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFdlbGNvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHByaXZhdGUgaW5kaWNhdG9yOiBMb2FkaW5nSW5kaWNhdG9yO1xuICBwcml2YXRlIHdhbGt0aHJvdWdoczogYW55ID0gW107XG4gIHByaXZhdGUgd2Fsa3Rocm91Z2hfY291bnQ6IGFueTtcbiAgcHJpdmF0ZSB3YWxrdGhyb3VnaF9pbmRleDogYW55O1xuICBwdWJsaWMgd2Fsa3Rocm91Z2hfdGV4dDogc3RyaW5nO1xuICBwdWJsaWMgaW5kaWNhdG9yc193aWR0aDogbnVtYmVyID0gMFxuICAvLyBZb3VyIFR5cGVTY3JpcHQgbG9naWMgZ29lcyBoZXJlXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSB3YWxrdGhyb3VnaFNlcnZpY2U6IFdhbGt0aHJvdWdoc1NlcnZpY2UpIHtcbiAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5pbmRpY2F0b3IgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0ICgpIHtcblxuICB9XG5cbiAgbmdPbkluaXQgKCkge1xuICAgIHRoaXMuc2hvd0xvYWRpbmcoXCJMb2FkaW5nLi4uXCIpO1xuXG4gICAgdGhpcy53YWxrdGhyb3VnaFNlcnZpY2UuZ2V0KClcbiAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMud2Fsa3Rocm91Z2hzKSk7XG4gICAgICB0aGlzLmluaXRXYWxrdGhyb3VnaHMocmVzLndhbGt0aHJvdWdocyk7XG4gICAgICB0aGlzLnN0YXJ0RGVzY3JpYmUoKTtcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dMb2FkaW5nIChtc2c6IHN0cmluZykge1xuICAgIC8vIHRoaXMubG9hZGluZy5zaG93ID0gdHJ1ZTtcbiAgICB0aGlzLmluZGljYXRvci5zaG93KHtcbiAgICAgIG1lc3NhZ2U6IG1zZ1xuICAgIH0pO1xuICB9XG5cbiAgaGlkZUxvYWRpbmcgKCkge1xuICAgIC8vIHRoaXMubG9hZGluZy5zaG93ID0gZmFsc2U7XG4gICAgdGhpcy5pbmRpY2F0b3IuaGlkZSgpO1xuICB9XG5cbiAgaW5pdFdhbGt0aHJvdWdocyAoaXRlbXMpIHtcbiAgICB0aGlzLndhbGt0aHJvdWdocyA9IGl0ZW1zO1xuICAgIHRoaXMud2Fsa3Rocm91Z2hfaW5kZXggPSAwO1xuICAgIHRoaXMud2Fsa3Rocm91Z2hfY291bnQgPSB0aGlzLndhbGt0aHJvdWdocy5sZW5ndGg7XG5cbiAgICB0aGlzLmluZGljYXRvcnNfd2lkdGggPSAzMCAqIHRoaXMud2Fsa3Rocm91Z2hfY291bnQ7XG4gIH1cblxuICBzdGFydERlc2NyaWJlICgpIHtcbiAgICB0aGlzLndhbGt0aHJvdWdoX3RleHQgPSB0aGlzLndhbGt0aHJvdWdoc1t0aGlzLndhbGt0aHJvdWdoX2luZGV4XS5UZXh0O1xuICAgIHNldFRpbWVvdXQgKCgpID0+IHtcbiAgICAgIHRoaXMud2Fsa3Rocm91Z2hfaW5kZXgrKztcbiAgICAgIGlmICh0aGlzLndhbGt0aHJvdWdoX2luZGV4ID09IHRoaXMud2Fsa3Rocm91Z2hfY291bnQpIHtcbiAgICAgICAgdGhpcy53YWxrdGhyb3VnaF9pbmRleCA9IDA7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YXJ0RGVzY3JpYmUoKTtcbiAgICB9LCAzMDAwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPcGFjaXR5IChpbmRleCkge1xuICAgIHZhciByZXRWYWwgPSAxLjA7XG4gICAgaWYgKGluZGV4ID09IHRoaXMud2Fsa3Rocm91Z2hfaW5kZXgpIHtcbiAgICAgIHJldFZhbCA9IDAuNTtcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIGdldFN0YXJ0KCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zaWduaW5cIl0pO1xuICB9XG59XG4iXX0=