import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { GlobalSettings } from '../../globals/globals';

@Injectable()
export class FasksService {
  constructor(private http: Http) {

  }

  get(str_token: string, str_use: string, num_offset: number) {
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let url = GlobalSettings.apiUrl + "getfaskforstar";
    let options = new RequestOptions({headers: headers});
    let body = "efns_token=" + str_token + "&use=" + str_use + "&efns_offset=" + num_offset;
    console.log(body);
    return this.http.post(url, body, options)
              .map((res: Response) => res.json());
  }
}
