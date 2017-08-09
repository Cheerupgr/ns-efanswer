import { Component, OnInit } from "@angular/core";
import { GestureTypes, GestureEventData } from "ui/gestures";
import { Page } from "ui/page";
import { StackLayout } from "ui/layouts/stack-layout"
import { TextView } from "ui/text-view";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { ObservableArray } from "data/observable-array";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

import { GlobalSettings } from '../../globals/globals';
import { DouponFeedService } from '../../service/douponfeed/douponfeed.service';
import { FanswerService } from "../../service/fanswer/fanswer.service";
import { FileUploadService } from "../../service/fileupload/fileupload.service";

var vr = require("nativescript-videorecorder");
import { LoadingIndicator } from 'nativescript-loading-indicator';
import * as Toast from 'nativescript-toast';
import * as dialogs from "ui/dialogs";
var imagepicker = require("nativescript-imagepicker");

@Component({
  selector: "fanswer",
  templateUrl: "template/fanswer/fanswer.html",
  styleUrls: ["template/fanswer/fanswer.css"]
})
// >> listview-getting-started-angular
export class FanswerComponent implements OnInit {
  private item: any = {};
  private parent_list: string = "";
  private navigationExtras: NavigationExtras;
  private indicator: LoadingIndicator;
  private loading: any = {
    "show": false
  };

