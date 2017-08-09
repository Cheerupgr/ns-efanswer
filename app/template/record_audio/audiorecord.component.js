"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var file_system_1 = require("file-system");
var nativescript_audio_1 = require("nativescript-audio");
var platform_1 = require("platform");
var globals_1 = require("../../globals/globals");
var Toast = require("nativescript-toast");
var nativescript_np_audioplayer_1 = require("nativescript-np-audioplayer");
var audioplayer_service_1 = require("../../shared/audioplayer/audioplayer.service");
var AudioRecordComponent = (function () {
    // Your TypeScript logic goes here
    function AudioRecordComponent(router, page, routerExtensions, _audioPlayerService) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this._audioPlayerService = _audioPlayerService;
        this.recordState = 0;
        this.timeVal = 0;
        this.timerActivated = false;
        this.durationTime = "00:00";
        page.actionBarHidden = true;
        this.player = new nativescript_audio_1.TNSPlayer();
        this.recorder = new nativescript_audio_1.TNSRecorder();
        this.player.volume = 1.0;
        this.recordedName = globals_1.GlobalSettings.question_id + this.platformExtension();
    }
    AudioRecordComponent.prototype.ngOnInit = function () {
        this._audioPlayerService.on("propertyChange", this._playerPropertyChangedListener = function (data) {
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
    };
    AudioRecordComponent.prototype.ngOnDestroy = function () {
        this._audioPlayerService.off("propertyChange", this._playerPropertyChangedListener);
    };
    AudioRecordComponent.prototype.platformExtension = function () {
        var ex = "";
        if (platform_1.isAndroid) {
            ex = ".mp3";
        }
        else if (platform_1.isIOS) {
            ex = ".m4a";
        }
        return ex;
    };
    AudioRecordComponent.prototype.message = function (msg) {
        Toast.makeText(msg).show();
    };
    AudioRecordComponent.prototype.backToItem = function () {
        console.log(this._audioPlayerService.state);
        this._audioPlayerService.off("propertyChange", this._playerPropertyChangedListener);
        if (this._audioPlayerService.state == nativescript_np_audioplayer_1.AudioPlayerState.Playing || this._audioPlayerService.state == nativescript_np_audioplayer_1.AudioPlayerState.Loading) {
            this._audioPlayerService.pause();
        }
        console.log(this._audioPlayerService.state);
        this.routerExtensions.back();
    };
    AudioRecordComponent.prototype.initMeter = function () {
        this.resetMeter();
        this.meterInterval = setInterval(function () {
            // console.log(this.recorder.getMeters());
        }, 500);
    };
    AudioRecordComponent.prototype.resetMeter = function () {
        if (this.meterInterval) {
            clearInterval(this.meterInterval);
            this.meterInterval = undefined;
        }
    };
    AudioRecordComponent.prototype.setTime = function () {
        var minutes = Math.floor(this.timeVal / 60);
        var seconds = this.timeVal % 60;
        function str_pad_left(string, pad, length) {
            return (new Array(length + 1).join(pad) + string).slice(-length);
        }
        var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
        this.durationTime = finalTime;
    };
    AudioRecordComponent.prototype.startTimer = function () {
        this.timeVal = 0;
        this.timerActivated = true;
        countTime();
        var that = this;
        function countTime() {
            setTimeout(function () {
                if (that.timerActivated) {
                    that.timeVal++;
                    that.setTime();
                    countTime();
                }
            }, 1000);
        }
    };
    AudioRecordComponent.prototype.stopTimer = function () {
        this.timerActivated = false;
    };
    AudioRecordComponent.prototype.recordStart = function (args) {
        var _this = this;
        if (nativescript_audio_1.TNSRecorder.CAN_RECORD()) {
            console.log("This device can record audio");
            var audioFolder = file_system_1.knownFolders.documents().getFolder("audio");
            console.log(JSON.stringify(audioFolder));
            var recordingPath = audioFolder.path + "/" + this.recordedName;
            var recorderOptions_1 = {
                filename: recordingPath,
                metering: true,
                infoCallback: function (infoObject) {
                    console.log("File information: " + JSON.stringify(infoObject));
                },
                errorCallback: function (errorObject) {
                    console.log("Record Error: " + JSON.stringify(errorObject));
                }
            };
            this.recorder.start(recorderOptions_1).then(function (result) {
                _this.startTimer();
                _this.recordState = 1;
                if (recorderOptions_1.metering) {
                    _this.initMeter();
                }
            }, function (err) {
                _this.recordState = 0;
                _this.resetMeter();
                console.log(err);
            });
        }
        else {
            alert("This device cannot record audio");
        }
    };
    AudioRecordComponent.prototype.recordStop = function (args) {
        var _this = this;
        this.resetMeter();
        this.recorder.stop().then(function () {
            _this.recorder.dispose().then(function () {
                console.log("Recording is stoped.");
                _this.stopTimer();
                _this.resetMeter();
                var audioFolder = file_system_1.knownFolders.documents().getFolder("audio");
                globals_1.GlobalSettings.audio_file = audioFolder.path + "/" + _this.recordedName;
                _this.recordState = 0;
            }, function (ex) {
                console.log(ex);
            });
        }, function (ex) {
            _this.recordState = 0;
            _this.stopTimer();
            _this.resetMeter();
        });
    };
    AudioRecordComponent.prototype.isRecorded = function () {
        var retVal = false;
        if (globals_1.GlobalSettings.audio_file != "") {
            retVal = true;
        }
        return retVal;
    };
    AudioRecordComponent.prototype.playRecordedFile = function (args) {
        var _this = this;
        if (this.isRecorded()) {
            var audioFolder = file_system_1.knownFolders.documents().getFolder("audio");
            var recordedFile = audioFolder.getFile(this.recordedName);
            try {
                console.log('recording exists: ' + file_system_1.File.exists(recordedFile.path));
                console.log(recordedFile.path);
                this.recordedAudioFile = recordedFile.path;
            }
            catch (ex) {
                console.log(ex);
            }
            if (platform_1.isAndroid) {
                var playerOptions = {
                    audioFile: recordedFile.path,
                    loop: false,
                    completeCallback: function () {
                        _this.player.dispose().then(function () {
                            console.log('DISPOSED');
                            _this.stopTimer();
                            _this.recordState = 0;
                        }, function (err) {
                            console.log(err);
                        });
                    },
                    errorCallback: function (errorObject) {
                        console.log("Play Error: " + JSON.stringify(errorObject));
                    },
                    infoCallback: function (infoObject) {
                        console.log("File information: " + JSON.stringify(infoObject));
                    }
                };
                this.player.playFromFile(playerOptions).then(function () {
                    _this.startTimer();
                    console.log("playing");
                }, function (err) {
                    console.log("playing error");
                });
            }
            else if (platform_1.isIOS) {
                if (this._audioPlayerService.state != nativescript_np_audioplayer_1.AudioPlayerState.Playing) {
                    this._audioPlayerService.loadAudio("file://" + recordedFile.path, true);
                    console.log("start loading");
                }
            }
        }
        else {
            this.message("No file you recorded for this fask. Please record your reply, first.");
        }
    };
    return AudioRecordComponent;
}());
AudioRecordComponent = __decorate([
    core_1.Component({
        selector: "audiorecord",
        templateUrl: "template/record_audio/audiorecord.html",
        styleUrls: ["template/record_audio/audiorecord.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page, router_2.RouterExtensions,
        audioplayer_service_1.AudioPlayerService])
], AudioRecordComponent);
exports.AudioRecordComponent = AudioRecordComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW9yZWNvcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXVkaW9yZWNvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdGO0FBRWhGLDBDQUF5QztBQUN6QyxzREFBMEU7QUFFMUUsZ0NBQTZCO0FBRzdCLDJDQUFpRDtBQUNqRCx5REFBc0c7QUFDdEcscUNBQTREO0FBRTVELGlEQUF1RDtBQUN2RCwwQ0FBNEM7QUFJNUMsMkVBQTRFO0FBQzVFLG9GQUFrRjtBQVNsRixJQUFhLG9CQUFvQjtJQXFCL0Isa0NBQWtDO0lBQ2xDLDhCQUFvQixNQUFjLEVBQUUsSUFBVSxFQUFVLGdCQUFrQyxFQUNoRixtQkFBdUM7UUFEN0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFzQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2hGLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBb0I7UUF0QjFDLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBZXZCLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFDNUIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDZixpQkFBWSxHQUFXLE9BQU8sQ0FBQztRQU1yQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUU1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksOEJBQVMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnQ0FBVyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBRXpCLElBQUksQ0FBQyxZQUFZLEdBQUcsd0JBQWMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFFNUUsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyw4QkFBOEIsR0FBRyxVQUFDLElBQXdCO1lBQ3pHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSyxPQUFPO29CQUNSLEtBQUssQ0FBQztnQkFDVixLQUFLLFVBQVU7b0JBQ1gsS0FBSyxDQUFDO2dCQUNWLEtBQUssVUFBVTtvQkFDWCxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxVQUFVO29CQUNYLEtBQUssQ0FBQztnQkFDVjtvQkFDSSxLQUFLLENBQUM7WUFDZCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELGdEQUFpQixHQUFqQjtRQUNFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUVaLEVBQUUsQ0FBQyxDQUFDLG9CQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNkLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQUssQ0FBQyxDQUFDLENBQUM7WUFDakIsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNkLENBQUM7UUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELHNDQUFPLEdBQVAsVUFBUyxHQUFXO1FBQ2xCLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLHlDQUFVLEdBQWpCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUVwRixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxJQUFJLDhDQUFnQixDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxJQUFJLDhDQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUgsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVPLHdDQUFTLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1lBQy9CLDBDQUEwQztRQUM1QyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRU8seUNBQVUsR0FBbEI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN2QixhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBRU0sc0NBQU8sR0FBZDtRQUNFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUVoQyxzQkFBc0IsTUFBTSxFQUFDLEdBQUcsRUFBQyxNQUFNO1lBQ3JDLE1BQU0sQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxZQUFZLENBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBRU8seUNBQVUsR0FBbEI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixTQUFTLEVBQUUsQ0FBQztRQUVaLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQjtZQUNFLFVBQVUsQ0FBRTtnQkFDVixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNmLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDZixTQUFTLEVBQUUsQ0FBQztnQkFDZCxDQUFDO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1gsQ0FBQztJQUNILENBQUM7SUFFTyx3Q0FBUyxHQUFqQjtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFTSwwQ0FBVyxHQUFsQixVQUFvQixJQUFTO1FBQTdCLGlCQXNDQztRQXJDQyxFQUFFLENBQUMsQ0FBQyxnQ0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFFNUMsSUFBSSxXQUFXLEdBQUcsMEJBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFHekMsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUMvRCxJQUFJLGlCQUFlLEdBQXlCO2dCQUUxQyxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLElBQUk7Z0JBRWQsWUFBWSxFQUFFLFVBQUMsVUFBVTtvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBRUQsYUFBYSxFQUFFLFVBQUMsV0FBVztvQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELENBQUM7YUFDRixDQUFDO1lBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsaUJBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07Z0JBQy9DLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLGlCQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDN0IsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNuQixDQUFDO1lBQ0gsQ0FBQyxFQUFFLFVBQUMsR0FBRztnQkFDTCxLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUwsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDM0MsQ0FBQztJQUNILENBQUM7SUFFTSx5Q0FBVSxHQUFqQixVQUFrQixJQUFTO1FBQTNCLGlCQWtCQztRQWpCQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksV0FBVyxHQUFHLDBCQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5RCx3QkFBYyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN2RSxLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDLEVBQUUsVUFBQyxFQUFFO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUUsVUFBQyxFQUFFO1lBQ0osS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSx5Q0FBVSxHQUFqQjtRQUNFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyx3QkFBYyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUdNLCtDQUFnQixHQUF2QixVQUF3QixJQUFJO1FBQTVCLGlCQW9EQztRQW5EQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksV0FBVyxHQUFHLDBCQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELElBQUksWUFBWSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTFELElBQUksQ0FBQztnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLGtCQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDN0MsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxhQUFhLEdBQXVCO29CQUN0QyxTQUFTLEVBQUUsWUFBWSxDQUFDLElBQUk7b0JBQzVCLElBQUksRUFBRSxLQUFLO29CQUNYLGdCQUFnQixFQUFFO3dCQUNoQixLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQzs0QkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDeEIsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzRCQUNqQixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzt3QkFDdkIsQ0FBQyxFQUFFLFVBQUMsR0FBRzs0QkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDO29CQUVELGFBQWEsRUFBRSxVQUFDLFdBQVc7d0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDNUQsQ0FBQztvQkFFRCxZQUFZLEVBQUUsVUFBQyxVQUFVO3dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDakUsQ0FBQztpQkFDRixDQUFDO2dCQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDM0MsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6QixDQUFDLEVBQUUsVUFBQyxHQUFHO29CQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQztnQkFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssSUFBSSw4Q0FBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMvQixDQUFDO1lBQ0gsQ0FBQztRQUVILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsc0VBQXNFLENBQUMsQ0FBQztRQUN2RixDQUFDO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQS9QRCxJQStQQztBQS9QWSxvQkFBb0I7SUFMaEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFdBQVcsRUFBRSx3Q0FBd0M7UUFDckQsU0FBUyxFQUFFLENBQUMsdUNBQXVDLENBQUM7S0FDckQsQ0FBQztxQ0F1QjRCLGVBQU0sRUFBUSxXQUFJLEVBQTRCLHlCQUFnQjtRQUMzRCx3Q0FBa0I7R0F2QnRDLG9CQUFvQixDQStQaEM7QUEvUFksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zLCBQYWdlUm91dGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUTlNGb250SWNvblNlcnZpY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtbmcyLWZvbnRpY29uJztcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcblxuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSAncGxhdGZvcm0nO1xuaW1wb3J0IHsga25vd25Gb2xkZXJzLCBGaWxlIH0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgeyBUTlNSZWNvcmRlciwgVE5TUGxheWVyLCBBdWRpb1BsYXllck9wdGlvbnMsIEF1ZGlvUmVjb3JkZXJPcHRpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWF1ZGlvJztcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5cbmltcG9ydCB7IEdsb2JhbFNldHRpbmdzIH0gZnJvbSAnLi4vLi4vZ2xvYmFscy9nbG9iYWxzJztcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XG5cbmltcG9ydCB7IEV2ZW50RGF0YSwgUHJvcGVydHlDaGFuZ2VEYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuXG5pbXBvcnQgeyBBdWRpb1BsYXllciwgQXVkaW9QbGF5ZXJTdGF0ZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbnAtYXVkaW9wbGF5ZXJcIjtcbmltcG9ydCB7IEF1ZGlvUGxheWVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvYXVkaW9wbGF5ZXIvYXVkaW9wbGF5ZXIuc2VydmljZVwiO1xuXG5kZWNsYXJlIHZhciBhbmRyb2lkO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiYXVkaW9yZWNvcmRcIixcbiAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGUvcmVjb3JkX2F1ZGlvL2F1ZGlvcmVjb3JkLmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJ0ZW1wbGF0ZS9yZWNvcmRfYXVkaW8vYXVkaW9yZWNvcmQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEF1ZGlvUmVjb3JkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwdWJsaWMgcmVjb3JkU3RhdGU6IG51bWJlciA9IDA7XG4gIC8vIDAgLSB3YWl0aW5nXG4gIC8vIDEgLSByZWNvcmRpbmdcbiAgLy8gMiAtIHJlY29yZC1zdG9wXG4gIC8vIDMgLSBwbGF5aW5nXG4gIC8vIDQgLSBwbGF5LXN0b3BcbiAgcHVibGljIHJlY29yZGVkQXVkaW9GaWxlOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVjb3JkZXI7XG4gIHByaXZhdGUgcGxheWVyO1xuICBwcml2YXRlIGF1ZGlvU2Vzc2lvbklkO1xuICBwcml2YXRlIHBhZ2U7XG4gIHByaXZhdGUgbWV0ZXJJbnRlcnZhbDogYW55O1xuICBwcml2YXRlIHJlY29yZGVkTmFtZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgdGltZXJJZDogbnVtYmVyO1xuICBwcml2YXRlIHRpbWVWYWw6IG51bWJlciA9IDA7XG4gIHRpbWVyQWN0aXZhdGVkID0gZmFsc2U7XG4gIHByaXZhdGUgZHVyYXRpb25UaW1lOiBzdHJpbmcgPSBcIjAwOjAwXCI7XG5cbiAgcHJpdmF0ZSBfcGxheWVyUHJvcGVydHlDaGFuZ2VkTGlzdGVuZXI7XG4gIC8vIFlvdXIgVHlwZVNjcmlwdCBsb2dpYyBnb2VzIGhlcmVcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgX2F1ZGlvUGxheWVyU2VydmljZTogQXVkaW9QbGF5ZXJTZXJ2aWNlKSB7XG4gICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgVE5TUGxheWVyKCk7XG4gICAgdGhpcy5yZWNvcmRlciA9IG5ldyBUTlNSZWNvcmRlcigpO1xuICAgIHRoaXMucGxheWVyLnZvbHVtZSA9IDEuMDtcblxuICAgIHRoaXMucmVjb3JkZWROYW1lID0gR2xvYmFsU2V0dGluZ3MucXVlc3Rpb25faWQgKyB0aGlzLnBsYXRmb3JtRXh0ZW5zaW9uKCk7XG5cbiAgfVxuXG4gIG5nT25Jbml0ICgpIHtcbiAgICB0aGlzLl9hdWRpb1BsYXllclNlcnZpY2Uub24oXCJwcm9wZXJ0eUNoYW5nZVwiLCB0aGlzLl9wbGF5ZXJQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lciA9IChkYXRhOiBQcm9wZXJ0eUNoYW5nZURhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCIqKioqcGxheWVyIHN0YXRlIHdhcyB1cGRhdGVkKioqKioqXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnByb3BlcnR5TmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEudmFsdWUpO1xuICAgICAgICBzd2l0Y2ggKGRhdGEucHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwic3RhdGVcIjpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwb3NpdGlvblwiOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImR1cmF0aW9uXCI6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWV0YWRhdGFcIjpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fYXVkaW9QbGF5ZXJTZXJ2aWNlLm9mZihcInByb3BlcnR5Q2hhbmdlXCIsIHRoaXMuX3BsYXllclByb3BlcnR5Q2hhbmdlZExpc3RlbmVyKTtcbiAgfVxuXG4gIHBsYXRmb3JtRXh0ZW5zaW9uKCkge1xuICAgIHZhciBleCA9IFwiXCI7XG5cbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICBleCA9IFwiLm1wM1wiO1xuICAgIH0gZWxzZSBpZiAoaXNJT1MpIHtcbiAgICAgIGV4ID0gXCIubTRhXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4O1xuICB9XG5cbiAgbWVzc2FnZSAobXNnOiBzdHJpbmcpIHtcbiAgICBUb2FzdC5tYWtlVGV4dChtc2cpLnNob3coKTtcbiAgfVxuXG4gIHB1YmxpYyBiYWNrVG9JdGVtICgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9hdWRpb1BsYXllclNlcnZpY2Uuc3RhdGUpO1xuICAgIHRoaXMuX2F1ZGlvUGxheWVyU2VydmljZS5vZmYoXCJwcm9wZXJ0eUNoYW5nZVwiLCB0aGlzLl9wbGF5ZXJQcm9wZXJ0eUNoYW5nZWRMaXN0ZW5lcik7XG5cbiAgICBpZih0aGlzLl9hdWRpb1BsYXllclNlcnZpY2Uuc3RhdGUgPT0gQXVkaW9QbGF5ZXJTdGF0ZS5QbGF5aW5nIHx8IHRoaXMuX2F1ZGlvUGxheWVyU2VydmljZS5zdGF0ZSA9PSBBdWRpb1BsYXllclN0YXRlLkxvYWRpbmcpIHtcbiAgICAgIHRoaXMuX2F1ZGlvUGxheWVyU2VydmljZS5wYXVzZSgpO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKHRoaXMuX2F1ZGlvUGxheWVyU2VydmljZS5zdGF0ZSk7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdE1ldGVyKCkge1xuICAgIHRoaXMucmVzZXRNZXRlcigpO1xuICAgIHRoaXMubWV0ZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucmVjb3JkZXIuZ2V0TWV0ZXJzKCkpO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0TWV0ZXIoKSB7XG4gICAgaWYgKHRoaXMubWV0ZXJJbnRlcnZhbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLm1ldGVySW50ZXJ2YWwpO1xuICAgICAgdGhpcy5tZXRlckludGVydmFsID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRUaW1lICgpIHtcbiAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IodGhpcy50aW1lVmFsIC8gNjApO1xuICAgIHZhciBzZWNvbmRzID0gdGhpcy50aW1lVmFsICUgNjA7XG5cbiAgICBmdW5jdGlvbiBzdHJfcGFkX2xlZnQoc3RyaW5nLHBhZCxsZW5ndGgpIHtcbiAgICAgIHJldHVybiAobmV3IEFycmF5KGxlbmd0aCsxKS5qb2luKHBhZCkrc3RyaW5nKS5zbGljZSgtbGVuZ3RoKTtcbiAgICB9XG4gICAgdmFyIGZpbmFsVGltZSA9IHN0cl9wYWRfbGVmdChtaW51dGVzLCcwJywyKSsnOicrc3RyX3BhZF9sZWZ0KHNlY29uZHMsJzAnLDIpO1xuICAgIHRoaXMuZHVyYXRpb25UaW1lID0gZmluYWxUaW1lO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFRpbWVyICgpIHtcbiAgICB0aGlzLnRpbWVWYWwgPSAwO1xuICAgIHRoaXMudGltZXJBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGNvdW50VGltZSgpO1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gY291bnRUaW1lICgpIHtcbiAgICAgIHNldFRpbWVvdXQgKCgpID0+IHtcbiAgICAgICAgaWYgKHRoYXQudGltZXJBY3RpdmF0ZWQpIHtcbiAgICAgICAgICB0aGF0LnRpbWVWYWwrKztcbiAgICAgICAgICB0aGF0LnNldFRpbWUoKTtcbiAgICAgICAgICBjb3VudFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdG9wVGltZXIgKCkge1xuICAgIHRoaXMudGltZXJBY3RpdmF0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyByZWNvcmRTdGFydCAoYXJnczogYW55KSB7XG4gICAgaWYgKFROU1JlY29yZGVyLkNBTl9SRUNPUkQoKSkge1xuICAgICAgY29uc29sZS5sb2coXCJUaGlzIGRldmljZSBjYW4gcmVjb3JkIGF1ZGlvXCIpO1xuXG4gICAgICB2YXIgYXVkaW9Gb2xkZXIgPSBrbm93bkZvbGRlcnMuZG9jdW1lbnRzKCkuZ2V0Rm9sZGVyKFwiYXVkaW9cIik7XG4gICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhdWRpb0ZvbGRlcikpO1xuXG5cbiAgICAgIGxldCByZWNvcmRpbmdQYXRoID0gYXVkaW9Gb2xkZXIucGF0aCArIFwiL1wiICsgdGhpcy5yZWNvcmRlZE5hbWU7XG4gICAgICBsZXQgcmVjb3JkZXJPcHRpb25zOiBBdWRpb1JlY29yZGVyT3B0aW9ucyA9IHtcblxuICAgICAgICBmaWxlbmFtZTogcmVjb3JkaW5nUGF0aCxcbiAgICAgICAgbWV0ZXJpbmc6IHRydWUsXG5cbiAgICAgICAgaW5mb0NhbGxiYWNrOiAoaW5mb09iamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBpbmZvcm1hdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShpbmZvT2JqZWN0KSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXJyb3JDYWxsYmFjazogKGVycm9yT2JqZWN0KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZWNvcmQgRXJyb3I6IFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3JPYmplY3QpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5yZWNvcmRlci5zdGFydChyZWNvcmRlck9wdGlvbnMpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICAgICAgdGhpcy5yZWNvcmRTdGF0ZSA9IDE7XG4gICAgICAgIGlmIChyZWNvcmRlck9wdGlvbnMubWV0ZXJpbmcpIHtcbiAgICAgICAgICB0aGlzLmluaXRNZXRlcigpO1xuICAgICAgICB9XG4gICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIHRoaXMucmVjb3JkU3RhdGUgPSAwO1xuICAgICAgICB0aGlzLnJlc2V0TWV0ZXIoKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiVGhpcyBkZXZpY2UgY2Fubm90IHJlY29yZCBhdWRpb1wiKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVjb3JkU3RvcChhcmdzOiBhbnkpIHtcbiAgICB0aGlzLnJlc2V0TWV0ZXIoKTtcbiAgICB0aGlzLnJlY29yZGVyLnN0b3AoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVjb3JkZXIuZGlzcG9zZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlY29yZGluZyBpcyBzdG9wZWQuXCIpO1xuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICB0aGlzLnJlc2V0TWV0ZXIoKTtcbiAgICAgICAgdmFyIGF1ZGlvRm9sZGVyID0ga25vd25Gb2xkZXJzLmRvY3VtZW50cygpLmdldEZvbGRlcihcImF1ZGlvXCIpO1xuICAgICAgICBHbG9iYWxTZXR0aW5ncy5hdWRpb19maWxlID0gYXVkaW9Gb2xkZXIucGF0aCArIFwiL1wiICsgdGhpcy5yZWNvcmRlZE5hbWU7XG4gICAgICAgIHRoaXMucmVjb3JkU3RhdGUgPSAwO1xuICAgICAgfSwgKGV4KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV4KTtcbiAgICAgIH0pO1xuICAgIH0sIChleCkgPT4ge1xuICAgICAgdGhpcy5yZWNvcmRTdGF0ZSA9IDA7XG4gICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgdGhpcy5yZXNldE1ldGVyKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaXNSZWNvcmRlZCAoKSB7XG4gICAgdmFyIHJldFZhbCA9IGZhbHNlO1xuICAgIGlmIChHbG9iYWxTZXR0aW5ncy5hdWRpb19maWxlICE9IFwiXCIpIHtcbiAgICAgICAgcmV0VmFsID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG5cbiAgcHVibGljIHBsYXlSZWNvcmRlZEZpbGUoYXJncykge1xuICAgIGlmICh0aGlzLmlzUmVjb3JkZWQoKSkge1xuICAgICAgdmFyIGF1ZGlvRm9sZGVyID0ga25vd25Gb2xkZXJzLmRvY3VtZW50cygpLmdldEZvbGRlcihcImF1ZGlvXCIpO1xuICAgICAgdmFyIHJlY29yZGVkRmlsZSA9IGF1ZGlvRm9sZGVyLmdldEZpbGUodGhpcy5yZWNvcmRlZE5hbWUpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVjb3JkaW5nIGV4aXN0czogJyArIEZpbGUuZXhpc3RzKHJlY29yZGVkRmlsZS5wYXRoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlY29yZGVkRmlsZS5wYXRoKTtcbiAgICAgICAgdGhpcy5yZWNvcmRlZEF1ZGlvRmlsZSA9IHJlY29yZGVkRmlsZS5wYXRoO1xuICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICAgIHZhciBwbGF5ZXJPcHRpb25zOiBBdWRpb1BsYXllck9wdGlvbnMgPSB7XG4gICAgICAgICAgYXVkaW9GaWxlOiByZWNvcmRlZEZpbGUucGF0aCxcbiAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5kaXNwb3NlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdESVNQT1NFRCcpO1xuICAgICAgICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICAgICAgICB0aGlzLnJlY29yZFN0YXRlID0gMDtcbiAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlcnJvckNhbGxiYWNrOiAoZXJyb3JPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheSBFcnJvcjogXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvck9iamVjdCkpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBpbmZvQ2FsbGJhY2s6IChpbmZvT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgaW5mb3JtYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoaW5mb09iamVjdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnBsYXllci5wbGF5RnJvbUZpbGUocGxheWVyT3B0aW9ucykudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5aW5nXCIpO1xuICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5aW5nIGVycm9yXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNJT1MpIHtcbiAgICAgICAgaWYgKHRoaXMuX2F1ZGlvUGxheWVyU2VydmljZS5zdGF0ZSAhPSBBdWRpb1BsYXllclN0YXRlLlBsYXlpbmcpIHtcbiAgICAgICAgICB0aGlzLl9hdWRpb1BsYXllclNlcnZpY2UubG9hZEF1ZGlvKFwiZmlsZTovL1wiICsgcmVjb3JkZWRGaWxlLnBhdGgsIHRydWUpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnQgbG9hZGluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWVzc2FnZShcIk5vIGZpbGUgeW91IHJlY29yZGVkIGZvciB0aGlzIGZhc2suIFBsZWFzZSByZWNvcmQgeW91ciByZXBseSwgZmlyc3QuXCIpO1xuICAgIH1cbiAgfVxufVxuIl19