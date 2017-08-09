import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { GlobalSettings } from '../../globals/globals';

@Injectable()
export class UserService {
  constructor(private http: Http) {

  }

  login(user: any) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let url = GlobalSettings.apiUrl + "checkLogin";
    let options = new RequestOptions({headers: headers});
    let body = "efns_usr_fld=" + user.email + "&efns_pss_fld=" + user.password;
    console.log(body);
    return this.http.post(url, body, options)
              .map((res: Response) => res.json());
  }
}