  constructor(private page: Page, private router: Router, private activeRoute: ActivatedRoute,
    private douponfeedService: DouponFeedService, private fileUploadService: FileUploadService, private fanswerService: FanswerService ) {
    if (this.activeRoute.queryParams) {
      this.activeRoute.queryParams.subscribe(params => {
        this.item = JSON.parse(params["item"]);
        this.item.answer_text = "";
        this.parent_list = params["parent_list"];
      });
    }
    this.indicator = new LoadingIndicator();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {

    var textview = this.page.getViewById<TextView>("textView");
    var layout = this.page.getViewById<StackLayout>("layout");
    var observer = layout.observe(GestureTypes.tap, function (args) {
        console.log("Page Tapped");
        textview.dismissSoftInput();
    });
  }

  showLoading (msg: string) {
    // this.loading.show = true;
    this.indicator.show({
      message: msg
    });
  }

  hideLoading () {
    // this.loading.show = false;
    this.indicator.hide();
  }

  message (msg: string) {
    Toast.makeText(msg).show();
  }

  checkAudioExist () {
    var retVal = false;
    if (GlobalSettings.audio_file != "") {
        retVal = true;
    }
    return retVal;
  }

  checkVideoExist () {
    var retVal = false;
    if (GlobalSettings.video_file != "") {
        retVal = true;
    }
    return retVal;
  }

  public getVideo () {
    let options = {
        title: "Options",
        message: "Choose your option",
        cancelButtonText: "Cancel",
        actions: ["Select video", "Capture video"]
    };

    if (this.checkVideoExist()) {
        options.actions.push("Play current Video");
    }

    dialogs.action(options).then((result) => {
        console.log(result);
        if (result == "Select video") {
          this.selectVideo();
        } else if (result == "Capture video") {
          this.captureVideo();
        } else if (result == "Play current Video") {
          this.playVideo();
        }
    });
  }

  public getAudioButtonTitle () {
    var retVal = "Reply with audio";

    if (this.checkAudioExist()) {
        retVal = "Change audio reply";
    }
    return retVal;
  }

  public getVideoButtonTitle () {
    var retVal = "Reply with video";

    if (this.checkVideoExist()) {
        retVal = "Change video reply";
    }
    return retVal;
  }

  public onFanswer (item) {
    this.navigationExtras = {
      queryParams: {
        "item": JSON.stringify(this.item)
      }
    };

    this.router.navigate(
      [
        "/main", {
          outlets: {
            mainoutlet:['fanswer']
          }
        }
      ], this.navigationExtras
    );
  }

  public onComment (item) {
    this.navigationExtras = {
      queryParams: {
        "item": JSON.stringify(this.item)
      }
    };

    this.router.navigate(
      [
        "main", {
          outlets: {
            mainoutlet:['addcomment']
          }
        }
      ], this.navigationExtras
    );
  }

  public onLike (item) {
    this.showLoading("Saving...");
    this.douponfeedService
    .doupon(GlobalSettings.access_token, this.item.question_id)
    .subscribe(res => {
      this.hideLoading();
      this.message("You liked this fask.");

      this.backToList();
    }, err => {
      this.hideLoading();
      this.message("Error. Please try later.");
    })
  }

  public onCancel () {
    GlobalSettings.audio_file = "";
    GlobalSettings.video_file = "";
    this.item.answer_text = "";

    this.backToList();
  }

  public onOk () {
    var audio_id = "";
    var video_id = "";

    var that = this;

    that.showLoading("Saving...");

    if (GlobalSettings.audio_file != "") {
      that.fileUploadService.uploadFile(GlobalSettings.access_token, "audio", GlobalSettings.audio_file, function(audio_res) {
        console.log("Audio was uploaded.");
        var uploadAudioRes = JSON.parse(audio_res);
        audio_id = uploadAudioRes.file_id;

        if (GlobalSettings.video_file != "") {
          console.log("Starting to upload a video as a second item");
          that.fileUploadService.uploadFile(GlobalSettings.access_token, "video", GlobalSettings.video_file, function(video_res) {
            console.log("Video was uploaded.");
            var uploadVideoRes = JSON.parse(video_res);
            video_id = uploadVideoRes.file_id;

            that.dosubmit(audio_id, video_id);
          });
        } else {
          that.dosubmit(audio_id, video_id);
        }
      });
    } else if (GlobalSettings.video_file != "") {
      that.fileUploadService.uploadFile(GlobalSettings.access_token, "video", GlobalSettings.video_file, function(video_res) {
        console.log("Audio was uploaded.");
        var uploadVideoRes = JSON.parse(video_res);
        video_id = uploadVideoRes.file_id;

        that.dosubmit(audio_id, video_id);
      });
    } else {
      that.dosubmit(audio_id, video_id);
    }
  }

  public dosubmit (audio, video) {
    if(!this.item.answer_text) {
      this.item.answer_text = "";
    }

    this.fanswerService.dosubmit (GlobalSettings.access_token, GlobalSettings.star_id, this.item.question_id,
    this.item.answer_text, audio, video)
    .subscribe(res => {
      this.hideLoading();
      this.message("You\'ve submitted an fanswer successfully.");
      console.log(JSON.stringify(res));
      this.backToList();
    }, err => {
      this.hideLoading();
      this.message("Error. Please try later.");
      console.log(JSON.stringify(err));
    });
  }

  public addAudio (item) {
    this.router.navigate(["audiorecord"]);
  }

  backToList () {
    console.log(this.parent_list);

    if (this.parent_list == "all") {
      this.navigationExtras = {
          queryParams: {
              "str_use": "all"
          }
      };

      this.router.navigate(
        [
          "main", {
            outlets: {
              mainoutlet:['fasklist']
            }
          }
        ], this.navigationExtras
      );
    }

    if (this.parent_list == "video") {
      this.navigationExtras = {
          queryParams: {
              "str_use": "video"
          }
      };

      this.router.navigate(
        [
          "main", {
            outlets: {
              mainoutlet:['videofask']
            }
          }
        ], this.navigationExtras
      );
    }

    if (this.parent_list == "verify") {
      this.navigationExtras = {
          queryParams: {
              "str_use": "verify"
          }
      };

      this.router.navigate(
        [
          "main", {
            outlets: {
              mainoutlet:['verifyfask']
            }
          }
        ], this.navigationExtras
      );
    }

    if (this.parent_list == "chapter") {
      this.navigationExtras = {
          queryParams: {
              "str_use": "chapterbook"
          }
      };

      this.router.navigate(
        [
          "main", {
            outlets: {
              mainoutlet:['chapterfask']
            }
          }
        ], this.navigationExtras
      );
    }
  }

  playVideo () {
    console.log("playVideo!!");
    this.router.navigate(["playvideo"]);
  }

  selectVideo () {
    let context = imagepicker.create({
            mode: "single"
        });

    context
        .authorize()
        .then(function() {
            return context.present();
        })
        .then(function(selection) {
            console.log("Selection done:");
            selection.forEach(function(selected) {
                GlobalSettings.video_file = selected.fileUri;
                console.log(GlobalSettings.video_file);
            });
        }).catch(function (e) {
            console.log(e);
        });
  }

  captureVideo () {
    var videorecorder = new vr.VideoRecorder();
    var options = {
        // saveToGallery:true, //default false | optional
        // duration:30, //(seconds) default no limit | optional
        // size:10, //(MB) default none | optional #android
        // hd:true, //default  false low res | optional
        explanation:"Why do i need this permission" //optional on api 23 #android
    }

    videorecorder.record(options)
    .then((data)=>{
      console.log(JSON.stringify(data));
        GlobalSettings.video_file = data.file;
        console.log(GlobalSettings.video_file);
    })
    .catch((err)=>{
        console.log(err);
    })
  }
}
