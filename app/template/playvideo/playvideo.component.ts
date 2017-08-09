import { Component } from "@angular/core";
import { Observable } from 'data/observable';
import { Router } from "@angular/router";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {Page} from "ui/page";
import { GlobalSettings } from '../../globals/globals';

import {registerElement} from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

@Component({
  selector: "playvideo",
  templateUrl: "template/playvideo/playvideo.html",
  styleUrls: ["template/playvideo/playvideo.css"]
})
export class PlayVideoComponent extends Observable {
  constructor(private router: Router, page: Page, private routerExtensions: RouterExtensions) {
    super();
    page.actionBarHidden = true;
  }

  public backToItem () {
    this.routerExtensions.back();
  }

  public getVideo () {
    var retVal = "";
    retVal = GlobalSettings.video_file;
    return retVal;
  }
}
