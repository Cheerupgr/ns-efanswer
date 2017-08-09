import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { GlobalSettings } from '../../globals/globals';

@Injectable()
export class WalkthroughsService {
  constructor(private http: Http) {

  }

  get() {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let url = GlobalSettings.apiUrl + "walkthroughs";
    let options = new RequestOptions({headers: headers});
    let body = '';
    return this.http.post(url, body, options)
              .map((res: Response) => res.json());
  }
}
