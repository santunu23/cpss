import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import {CpssmainService} from  '../service/cpssmain.service';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users$: any[] = [];
  getcertificatedataformodal=[];
  show;
  errorshow;
  constructor(
    private service:CpssmainService,
    private http:HttpClient,
    private cookieservice:CookieService,
    private router:Router
  ) { }

  ngOnInit() {
    if(!this.cookieservice.get("user_name")){
      this.router.navigateByUrl('login');
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
   
    this.service.getalldata().subscribe(data=>{
      this.users$=data;
      this.dtTrigger.next();
    });
}

displaydata(item){
  this.service.getdatabyid(item.uid).subscribe(data=>{
    this.getcertificatedataformodal=data
 })
}

deleteitem(item){
  let res={
    id:item.uid,
    key:"deletepicture"
  }
  this.http.post(environment.commonurl,JSON.stringify(res))
  .subscribe(response=>{
  if(response["message"]==="Data Delete"){
     this.show=true; 
     this.errorshow=false;
     this.displayuserdata();
    }else{
      this.errorshow=true;
      this.show=false;
    }
  })

}

download(item){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", item.image_path, true);
  xhr.responseType = "blob";
  xhr.onload = function(){
      var urlCreator = window.URL || (window as any).webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = item.image_name;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
  }
  xhr.send();

}

displayuserdata(){
  this.service.getalldata().subscribe(data=>{
    this.users$=data;
    this.dtTrigger.next();
  });
}
  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }
}
