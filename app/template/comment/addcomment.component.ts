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
import { DoCommentFeedService } from '../../service/docommentonfeed/docommentonfeed.service';

import { LoadingIndicator } from 'nativescript-loading-indicator';
import * as Toast from 'nativescript-toast';

@Component({
  selector: "addcomment",
  templateUrl: "template/comment/addcomment.html",
  styleUrls: ["template/comment/addcomment.css"]
})
// >> listview-getting-started-angular
export class AddCommentComponent implements OnInit {
  private item: any = {};
  private parent_list: string = "";
  private navigationExtras: NavigationExtras;
  private indicator: LoadingIndicator;

  constructor(private page: Page, private router: Router, private activeRoute: ActivatedRoute,
    private douponfeedService: DouponFeedService, private doCommentFeedService: DoCommentFeedService) {
    this.activeRoute.queryParams.subscribe(params => {
      this.item = JSON.parse(params["item"]);
      this.parent_list = params["parent_list"];
    });
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

  public onCancel (item) {
    if (this.item.answer_text) {
      this.item.answer_text = "";
    }
    this.backToList();
  }

  public onOk (item) {
    this.showLoading("Saving...");
    if (this.item.answer_text) {
      this.doCommentFeedService
      .docomment(GlobalSettings.access_token, this.item.question_id, this.item.answer_text)
      .subscribe(res => {
        this.hideLoading();
        this.message("You commented on this fask.");
        this.backToList();
      }, err => {
        this.hideLoading();
        this.message("Error. Please try later.");
      })
    }
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
}
