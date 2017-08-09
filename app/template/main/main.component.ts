import { Component, ElementRef, ViewChild, Injectable, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { View } from "ui/core/view";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";

import { TNSFontIconService } from 'nativescript-ng2-fonticon';

import { StarDetailService } from "../../service/stardetail/stardetail.service";
import { GlobalSettings } from '../../globals/globals';

@Component({
  selector: "welcome",
  templateUrl: "template/main/main.html",
  styleUrls: ["template/main/main.css"]
})
export class MainComponent implements OnInit {
  private _currentNotification: string;
  private _sideDrawerTransition: sideDrawerModule.DrawerTransitionBase;
  public background_image: string = "~/images/logo.png";
  private navigationExtras: NavigationExtras;
  public title: string;

  constructor(private router: Router, private _page: Page,
    private _changeDetectionRef: ChangeDetectorRef,
    private starDetailService: StarDetailService,
  ) {
      this._page.on("loaded", this.onLoaded, this);
      this.title = "HOME";
  }

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: SideDrawerType;

  ngAfterViewInit() {
      this.drawer = this.drawerComponent.sideDrawer;
      this._changeDetectionRef.detectChanges();
  }

  ngOnInit() {
    this.getDetails();
  }

  getDetails () {
    this.starDetailService.get(GlobalSettings.access_token, GlobalSettings.star_id)
    .subscribe(res => {
      this.background_image = "http://developer.efanswer.com/" + res.star_details.background_image;
    }, err => {
      alert(JSON.stringify(err));
    });
  }

  public onLoaded(args) {
      this._sideDrawerTransition = new sideDrawerModule.PushTransition();
  }

  public get sideDrawerTransition(): sideDrawerModule.DrawerTransitionBase {
      return this._sideDrawerTransition;
  }

  public get currentNotification(): string {
      return this._currentNotification;
  }

  public openDrawer() {
      this.drawer.showDrawer();
  }

  public onDrawerOpening() {
      console.log("Drawer opening");
      this._currentNotification = "Drawer opening";
  }

  public onDrawerOpened() {
      console.log("Drawer opened");
      this._currentNotification = "Drawer opened";
  }

  public onDrawerClosing() {
      console.log("Drawer closing");
      this._currentNotification = "Drawer closing";
  }

  public onDrawerClosed() {
      console.log("Drawer closed");
      this._currentNotification = "Drawer closed";
  }

  public showAllFask () {
    this.title = "ALL FASK";
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
    this.drawer.closeDrawer();
  }

  public showAllChapter () {
    this.title = "CHAPTER";
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
    this.drawer.closeDrawer();
  }

  public showAllVerify () {
    this.title = "VERIFY";
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
    this.drawer.closeDrawer();
  }

  public showAllVFask () {
    this.title = "VIDEO FASK";
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
    this.drawer.closeDrawer();
  }

  public showAllCelebration () {
    this.title = "CELEBRATION";
    this.drawer.closeDrawer();
  }

  public logout() {
    this.router.navigate(["signin"]);
  }
}
