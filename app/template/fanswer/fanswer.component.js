"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var gestures_1 = require("ui/gestures");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var globals_1 = require("../../globals/globals");
var douponfeed_service_1 = require("../../service/douponfeed/douponfeed.service");
var fanswer_service_1 = require("../../service/fanswer/fanswer.service");
var fileupload_service_1 = require("../../service/fileupload/fileupload.service");
var vr = require("nativescript-videorecorder");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var Toast = require("nativescript-toast");
var dialogs = require("ui/dialogs");
var imagepicker = require("nativescript-imagepicker");
var FanswerComponent = (function () {
    function FanswerComponent(page, router, activeRoute, douponfeedService, fileUploadService, fanswerService) {
        var _this = this;
        this.page = page;
        this.router = router;
        this.activeRoute = activeRoute;
        this.douponfeedService = douponfeedService;
        this.fileUploadService = fileUploadService;
        this.fanswerService = fanswerService;
        this.item = {};
        this.parent_list = "";
        this.loading = {
            "show": false
        };
        if (this.activeRoute.queryParams) {
            this.activeRoute.queryParams.subscribe(function (params) {
                _this.item = JSON.parse(params["item"]);
                _this.item.answer_text = "";
                _this.parent_list = params["parent_list"];
            });
        }
        this.indicator = new nativescript_loading_indicator_1.LoadingIndicator();
    }
    FanswerComponent.prototype.ngAfterViewInit = function () {
    };
    FanswerComponent.prototype.ngOnInit = function () {
        var textview = this.page.getViewById("textView");
        var layout = this.page.getViewById("layout");
        var observer = layout.observe(gestures_1.GestureTypes.tap, function (args) {
            console.log("Page Tapped");
            textview.dismissSoftInput();
        });
    };
    FanswerComponent.prototype.showLoading = function (msg) {
        // this.loading.show = true;
        this.indicator.show({
            message: msg
        });
    };
    FanswerComponent.prototype.hideLoading = function () {
        // this.loading.show = false;
        this.indicator.hide();
    };
    FanswerComponent.prototype.message = function (msg) {
        Toast.makeText(msg).show();
    };
    FanswerComponent.prototype.checkAudioExist = function () {
        var retVal = false;
        if (globals_1.GlobalSettings.audio_file != "") {
            retVal = true;
        }
        return retVal;
    };
    FanswerComponent.prototype.checkVideoExist = function () {
        var retVal = false;
        if (globals_1.GlobalSettings.video_file != "") {
            retVal = true;
        }
        return retVal;
    };
    FanswerComponent.prototype.getVideo = function () {
        var _this = this;
        var options = {
            title: "Options",
            message: "Choose your option",
            cancelButtonText: "Cancel",
            actions: ["Select video", "Capture video"]
        };
        if (this.checkVideoExist()) {
            options.actions.push("Play current Video");
        }
        dialogs.action(options).then(function (result) {
            console.log(result);
            if (result == "Select video") {
                _this.selectVideo();
            }
            else if (result == "Capture video") {
                _this.captureVideo();
            }
            else if (result == "Play current Video") {
                _this.playVideo();
            }
        });
    };
    FanswerComponent.prototype.getAudioButtonTitle = function () {
        var retVal = "Reply with audio";
        if (this.checkAudioExist()) {
            retVal = "Change audio reply";
        }
        return retVal;
    };
    FanswerComponent.prototype.getVideoButtonTitle = function () {
        var retVal = "Reply with video";
        if (this.checkVideoExist()) {
            retVal = "Change video reply";
        }
        return retVal;
    };
    FanswerComponent.prototype.onFanswer = function (item) {
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
    FanswerComponent.prototype.onComment = function (item) {
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
    FanswerComponent.prototype.onLike = function (item) {
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
    FanswerComponent.prototype.onCancel = function () {
        globals_1.GlobalSettings.audio_file = "";
        globals_1.GlobalSettings.video_file = "";
        this.item.answer_text = "";
        this.backToList();
    };
    FanswerComponent.prototype.onOk = function () {
        var audio_id = "";
        var video_id = "";
        var that = this;
        that.showLoading("Saving...");
        if (globals_1.GlobalSettings.audio_file != "") {
            that.fileUploadService.uploadFile(globals_1.GlobalSettings.access_token, "audio", globals_1.GlobalSettings.audio_file, function (audio_res) {
                console.log("Audio was uploaded.");
                var uploadAudioRes = JSON.parse(audio_res);
                audio_id = uploadAudioRes.file_id;
                if (globals_1.GlobalSettings.video_file != "") {
                    console.log("Starting to upload a video as a second item");
                    that.fileUploadService.uploadFile(globals_1.GlobalSettings.access_token, "video", globals_1.GlobalSettings.video_file, function (video_res) {
                        console.log("Video was uploaded.");
                        var uploadVideoRes = JSON.parse(video_res);
                        video_id = uploadVideoRes.file_id;
                        that.dosubmit(audio_id, video_id);
                    });
                }
                else {
                    that.dosubmit(audio_id, video_id);
                }
            });
        }
        else if (globals_1.GlobalSettings.video_file != "") {
            that.fileUploadService.uploadFile(globals_1.GlobalSettings.access_token, "video", globals_1.GlobalSettings.video_file, function (video_res) {
                console.log("Audio was uploaded.");
                var uploadVideoRes = JSON.parse(video_res);
                video_id = uploadVideoRes.file_id;
                that.dosubmit(audio_id, video_id);
            });
        }
        else {
            that.dosubmit(audio_id, video_id);
        }
    };
    FanswerComponent.prototype.dosubmit = function (audio, video) {
        var _this = this;
        if (!this.item.answer_text) {
            this.item.answer_text = "";
        }
        this.fanswerService.dosubmit(globals_1.GlobalSettings.access_token, globals_1.GlobalSettings.star_id, this.item.question_id, this.item.answer_text, audio, video)
            .subscribe(function (res) {
            _this.hideLoading();
            _this.message("You\'ve submitted an fanswer successfully.");
            console.log(JSON.stringify(res));
            _this.backToList();
        }, function (err) {
            _this.hideLoading();
            _this.message("Error. Please try later.");
            console.log(JSON.stringify(err));
        });
    };
    FanswerComponent.prototype.addAudio = function (item) {
        this.router.navigate(["audiorecord"]);
    };
    FanswerComponent.prototype.backToList = function () {
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
    FanswerComponent.prototype.playVideo = function () {
        console.log("playVideo!!");
        this.router.navigate(["playvideo"]);
    };
    FanswerComponent.prototype.selectVideo = function () {
        var context = imagepicker.create({
            mode: "single"
        });
        context
            .authorize()
            .then(function () {
            return context.present();
        })
            .then(function (selection) {
            console.log("Selection done:");
            selection.forEach(function (selected) {
                globals_1.GlobalSettings.video_file = selected.fileUri;
                console.log(globals_1.GlobalSettings.video_file);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    FanswerComponent.prototype.captureVideo = function () {
        var videorecorder = new vr.VideoRecorder();
        var options = {
            // saveToGallery:true, //default false | optional
            // duration:30, //(seconds) default no limit | optional
            // size:10, //(MB) default none | optional #android
            // hd:true, //default  false low res | optional
            explanation: "Why do i need this permission" //optional on api 23 #android
        };
        videorecorder.record(options)
            .then(function (data) {
            console.log(JSON.stringify(data));
            globals_1.GlobalSettings.video_file = data.file;
            console.log(globals_1.GlobalSettings.video_file);
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    return FanswerComponent;
}());
FanswerComponent = __decorate([
    core_1.Component({
        selector: "fanswer",
        templateUrl: "template/fanswer/fanswer.html",
        styleUrls: ["template/fanswer/fanswer.css"]
    })
    // >> listview-getting-started-angular
    ,
    __metadata("design:paramtypes", [page_1.Page, router_1.Router, router_1.ActivatedRoute,
        douponfeed_service_1.DouponFeedService, fileupload_service_1.FileUploadService, fanswer_service_1.FanswerService])
], FanswerComponent);
exports.FanswerComponent = FanswerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFuc3dlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYW5zd2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCx3Q0FBNkQ7QUFDN0QsZ0NBQStCO0FBRy9CLDBDQUEyRTtBQUkzRSxpREFBdUQ7QUFDdkQsa0ZBQWdGO0FBQ2hGLHlFQUF1RTtBQUN2RSxrRkFBZ0Y7QUFFaEYsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDL0MsaUZBQWtFO0FBQ2xFLDBDQUE0QztBQUM1QyxvQ0FBc0M7QUFDdEMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFRdEQsSUFBYSxnQkFBZ0I7SUFTM0IsMEJBQW9CLElBQVUsRUFBVSxNQUFjLEVBQVUsV0FBMkIsRUFDakYsaUJBQW9DLEVBQVUsaUJBQW9DLEVBQVUsY0FBOEI7UUFEcEksaUJBVUM7UUFWbUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDakYsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFUNUgsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUNmLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBR3pCLFlBQU8sR0FBUTtZQUNyQixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUM7UUFJQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtnQkFDM0MsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FB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LENBQUM7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLEdBQUc7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQWpXRCxJQWlXQztBQWpXWSxnQkFBZ0I7SUFONUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSwrQkFBK0I7UUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7S0FDNUMsQ0FBQztJQUNGLHNDQUFzQzs7cUNBVVYsV0FBSSxFQUFrQixlQUFNLEVBQXVCLHVCQUFjO1FBQzlELHNDQUFpQixFQUE2QixzQ0FBaUIsRUFBMEIsZ0NBQWM7R0FWekgsZ0JBQWdCLENBaVc1QjtBQWpXWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBHZXN0dXJlVHlwZXMsIEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIlxuaW1wb3J0IHsgVGV4dFZpZXcgfSBmcm9tIFwidWkvdGV4dC12aWV3XCI7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgVE5TRm9udEljb25TZXJ2aWNlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nMi1mb250aWNvbic7XG5cbmltcG9ydCB7IEdsb2JhbFNldHRpbmdzIH0gZnJvbSAnLi4vLi4vZ2xvYmFscy9nbG9iYWxzJztcbmltcG9ydCB7IERvdXBvbkZlZWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZS9kb3Vwb25mZWVkL2RvdXBvbmZlZWQuc2VydmljZSc7XG5pbXBvcnQgeyBGYW5zd2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2ZhbnN3ZXIvZmFuc3dlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGaWxlVXBsb2FkU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2ZpbGV1cGxvYWQvZmlsZXVwbG9hZC5zZXJ2aWNlXCI7XG5cbnZhciB2ciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdmlkZW9yZWNvcmRlclwiKTtcbmltcG9ydCB7IExvYWRpbmdJbmRpY2F0b3IgfSBmcm9tICduYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3InO1xuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSAnbmF0aXZlc2NyaXB0LXRvYXN0JztcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbnZhciBpbWFnZXBpY2tlciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIik7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJmYW5zd2VyXCIsXG4gIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlL2ZhbnN3ZXIvZmFuc3dlci5odG1sXCIsXG4gIHN0eWxlVXJsczogW1widGVtcGxhdGUvZmFuc3dlci9mYW5zd2VyLmNzc1wiXVxufSlcbi8vID4+IGxpc3R2aWV3LWdldHRpbmctc3RhcnRlZC1hbmd1bGFyXG5leHBvcnQgY2xhc3MgRmFuc3dlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgaXRlbTogYW55ID0ge307XG4gIHByaXZhdGUgcGFyZW50X2xpc3Q6IHN0cmluZyA9IFwiXCI7XG4gIHByaXZhdGUgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcztcbiAgcHJpdmF0ZSBpbmRpY2F0b3I6IExvYWRpbmdJbmRpY2F0b3I7XG4gIHByaXZhdGUgbG9hZGluZzogYW55ID0ge1xuICAgIFwic2hvd1wiOiBmYWxzZVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSBkb3Vwb25mZWVkU2VydmljZTogRG91cG9uRmVlZFNlcnZpY2UsIHByaXZhdGUgZmlsZVVwbG9hZFNlcnZpY2U6IEZpbGVVcGxvYWRTZXJ2aWNlLCBwcml2YXRlIGZhbnN3ZXJTZXJ2aWNlOiBGYW5zd2VyU2VydmljZSApIHtcbiAgICBpZiAodGhpcy5hY3RpdmVSb3V0ZS5xdWVyeVBhcmFtcykge1xuICAgICAgdGhpcy5hY3RpdmVSb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgdGhpcy5pdGVtID0gSlNPTi5wYXJzZShwYXJhbXNbXCJpdGVtXCJdKTtcbiAgICAgICAgdGhpcy5pdGVtLmFuc3dlcl90ZXh0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5wYXJlbnRfbGlzdCA9IHBhcmFtc1tcInBhcmVudF9saXN0XCJdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuaW5kaWNhdG9yID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB2YXIgdGV4dHZpZXcgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQ8VGV4dFZpZXc+KFwidGV4dFZpZXdcIik7XG4gICAgdmFyIGxheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZDxTdGFja0xheW91dD4oXCJsYXlvdXRcIik7XG4gICAgdmFyIG9ic2VydmVyID0gbGF5b3V0Lm9ic2VydmUoR2VzdHVyZVR5cGVzLnRhcCwgZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQYWdlIFRhcHBlZFwiKTtcbiAgICAgICAgdGV4dHZpZXcuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgIH0pO1xuICB9XG5cbiAgc2hvd0xvYWRpbmcgKG1zZzogc3RyaW5nKSB7XG4gICAgLy8gdGhpcy5sb2FkaW5nLnNob3cgPSB0cnVlO1xuICAgIHRoaXMuaW5kaWNhdG9yLnNob3coe1xuICAgICAgbWVzc2FnZTogbXNnXG4gICAgfSk7XG4gIH1cblxuICBoaWRlTG9hZGluZyAoKSB7XG4gICAgLy8gdGhpcy5sb2FkaW5nLnNob3cgPSBmYWxzZTtcbiAgICB0aGlzLmluZGljYXRvci5oaWRlKCk7XG4gIH1cblxuICBtZXNzYWdlIChtc2c6IHN0cmluZykge1xuICAgIFRvYXN0Lm1ha2VUZXh0KG1zZykuc2hvdygpO1xuICB9XG5cbiAgY2hlY2tBdWRpb0V4aXN0ICgpIHtcbiAgICB2YXIgcmV0VmFsID0gZmFsc2U7XG4gICAgaWYgKEdsb2JhbFNldHRpbmdzLmF1ZGlvX2ZpbGUgIT0gXCJcIikge1xuICAgICAgICByZXRWYWwgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgY2hlY2tWaWRlb0V4aXN0ICgpIHtcbiAgICB2YXIgcmV0VmFsID0gZmFsc2U7XG4gICAgaWYgKEdsb2JhbFNldHRpbmdzLnZpZGVvX2ZpbGUgIT0gXCJcIikge1xuICAgICAgICByZXRWYWwgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgcHVibGljIGdldFZpZGVvICgpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgdGl0bGU6IFwiT3B0aW9uc1wiLFxuICAgICAgICBtZXNzYWdlOiBcIkNob29zZSB5b3VyIG9wdGlvblwiLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxuICAgICAgICBhY3Rpb25zOiBbXCJTZWxlY3QgdmlkZW9cIiwgXCJDYXB0dXJlIHZpZGVvXCJdXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNoZWNrVmlkZW9FeGlzdCgpKSB7XG4gICAgICAgIG9wdGlvbnMuYWN0aW9ucy5wdXNoKFwiUGxheSBjdXJyZW50IFZpZGVvXCIpO1xuICAgIH1cblxuICAgIGRpYWxvZ3MuYWN0aW9uKG9wdGlvbnMpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBpZiAocmVzdWx0ID09IFwiU2VsZWN0IHZpZGVvXCIpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdFZpZGVvKCk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09IFwiQ2FwdHVyZSB2aWRlb1wiKSB7XG4gICAgICAgICAgdGhpcy5jYXB0dXJlVmlkZW8oKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT0gXCJQbGF5IGN1cnJlbnQgVmlkZW9cIikge1xuICAgICAgICAgIHRoaXMucGxheVZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdWRpb0J1dHRvblRpdGxlICgpIHtcbiAgICB2YXIgcmV0VmFsID0gXCJSZXBseSB3aXRoIGF1ZGlvXCI7XG5cbiAgICBpZiAodGhpcy5jaGVja0F1ZGlvRXhpc3QoKSkge1xuICAgICAgICByZXRWYWwgPSBcIkNoYW5nZSBhdWRpbyByZXBseVwiO1xuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgcHVibGljIGdldFZpZGVvQnV0dG9uVGl0bGUgKCkge1xuICAgIHZhciByZXRWYWwgPSBcIlJlcGx5IHdpdGggdmlkZW9cIjtcblxuICAgIGlmICh0aGlzLmNoZWNrVmlkZW9FeGlzdCgpKSB7XG4gICAgICAgIHJldFZhbCA9IFwiQ2hhbmdlIHZpZGVvIHJlcGx5XCI7XG4gICAgfVxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBwdWJsaWMgb25GYW5zd2VyIChpdGVtKSB7XG4gICAgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgXCJpdGVtXCI6IEpTT04uc3RyaW5naWZ5KHRoaXMuaXRlbSlcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXG4gICAgICBbXG4gICAgICAgIFwiL21haW5cIiwge1xuICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgIG1haW5vdXRsZXQ6WydmYW5zd2VyJ11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sIHRoaXMubmF2aWdhdGlvbkV4dHJhc1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25Db21tZW50IChpdGVtKSB7XG4gICAgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgXCJpdGVtXCI6IEpTT04uc3RyaW5naWZ5KHRoaXMuaXRlbSlcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXG4gICAgICBbXG4gICAgICAgIFwibWFpblwiLCB7XG4gICAgICAgICAgb3V0bGV0czoge1xuICAgICAgICAgICAgbWFpbm91dGxldDpbJ2FkZGNvbW1lbnQnXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSwgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkxpa2UgKGl0ZW0pIHtcbiAgICB0aGlzLnNob3dMb2FkaW5nKFwiU2F2aW5nLi4uXCIpO1xuICAgIHRoaXMuZG91cG9uZmVlZFNlcnZpY2VcbiAgICAuZG91cG9uKEdsb2JhbFNldHRpbmdzLmFjY2Vzc190b2tlbiwgdGhpcy5pdGVtLnF1ZXN0aW9uX2lkKVxuICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcbiAgICAgIHRoaXMubWVzc2FnZShcIllvdSBsaWtlZCB0aGlzIGZhc2suXCIpO1xuXG4gICAgICB0aGlzLmJhY2tUb0xpc3QoKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgdGhpcy5tZXNzYWdlKFwiRXJyb3IuIFBsZWFzZSB0cnkgbGF0ZXIuXCIpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgb25DYW5jZWwgKCkge1xuICAgIEdsb2JhbFNldHRpbmdzLmF1ZGlvX2ZpbGUgPSBcIlwiO1xuICAgIEdsb2JhbFNldHRpbmdzLnZpZGVvX2ZpbGUgPSBcIlwiO1xuICAgIHRoaXMuaXRlbS5hbnN3ZXJfdGV4dCA9IFwiXCI7XG5cbiAgICB0aGlzLmJhY2tUb0xpc3QoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbk9rICgpIHtcbiAgICB2YXIgYXVkaW9faWQgPSBcIlwiO1xuICAgIHZhciB2aWRlb19pZCA9IFwiXCI7XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICB0aGF0LnNob3dMb2FkaW5nKFwiU2F2aW5nLi4uXCIpO1xuXG4gICAgaWYgKEdsb2JhbFNldHRpbmdzLmF1ZGlvX2ZpbGUgIT0gXCJcIikge1xuICAgICAgdGhhdC5maWxlVXBsb2FkU2VydmljZS51cGxvYWRGaWxlKEdsb2JhbFNldHRpbmdzLmFjY2Vzc190b2tlbiwgXCJhdWRpb1wiLCBHbG9iYWxTZXR0aW5ncy5hdWRpb19maWxlLCBmdW5jdGlvbihhdWRpb19yZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBdWRpbyB3YXMgdXBsb2FkZWQuXCIpO1xuICAgICAgICB2YXIgdXBsb2FkQXVkaW9SZXMgPSBKU09OLnBhcnNlKGF1ZGlvX3Jlcyk7XG4gICAgICAgIGF1ZGlvX2lkID0gdXBsb2FkQXVkaW9SZXMuZmlsZV9pZDtcblxuICAgICAgICBpZiAoR2xvYmFsU2V0dGluZ3MudmlkZW9fZmlsZSAhPSBcIlwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTdGFydGluZyB0byB1cGxvYWQgYSB2aWRlbyBhcyBhIHNlY29uZCBpdGVtXCIpO1xuICAgICAgICAgIHRoYXQuZmlsZVVwbG9hZFNlcnZpY2UudXBsb2FkRmlsZShHbG9iYWxTZXR0aW5ncy5hY2Nlc3NfdG9rZW4sIFwidmlkZW9cIiwgR2xvYmFsU2V0dGluZ3MudmlkZW9fZmlsZSwgZnVuY3Rpb24odmlkZW9fcmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZpZGVvIHdhcyB1cGxvYWRlZC5cIik7XG4gICAgICAgICAgICB2YXIgdXBsb2FkVmlkZW9SZXMgPSBKU09OLnBhcnNlKHZpZGVvX3Jlcyk7XG4gICAgICAgICAgICB2aWRlb19pZCA9IHVwbG9hZFZpZGVvUmVzLmZpbGVfaWQ7XG5cbiAgICAgICAgICAgIHRoYXQuZG9zdWJtaXQoYXVkaW9faWQsIHZpZGVvX2lkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGF0LmRvc3VibWl0KGF1ZGlvX2lkLCB2aWRlb19pZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoR2xvYmFsU2V0dGluZ3MudmlkZW9fZmlsZSAhPSBcIlwiKSB7XG4gICAgICB0aGF0LmZpbGVVcGxvYWRTZXJ2aWNlLnVwbG9hZEZpbGUoR2xvYmFsU2V0dGluZ3MuYWNjZXNzX3Rva2VuLCBcInZpZGVvXCIsIEdsb2JhbFNldHRpbmdzLnZpZGVvX2ZpbGUsIGZ1bmN0aW9uKHZpZGVvX3Jlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkF1ZGlvIHdhcyB1cGxvYWRlZC5cIik7XG4gICAgICAgIHZhciB1cGxvYWRWaWRlb1JlcyA9IEpTT04ucGFyc2UodmlkZW9fcmVzKTtcbiAgICAgICAgdmlkZW9faWQgPSB1cGxvYWRWaWRlb1Jlcy5maWxlX2lkO1xuXG4gICAgICAgIHRoYXQuZG9zdWJtaXQoYXVkaW9faWQsIHZpZGVvX2lkKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0LmRvc3VibWl0KGF1ZGlvX2lkLCB2aWRlb19pZCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRvc3VibWl0IChhdWRpbywgdmlkZW8pIHtcbiAgICBpZighdGhpcy5pdGVtLmFuc3dlcl90ZXh0KSB7XG4gICAgICB0aGlzLml0ZW0uYW5zd2VyX3RleHQgPSBcIlwiO1xuICAgIH1cblxuICAgIHRoaXMuZmFuc3dlclNlcnZpY2UuZG9zdWJtaXQgKEdsb2JhbFNldHRpbmdzLmFjY2Vzc190b2tlbiwgR2xvYmFsU2V0dGluZ3Muc3Rhcl9pZCwgdGhpcy5pdGVtLnF1ZXN0aW9uX2lkLFxuICAgIHRoaXMuaXRlbS5hbnN3ZXJfdGV4dCwgYXVkaW8sIHZpZGVvKVxuICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcbiAgICAgIHRoaXMubWVzc2FnZShcIllvdVxcJ3ZlIHN1Ym1pdHRlZCBhbiBmYW5zd2VyIHN1Y2Nlc3NmdWxseS5cIik7XG4gICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKTtcbiAgICAgIHRoaXMuYmFja1RvTGlzdCgpO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgICB0aGlzLm1lc3NhZ2UoXCJFcnJvci4gUGxlYXNlIHRyeSBsYXRlci5cIik7XG4gICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRBdWRpbyAoaXRlbSkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImF1ZGlvcmVjb3JkXCJdKTtcbiAgfVxuXG4gIGJhY2tUb0xpc3QgKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucGFyZW50X2xpc3QpO1xuXG4gICAgaWYgKHRoaXMucGFyZW50X2xpc3QgPT0gXCJhbGxcIikge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgIFwic3RyX3VzZVwiOiBcImFsbFwiXG4gICAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXG4gICAgICAgIFtcbiAgICAgICAgICBcIm1haW5cIiwge1xuICAgICAgICAgICAgb3V0bGV0czoge1xuICAgICAgICAgICAgICBtYWlub3V0bGV0OlsnZmFza2xpc3QnXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSwgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudF9saXN0ID09IFwidmlkZW9cIikge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAgIFwic3RyX3VzZVwiOiBcInZpZGVvXCJcbiAgICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcbiAgICAgICAgW1xuICAgICAgICAgIFwibWFpblwiLCB7XG4gICAgICAgICAgICBvdXRsZXRzOiB7XG4gICAgICAgICAgICAgIG1haW5vdXRsZXQ6Wyd2aWRlb2Zhc2snXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSwgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudF9saXN0ID09IFwidmVyaWZ5XCIpIHtcbiAgICAgIHRoaXMubmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICBcInN0cl91c2VcIjogXCJ2ZXJpZnlcIlxuICAgICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFxuICAgICAgICBbXG4gICAgICAgICAgXCJtYWluXCIsIHtcbiAgICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgICAgbWFpbm91dGxldDpbJ3ZlcmlmeWZhc2snXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSwgdGhpcy5uYXZpZ2F0aW9uRXh0cmFzXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudF9saXN0ID09IFwiY2hhcHRlclwiKSB7XG4gICAgICB0aGlzLm5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgICAgXCJzdHJfdXNlXCI6IFwiY2hhcHRlcmJvb2tcIlxuICAgICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFxuICAgICAgICBbXG4gICAgICAgICAgXCJtYWluXCIsIHtcbiAgICAgICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAgICAgbWFpbm91dGxldDpbJ2NoYXB0ZXJmYXNrJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF0sIHRoaXMubmF2aWdhdGlvbkV4dHJhc1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwbGF5VmlkZW8gKCkge1xuICAgIGNvbnNvbGUubG9nKFwicGxheVZpZGVvISFcIik7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wicGxheXZpZGVvXCJdKTtcbiAgfVxuXG4gIHNlbGVjdFZpZGVvICgpIHtcbiAgICBsZXQgY29udGV4dCA9IGltYWdlcGlja2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICBtb2RlOiBcInNpbmdsZVwiXG4gICAgICAgIH0pO1xuXG4gICAgY29udGV4dFxuICAgICAgICAuYXV0aG9yaXplKClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGV4dC5wcmVzZW50KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3Rpb24gZG9uZTpcIik7XG4gICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbihzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIEdsb2JhbFNldHRpbmdzLnZpZGVvX2ZpbGUgPSBzZWxlY3RlZC5maWxlVXJpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdsb2JhbFNldHRpbmdzLnZpZGVvX2ZpbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBjYXB0dXJlVmlkZW8gKCkge1xuICAgIHZhciB2aWRlb3JlY29yZGVyID0gbmV3IHZyLlZpZGVvUmVjb3JkZXIoKTtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgLy8gc2F2ZVRvR2FsbGVyeTp0cnVlLCAvL2RlZmF1bHQgZmFsc2UgfCBvcHRpb25hbFxuICAgICAgICAvLyBkdXJhdGlvbjozMCwgLy8oc2Vjb25kcykgZGVmYXVsdCBubyBsaW1pdCB8IG9wdGlvbmFsXG4gICAgICAgIC8vIHNpemU6MTAsIC8vKE1CKSBkZWZhdWx0IG5vbmUgfCBvcHRpb25hbCAjYW5kcm9pZFxuICAgICAgICAvLyBoZDp0cnVlLCAvL2RlZmF1bHQgIGZhbHNlIGxvdyByZXMgfCBvcHRpb25hbFxuICAgICAgICBleHBsYW5hdGlvbjpcIldoeSBkbyBpIG5lZWQgdGhpcyBwZXJtaXNzaW9uXCIgLy9vcHRpb25hbCBvbiBhcGkgMjMgI2FuZHJvaWRcbiAgICB9XG5cbiAgICB2aWRlb3JlY29yZGVyLnJlY29yZChvcHRpb25zKVxuICAgIC50aGVuKChkYXRhKT0+e1xuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICBHbG9iYWxTZXR0aW5ncy52aWRlb19maWxlID0gZGF0YS5maWxlO1xuICAgICAgICBjb25zb2xlLmxvZyhHbG9iYWxTZXR0aW5ncy52aWRlb19maWxlKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKT0+e1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pXG4gIH1cbn1cbiJdfQ==