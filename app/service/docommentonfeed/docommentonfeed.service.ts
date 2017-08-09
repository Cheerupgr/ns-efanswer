import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { GlobalSettings } from '../../globals/globals';

@Injectable()
export class DoCommentFeedService {
  constructor(private http: Http) {

  }

  docomment(str_token: string, feed_id: number, str_comment: string) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let url = GlobalSettings.apiUrl + "docommentonfeed";
    let options = new RequestOptions({headers: headers});
    let body = "efns_token=" + str_token + "&efns_feed_id=" + feed_id + "&efns_cmnts=" + str_comment;
    console.log(body);
    return this.http.post(url, body, options)
              .map((res: Response) => res.json());
  }
}
