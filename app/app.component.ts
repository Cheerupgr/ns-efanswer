import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

@Component({
  selector: "main",
  templateUrl: "app.html"
})
export class AppComponent {
  // Your TypeScript logic goes here
  constructor(private router: Router) {

  }

  getStart() {
    this.router.navigate(["/signin"]);
  }
}
