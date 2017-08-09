import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { ObservableArray } from "data/observable-array";
import { RadListView, ListViewEventData, ListViewLoadOnDemandMode } from "nativescript-telerik-ui/listview";
import { GestureEventData } from "ui/gestures";

import { FasksService } from "../../service/fasks/fasks.service";
import { GlobalSettings } from '../../globals/globals';
import { LoadingIndicator } from 'nativescript-loading-indicator';

@Component({
  selector: "fasklist",
  templateUrl: "template/fasklist/fasklist.html",
  styleUrls: ["template/fasklist/fasklist.css"]
})
// >> listview-getting-started-angular
export class FasklistComponent implements OnInit {
  private fasks: any = [];
  private page: number = 0;
  private str_use: string;
  private indicator: LoadingIndicator;
  private navigationExtras: NavigationExtras;

  constructor(private router: Router, private fasksService: FasksService,
    private activeRoute: ActivatedRoute) {
      this.indicator = new LoadingIndicator();
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
        this.str_use = params["str_use"];
    });

    this.showLoading("Loading...");
    this.fasksService.get(GlobalSettings.access_token, this.str_use, this.page * 10)
    .subscribe(res => {
      this.hideLoading();
      this.fasks = res.questions.question_list;
    }, err => {
      this.hideLoading();
      alert("Error. please try later");
    });
  }

  public onLoadMoreItemsRequested(args: ListViewEventData) {
    this.page++;
    let listView: RadListView = args.object;
    this.fasksService.get(GlobalSettings.access_token, this.str_use, this.page * 10)
    .subscribe(res => {
      if (res.questions.question_list.length > 0) {
        this.fasks = [];
        this.fasks = res.questions.question_list;
      }
      listView.notifyLoadOnDemandFinished();
    }, err => {
      alert("Error. please try later");
      listView.notifyLoadOnDemandFinished();
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

  public onPullToRefreshInitiated(args: ListViewEventData) {
    if (this.page > 0) {
      this.page--;
    }
    let listView: RadListView = args.object;
    this.fasksService.get(GlobalSettings.access_token, this.str_use, this.page * 10)
    .subscribe(res => {
      if (res.questions.question_list.length > 0) {
        this.fasks = [];
        this.fasks = res.questions.question_list;
      }
      listView.notifyPullToRefreshFinished();
    }, err => {
      alert("Error. please try later");
      listView.notifyPullToRefreshFinished();
    });
  }

  initRecordFiles () {
    GlobalSettings.audio_file = "";
    GlobalSettings.video_file = "";
  }

  public onFanswer (args) {
    var selected_id = args.object.thisitem;
    GlobalSettings.question_id = selected_id;

    var item = this.fasks.filter(fask => fask.question_id == selected_id)[0];

    this.initRecordFiles();

    this.navigationExtras = {
      queryParams: {
        "parent_list": "all",
        "item": JSON.stringify(item)
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

  public onComment (args) {
    var selected_id = args.object.thisitem;
    GlobalSettings.question_id = selected_id;

    var item = this.fasks.filter(fask => fask.question_id == selected_id)[0];

    this.navigationExtras = {
      queryParams: {
        "parent_list": "all",
        "item": JSON.stringify(item)
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

  public onLike (args) {
    var selected_id = args.object.thisitem;
    GlobalSettings.question_id = selected_id;

    var item = this.fasks.filter(fask => fask.question_id == selected_id)[0];
  }
}
