import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import * as bghttp from "nativescript-background-http";

import { GlobalSettings } from '../../globals/globals';

@Injectable()
export class FileUploadService {
  constructor(private http: Http) {

  }

  uploadFile(str_token: string, str_type: string, str_name: string, cb) {
    var session = bghttp.session("image-upload");
    let url = GlobalSettings.apiUrl + "uploadFile?type=" + str_type + "&name=" + str_name + "&token=" + str_token;
    var filename = "";
    var retVal = "";

    console.log(str_type);

    if (str_type == "video") {
      filename = new Date().getTime() + '.mp4';
    } else if (str_type == "audio") {
      filename = new Date().getTime() + '.mp3';
    } else if (str_type == "image") {
      filename = new Date().getTime() + '.jpg';
    }

    console.log(filename);
    var request = {
        url: url,
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream"
        },
        description: "{ 'uploading': '" + str_name + "' }"
    };

    var task = session.uploadFile(str_name, request);

    task.on("progress", logEvent);
    task.on("error", uploadError);
    task.on("complete", uploadComplete);

    function logEvent(e) {
      console.log(e.eventName);
    }

    function uploadError (e) {
      retVal = "error";

    }

    function uploadComplete (e) {
      retVal = e.response.getBodyAsString();
      cb(retVal);
    }

    // let options = new RequestOptions({headers: headers});
    // let body = "efns_token=" + str_token + "&use=" + str_use + "&efns_offset=" + num_offset;
    // console.log(body);
    // return this.http.post(url, body, options)
    //           .map((res: Response) => res.json());
  }
}
