import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { GlobalSettings } from '../../globals/globals';

@Injectable()
export class FanswerService {
  constructor(private http: Http) {

  }

  dosubmit(str_token: string, str_id: string, feed_id: string, str_fanswer: string,
    audio_id: string, video_id: string) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let url = GlobalSettings.apiUrl + "dosubmitfanswer";
    let options = new RequestOptions({headers: headers});
    // pass efns_token  | efns_str_id  (star_id) |  efns_fask_id (to define which fask  you reply)
    // | efns_fanswer_text | efns_audio  (file field) | efns_video (file field)
    let body = "efns_token=" + str_token + "&efns_str_id=" + str_id + "&efns_fask_id=" + feed_id + "&efns_fanswer_text=" + str_fanswer + "&efns_audio=" + audio_id + "&efns_video=" + video_id;
    console.log(body);
    return this.http.post(url, body, options)
              .map((res: Response) => res.json());
  }
}
