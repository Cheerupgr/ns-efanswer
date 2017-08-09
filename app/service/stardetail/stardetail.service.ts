import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { GlobalSettings } from '../../globals/globals';

@Injectable()
export class StarDetailService {
  constructor(private http: Http) {

  }

  get(str_token: string, str_id: string) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let url = GlobalSettings.apiUrl + "getstardetails";
    let options = new RequestOptions({headers: headers});
    let body = "efns_token=" + str_token + "&efns_str_id=" + str_id;
    return this.http.post(url, body, options)
              .map((res: Response) => res.json());
  }
}
