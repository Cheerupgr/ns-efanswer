import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";
import { NativeScriptUIListViewModule } from 'nativescript-telerik-ui/listview/angular';

import { TNSFontIconModule } from 'nativescript-ng2-fonticon';

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";

import { UserService } from "./service/user/user.service";
import { StarDetailService } from "./service/stardetail/stardetail.service";
import { WalkthroughsService } from "./service/walkthroughs/walkthroughs.service";
import { FasksService } from "./service/fasks/fasks.service";
import { DouponFeedService } from "./service/douponfeed/douponfeed.service";
import { DoCommentFeedService } from "./service/docommentonfeed/docommentonfeed.service";
import { FanswerService } from "./service/fanswer/fanswer.service";
import { FileUploadService } from "./service/fileupload/fileupload.service";
import { GlobalSettings } from './globals/globals';

import { AudioPlayerService } from "./shared/audioplayer/audioplayer.service";

@NgModule({
  declarations: [
    AppComponent,
    navigatableComponents
  ],
  bootstrap: [AppComponent],
  imports: [
    TNSFontIconModule.forRoot({
      'mdi': 'material-design-icons.css'
    }),
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptUISideDrawerModule,
    NativeScriptUIListViewModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    UserService,
    StarDetailService,
    WalkthroughsService,
    FasksService,
    DouponFeedService,
    DoCommentFeedService,
    FanswerService,
    FileUploadService,
    GlobalSettings,
    AudioPlayerService
  ]
})
export class AppModule {}
