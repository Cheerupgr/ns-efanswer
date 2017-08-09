"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var angular_2 = require("nativescript-telerik-ui/listview/angular");
var nativescript_ng2_fonticon_1 = require("nativescript-ng2-fonticon");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var user_service_1 = require("./service/user/user.service");
var stardetail_service_1 = require("./service/stardetail/stardetail.service");
var walkthroughs_service_1 = require("./service/walkthroughs/walkthroughs.service");
var fasks_service_1 = require("./service/fasks/fasks.service");
var douponfeed_service_1 = require("./service/douponfeed/douponfeed.service");
var docommentonfeed_service_1 = require("./service/docommentonfeed/docommentonfeed.service");
var fanswer_service_1 = require("./service/fanswer/fanswer.service");
var fileupload_service_1 = require("./service/fileupload/fileupload.service");
var globals_1 = require("./globals/globals");
var audioplayer_service_1 = require("./shared/audioplayer/audioplayer.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            app_routing_1.navigatableComponents
        ],
        bootstrap: [app_component_1.AppComponent],
        imports: [
            nativescript_ng2_fonticon_1.TNSFontIconModule.forRoot({
                'mdi': 'material-design-icons.css'
            }),
            nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            http_1.NativeScriptHttpModule,
            router_1.NativeScriptRouterModule,
            angular_1.NativeScriptUISideDrawerModule,
            angular_2.NativeScriptUIListViewModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes)
        ],
        schemas: [core_1.NO_ERRORS_SCHEMA],
        providers: [
            user_service_1.UserService,
            stardetail_service_1.StarDetailService,
            walkthroughs_service_1.WalkthroughsService,
            fasks_service_1.FasksService,
            douponfeed_service_1.DouponFeedService,
            docommentonfeed_service_1.DoCommentFeedService,
            fanswer_service_1.FanswerService,
            fileupload_service_1.FileUploadService,
            globals_1.GlobalSettings,
            audioplayer_service_1.AudioPlayerService
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLHNFQUE0RjtBQUM1RixvRUFBd0Y7QUFFeEYsdUVBQThEO0FBRTlELGlEQUErQztBQUMvQyw2Q0FBOEQ7QUFFOUQsNERBQTBEO0FBQzFELDhFQUE0RTtBQUM1RSxvRkFBa0Y7QUFDbEYsK0RBQTZEO0FBQzdELDhFQUE0RTtBQUM1RSw2RkFBeUY7QUFDekYscUVBQW1FO0FBQ25FLDhFQUE0RTtBQUM1RSw2Q0FBbUQ7QUFFbkQsZ0ZBQThFO0FBa0M5RSxJQUFhLFNBQVM7SUFBdEI7SUFBd0IsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUF6QixJQUF5QjtBQUFaLFNBQVM7SUFoQ3JCLGVBQVEsQ0FBQztRQUNSLFlBQVksRUFBRTtZQUNaLDRCQUFZO1lBQ1osbUNBQXFCO1NBQ3RCO1FBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUN6QixPQUFPLEVBQUU7WUFDUCw2Q0FBaUIsQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLEtBQUssRUFBRSwyQkFBMkI7YUFDbkMsQ0FBQztZQUNGLHdDQUFrQjtZQUNsQiwrQkFBdUI7WUFDdkIsNkJBQXNCO1lBQ3RCLGlDQUF3QjtZQUN4Qix3Q0FBOEI7WUFDOUIsc0NBQTRCO1lBQzVCLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxvQkFBTSxDQUFDO1NBQ3pDO1FBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsU0FBUyxFQUFFO1lBQ1QsMEJBQVc7WUFDWCxzQ0FBaUI7WUFDakIsMENBQW1CO1lBQ25CLDRCQUFZO1lBQ1osc0NBQWlCO1lBQ2pCLDhDQUFvQjtZQUNwQixnQ0FBYztZQUNkLHNDQUFpQjtZQUNqQix3QkFBYztZQUNkLHdDQUFrQjtTQUNuQjtLQUNGLENBQUM7R0FDVyxTQUFTLENBQUc7QUFBWiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXcvYW5ndWxhcic7XG5cbmltcG9ydCB7IFROU0ZvbnRJY29uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nMi1mb250aWNvbic7XG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IHJvdXRlcywgbmF2aWdhdGFibGVDb21wb25lbnRzIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcblxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlL3VzZXIvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdGFyRGV0YWlsU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2Uvc3RhcmRldGFpbC9zdGFyZGV0YWlsLnNlcnZpY2VcIjtcbmltcG9ydCB7IFdhbGt0aHJvdWdoc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlL3dhbGt0aHJvdWdocy93YWxrdGhyb3VnaHMuc2VydmljZVwiO1xuaW1wb3J0IHsgRmFza3NTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9mYXNrcy9mYXNrcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEb3Vwb25GZWVkU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2UvZG91cG9uZmVlZC9kb3Vwb25mZWVkLnNlcnZpY2VcIjtcbmltcG9ydCB7IERvQ29tbWVudEZlZWRTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9kb2NvbW1lbnRvbmZlZWQvZG9jb21tZW50b25mZWVkLnNlcnZpY2VcIjtcbmltcG9ydCB7IEZhbnN3ZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9mYW5zd2VyL2ZhbnN3ZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgRmlsZVVwbG9hZFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlL2ZpbGV1cGxvYWQvZmlsZXVwbG9hZC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHbG9iYWxTZXR0aW5ncyB9IGZyb20gJy4vZ2xvYmFscy9nbG9iYWxzJztcblxuaW1wb3J0IHsgQXVkaW9QbGF5ZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL2F1ZGlvcGxheWVyL2F1ZGlvcGxheWVyLnNlcnZpY2VcIjtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXBwQ29tcG9uZW50LFxuICAgIG5hdmlnYXRhYmxlQ29tcG9uZW50c1xuICBdLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgVE5TRm9udEljb25Nb2R1bGUuZm9yUm9vdCh7XG4gICAgICAnbWRpJzogJ21hdGVyaWFsLWRlc2lnbi1pY29ucy5jc3MnXG4gICAgfSksXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcylcbiAgXSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdLFxuICBwcm92aWRlcnM6IFtcbiAgICBVc2VyU2VydmljZSxcbiAgICBTdGFyRGV0YWlsU2VydmljZSxcbiAgICBXYWxrdGhyb3VnaHNTZXJ2aWNlLFxuICAgIEZhc2tzU2VydmljZSxcbiAgICBEb3Vwb25GZWVkU2VydmljZSxcbiAgICBEb0NvbW1lbnRGZWVkU2VydmljZSxcbiAgICBGYW5zd2VyU2VydmljZSxcbiAgICBGaWxlVXBsb2FkU2VydmljZSxcbiAgICBHbG9iYWxTZXR0aW5ncyxcbiAgICBBdWRpb1BsYXllclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiJdfQ==