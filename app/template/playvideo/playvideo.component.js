"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_1 = require("data/observable");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var globals_1 = require("../../globals/globals");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("VideoPlayer", function () { return require("nativescript-videoplayer").Video; });
var PlayVideoComponent = (function (_super) {
    __extends(PlayVideoComponent, _super);
    function PlayVideoComponent(router, page, routerExtensions) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.routerExtensions = routerExtensions;
        page.actionBarHidden = true;
        return _this;
    }
    PlayVideoComponent.prototype.backToItem = function () {
        this.routerExtensions.back();
    };
    PlayVideoComponent.prototype.getVideo = function () {
        var retVal = "";
        retVal = globals_1.GlobalSettings.video_file;
        return retVal;
    };
    return PlayVideoComponent;
}(observable_1.Observable));
PlayVideoComponent = __decorate([
    core_1.Component({
        selector: "playvideo",
        templateUrl: "template/playvideo/playvideo.html",
        styleUrls: ["template/playvideo/playvideo.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page, router_2.RouterExtensions])
], PlayVideoComponent);
exports.PlayVideoComponent = PlayVideoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheXZpZGVvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXl2aWRlby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsOENBQTZDO0FBQzdDLDBDQUF5QztBQUN6QyxzREFBMEU7QUFFMUUsZ0NBQTZCO0FBQzdCLGlEQUF1RDtBQUV2RCwwRUFBc0U7QUFDdEUsa0NBQWUsQ0FBQyxhQUFhLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEtBQUssRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO0FBT2hGLElBQWEsa0JBQWtCO0lBQVMsc0NBQVU7SUFDaEQsNEJBQW9CLE1BQWMsRUFBRSxJQUFVLEVBQVUsZ0JBQWtDO1FBQTFGLFlBQ0UsaUJBQU8sU0FFUjtRQUhtQixZQUFNLEdBQU4sTUFBTSxDQUFRO1FBQXNCLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFFeEYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7O0lBQzlCLENBQUM7SUFFTSx1Q0FBVSxHQUFqQjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU0scUNBQVEsR0FBZjtRQUNFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixNQUFNLEdBQUcsd0JBQWMsQ0FBQyxVQUFVLENBQUM7UUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBZkQsQ0FBd0MsdUJBQVUsR0FlakQ7QUFmWSxrQkFBa0I7SUFMOUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7S0FDaEQsQ0FBQztxQ0FFNEIsZUFBTSxFQUFRLFdBQUksRUFBNEIseUJBQWdCO0dBRC9FLGtCQUFrQixDQWU5QjtBQWZZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMsIFBhZ2VSb3V0ZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFROU0ZvbnRJY29uU2VydmljZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZzItZm9udGljb24nO1xuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgR2xvYmFsU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9nbG9iYWxzL2dsb2JhbHMnO1xuXG5pbXBvcnQge3JlZ2lzdGVyRWxlbWVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbnJlZ2lzdGVyRWxlbWVudChcIlZpZGVvUGxheWVyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdmlkZW9wbGF5ZXJcIikuVmlkZW8pO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwicGxheXZpZGVvXCIsXG4gIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlL3BsYXl2aWRlby9wbGF5dmlkZW8uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInRlbXBsYXRlL3BsYXl2aWRlby9wbGF5dmlkZW8uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFBsYXlWaWRlb0NvbXBvbmVudCBleHRlbmRzIE9ic2VydmFibGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBiYWNrVG9JdGVtICgpIHtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICB9XG5cbiAgcHVibGljIGdldFZpZGVvICgpIHtcbiAgICB2YXIgcmV0VmFsID0gXCJcIjtcbiAgICByZXRWYWwgPSBHbG9iYWxTZXR0aW5ncy52aWRlb19maWxlO1xuICAgIHJldHVybiByZXRWYWw7XG4gIH1cbn1cbiJdfQ==