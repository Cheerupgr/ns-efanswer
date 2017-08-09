import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {Page} from "ui/page";
import { TextField } from "ui/text-field";

import { User } from "../../shared/user/user";
import { UserService } from "../../service/user/user.service";
import { GlobalSettings } from '../../globals/globals';

import { LoadingIndicator } from 'nativescript-loading-indicator';
import * as Toast from 'nativescript-toast';

@Component({
  selector: "signin",
  templateUrl: "template/signin/signin.html",
  styleUrls: ["template/signin/signin.css"]
})
export class SigninComponent {
  user: any = {};
  private indicator: LoadingIndicator;
  // Your TypeScript logic goes here
  constructor(private router: Router, page: Page, private routerExtensions: RouterExtensions, private userService: UserService) {
    page.actionBarHidden = true;

    this.user = {
      email: "lorenzo.brach@sportsuite.it",
      password: "giorgio2017"
    };
    this.indicator = new LoadingIndicator();
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

  checkLoginInfo () {
    var retVal = false;

    if (this.user.email && this.user.password) {
      retVal = true;
    } else {
      alert("Please input correct email address and password.");
    }

    return retVal;
  }

  goMainScreen () {
    this.routerExtensions.navigate(
      [
        "main"
      ],
      {
        clearHistory: true
      }
    );
  }

  public passwordFieldLoaded (args){
      var textF:TextField = <TextField>args.object;
      textF.secure=true;
  }

  signin () {
    var valid = this.checkLoginInfo();
    if (valid) {
      this.showLoading("Signing in...");
      this.userService
          .login(this.user)
          .subscribe(res => {
            this.hideLoading();
            GlobalSettings.access_token = res.token;
            GlobalSettings.star_id = res.star_id;
            this.message("You\'ve signed in successfully.");
            this.goMainScreen();
          }, err => {
            this.hideLoading();
            this.message("Error. please try later");
          });
    }
  }

  forgot () {

  }

  signup () {

  }
}
