import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dashboard} from '../dashboard/Dashboard';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {UserManager} from '../usermanager/Usermanager';

@Injectable({
  providedIn: 'root'
})
export class CpssmainService {

  constructor(
  private http:HttpClient
  ) { }
  getalldata():Observable<any>{
    let res={
      key: "getdashboarddata",
    }
    return this.http.post<Dashboard>(environment.commonurl,JSON.stringify(res));
  }

  getdatabyid(id):Observable<any>{
    let res={
      uid:id,
      key:"getdatabyuid"
    }

    return this.http.post<Dashboard>(environment.commonurl,JSON.stringify(res));
  }

  getalluserdata():Observable<any>{
    let res={
      key:"getalluserdata"
    }
    return this.http.post<UserManager>(environment.commonurl,JSON.stringify(res));
  }

}
