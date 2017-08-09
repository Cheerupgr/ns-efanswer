import {Injectable} from '@angular/core';

@Injectable()
export class GlobalSettings {
  static apiUrl: string = "https://developer.efanswer.com/api/v2/";
  static access_token: string;
  static star_id: string;
  static question_id: string;
  static audio_file: string = "";
  static video_file: string = "";

  constructor() {

  }
}
