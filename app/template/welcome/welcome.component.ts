import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {Page} from "ui/page";
import { View } from "ui/core/view";

import { LoadingIndicator } from 'nativescript-loading-indicator';

import { WalkthroughsService } from "../../service/walkthroughs/walkthroughs.service";

@Component({
  selector: "welcome",
  templateUrl: "template/welcome/welcome.html",
  styleUrls: ["template/welcome/welcome.css"]
})

export class WelcomeComponent implements OnInit {

  private indicator: LoadingIndicator;
  private walkthroughs: any = [];
  private walkthrough_count: any;
  private walkthrough_index: any;
  public walkthrough_text: string;
  public indicators_width: number = 0
  // Your TypeScript logic goes here
  constructor(private router: Router, private page: Page, private walkthroughService: WalkthroughsService) {
    page.actionBarHidden = true;
    this.indicator = new LoadingIndicator();
  }

  ngAfterViewInit () {

  }

  ngOnInit () {
    this.showLoading("Loading...");

    this.walkthroughService.get()
    .subscribe(res => {
      console.log(JSON.stringify(res.walkthroughs));
      this.initWalkthroughs(res.walkthroughs);
      this.startDescribe();
      this.hideLoading();
    }, err => {
      console.log(err);
      this.hideLoading();
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

  initWalkthroughs (items) {
    this.walkthroughs = items;
    this.walkthrough_index = 0;
    this.walkthrough_count = this.walkthroughs.length;

    this.indicators_width = 30 * this.walkthrough_count;
  }

  startDescribe () {
    this.walkthrough_text = this.walkthroughs[this.walkthrough_index].Text;
    setTimeout (() => {
      this.walkthrough_index++;
      if (this.walkthrough_index == this.walkthrough_count) {
        this.walkthrough_index = 0;
      }
      this.startDescribe();
    }, 3000);
  }

  public getOpacity (index) {
    var retVal = 1.0;
    if (index == this.walkthrough_index) {
      retVal = 0.5;
    }
    return retVal;
  }

  getStart() {
    this.router.navigate(["/signin"]);
  }
}
