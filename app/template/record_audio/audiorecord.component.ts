import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Observable } from 'data/observable';
import { Router } from "@angular/router";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import {Page} from "ui/page";

import * as platform from 'platform';
import { knownFolders, File } from "file-system";
import { TNSRecorder, TNSPlayer, AudioPlayerOptions, AudioRecorderOptions } from 'nativescript-audio';
import { isAndroid, isIOS, device, screen } from "platform";

import { GlobalSettings } from '../../globals/globals';
import * as Toast from 'nativescript-toast';

import { EventData, PropertyChangeData } from "data/observable";

import { AudioPlayer, AudioPlayerState } from "nativescript-np-audioplayer";
import { AudioPlayerService } from "../../shared/audioplayer/audioplayer.service";

declare var android;

@Component({
  selector: "audiorecord",
  templateUrl: "template/record_audio/audiorecord.html",
  styleUrls: ["template/record_audio/audiorecord.css"]
})
export class AudioRecordComponent implements OnInit, OnDestroy {
  public recordState: number = 0;
  // 0 - waiting
  // 1 - recording
  // 2 - record-stop
  // 3 - playing
  // 4 - play-stop
  public recordedAudioFile: string;
  private recorder;
  private player;
  private audioSessionId;
  private page;
  private meterInterval: any;
  private recordedName: string;

  private timerId: number;
  private timeVal: number = 0;
  timerActivated = false;
  private durationTime: string = "00:00";

  private _playerPropertyChangedListener;
  // Your TypeScript logic goes here
  constructor(private router: Router, page: Page, private routerExtensions: RouterExtensions,
    private _audioPlayerService: AudioPlayerService) {
    page.actionBarHidden = true;

    this.player = new TNSPlayer();
    this.recorder = new TNSRecorder();
    this.player.volume = 1.0;

    this.recordedName = GlobalSettings.question_id + this.platformExtension();

  }

  ngOnInit () {
    this._audioPlayerService.on("propertyChange", this._playerPropertyChangedListener = (data: PropertyChangeData) => {
        console.log("****player state was updated******");
        console.log(data.propertyName);
        console.log(data.value);
        switch (data.propertyName) {
            case "state":
                break;
            case "position":
                break;
            case "duration":
                break;
            case "metadata":
                break;
            default:
                break;
        }
      });
  }

  ngOnDestroy() {
    this._audioPlayerService.off("propertyChange", this._playerPropertyChangedListener);
  }

  platformExtension() {
    var ex = "";

    if (isAndroid) {
      ex = ".mp3";
    } else if (isIOS) {
      ex = ".m4a";
    }

    return ex;
  }

  message (msg: string) {
    Toast.makeText(msg).show();
  }

  public backToItem () {
    console.log(this._audioPlayerService.state);
    this._audioPlayerService.off("propertyChange", this._playerPropertyChangedListener);

    if(this._audioPlayerService.state == AudioPlayerState.Playing || this._audioPlayerService.state == AudioPlayerState.Loading) {
      this._audioPlayerService.pause();
    }

    console.log(this._audioPlayerService.state);
    this.routerExtensions.back();
  }

  private initMeter() {
    this.resetMeter();
    this.meterInterval = setInterval(() => {
      // console.log(this.recorder.getMeters());
    }, 500);
  }

  private resetMeter() {
    if (this.meterInterval) {
      clearInterval(this.meterInterval);
      this.meterInterval = undefined;
    }
  }

  public setTime () {
    var minutes = Math.floor(this.timeVal / 60);
    var seconds = this.timeVal % 60;

    function str_pad_left(string,pad,length) {
      return (new Array(length+1).join(pad)+string).slice(-length);
    }
    var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    this.durationTime = finalTime;
  }

  private startTimer () {
    this.timeVal = 0;
    this.timerActivated = true;
    countTime();

    var that = this;

    function countTime () {
      setTimeout (() => {
        if (that.timerActivated) {
          that.timeVal++;
          that.setTime();
          countTime();
        }
      }, 1000);
    }
  }

  private stopTimer () {
    this.timerActivated = false;
  }

  public recordStart (args: any) {
    if (TNSRecorder.CAN_RECORD()) {
      console.log("This device can record audio");

      var audioFolder = knownFolders.documents().getFolder("audio");
      console.log(JSON.stringify(audioFolder));


      let recordingPath = audioFolder.path + "/" + this.recordedName;
      let recorderOptions: AudioRecorderOptions = {

        filename: recordingPath,
        metering: true,

        infoCallback: (infoObject) => {
          console.log("File information: " + JSON.stringify(infoObject));
        },

        errorCallback: (errorObject) => {
          console.log("Record Error: " + JSON.stringify(errorObject));
        }
      };

      this.recorder.start(recorderOptions).then((result) => {
        this.startTimer();
        this.recordState = 1;
        if (recorderOptions.metering) {
          this.initMeter();
        }
      }, (err) => {
        this.recordState = 0;
        this.resetMeter();
        console.log(err);
      });

    } else {
      alert("This device cannot record audio");
    }
  }

  public recordStop(args: any) {
    this.resetMeter();
    this.recorder.stop().then(() => {
      this.recorder.dispose().then(() => {
        console.log("Recording is stoped.");
        this.stopTimer();
        this.resetMeter();
        var audioFolder = knownFolders.documents().getFolder("audio");
        GlobalSettings.audio_file = audioFolder.path + "/" + this.recordedName;
        this.recordState = 0;
      }, (ex) => {
        console.log(ex);
      });
    }, (ex) => {
      this.recordState = 0;
      this.stopTimer();
      this.resetMeter();
    });
  }

  public isRecorded () {
    var retVal = false;
    if (GlobalSettings.audio_file != "") {
        retVal = true;
    }
    return retVal;
  }


  public playRecordedFile(args) {
    if (this.isRecorded()) {
      var audioFolder = knownFolders.documents().getFolder("audio");
      var recordedFile = audioFolder.getFile(this.recordedName);

      try {
        console.log('recording exists: ' + File.exists(recordedFile.path));
        console.log(recordedFile.path);
        this.recordedAudioFile = recordedFile.path;
      } catch (ex) {
        console.log(ex);
      }

      if (isAndroid) {
        var playerOptions: AudioPlayerOptions = {
          audioFile: recordedFile.path,
          loop: false,
          completeCallback: () => {
            this.player.dispose().then(() => {
              console.log('DISPOSED');
              this.stopTimer();
              this.recordState = 0;
            }, (err) => {
              console.log(err);
            });
          },

          errorCallback: (errorObject) => {
            console.log("Play Error: " + JSON.stringify(errorObject));
          },

          infoCallback: (infoObject) => {
            console.log("File information: " + JSON.stringify(infoObject));
          }
        };

        this.player.playFromFile(playerOptions).then(() => {
          this.startTimer();
          console.log("playing");
        }, (err) => {
          console.log("playing error");
        });
      } else if (isIOS) {
        if (this._audioPlayerService.state != AudioPlayerState.Playing) {
          this._audioPlayerService.loadAudio("file://" + recordedFile.path, true);
          console.log("start loading");
        }
      }

    } else {
      this.message("No file you recorded for this fask. Please record your reply, first.");
    }
  }
}
