import { SigninComponent } from "./template/signin/signin.component";
import { WelcomeComponent } from "./template/welcome/welcome.component";
import { MainComponent } from "./template/main/main.component";
import { FasklistComponent } from "./template/fasklist/fasklist.component";
import { VideofaskComponent } from "./template/videofask/videofask.component";
import { VerifyfaskComponent } from "./template/verifyfask/verifyfask.component";
import { ChaptersComponent } from "./template/chapterfask/chapterfask.component";
import { AddCommentComponent } from "./template/comment/addcomment.component";
import { FanswerComponent } from "./template/fanswer/fanswer.component";
import { AudioRecordComponent } from "./template/record_audio/audiorecord.component";
import { PlayVideoComponent } from "./template/playvideo/playvideo.component";

export const routes = [
  { path: "", component: WelcomeComponent },
  { path: "signin", component: SigninComponent },
  { path: "audiorecord", component: AudioRecordComponent },
  { path: "playvideo", component: PlayVideoComponent },
  { path: "main", component: MainComponent, children: [
    { path: "fasklist", component: FasklistComponent, outlet: 'mainoutlet'},
    { path: "videofask", component: VideofaskComponent, outlet: 'mainoutlet'},
    { path: "verifyfask", component: VerifyfaskComponent, outlet: 'mainoutlet'},
    { path: "chapterfask", component: ChaptersComponent, outlet: 'mainoutlet'},
    { path: "addcomment", component: AddCommentComponent, outlet: 'mainoutlet'},
    { path: "fanswer", component: FanswerComponent, outlet: 'mainoutlet'},
  ]}
];

export const navigatableComponents = [
  WelcomeComponent,
  SigninComponent,
  MainComponent,
  FasklistComponent,
  VideofaskComponent,
  VerifyfaskComponent,
  ChaptersComponent,
  AddCommentComponent,
  FanswerComponent,
  AudioRecordComponent,
  PlayVideoComponent
];
