import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import {CpssmainService} from  '../service/cpssmain.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users$: any[] = [];
  firstname;
  lastname;
  username;
  location;
  userpassword;
  getalluserdata;
  userrole;
  show:any;
  duplicatedata:any;
  errorshow:any;

  constructor(
    private router:Router,
    private cookieservice:CookieService,
    private  http:HttpClient,
    private service:CpssmainService,
 
  ) { }

  ngOnInit() {
    if(!this.cookieservice.get("user_name")){
      this.router.navigateByUrl("login");
    }

    this.displayuserdata();

  }

  onSubmit(form: NgForm){
    let res={
      firstname:form.value.firstname,
      lastname:form.value.lastname,
      username:form.value.username,
      userpassword:form.value.userpassword,
      location:form.value.location,
      key: 'addusermanagerinfo',
    }
  
    this.http.post(environment.commonurl,JSON.stringify(res))
      .subscribe(response=>{
          if(response["message"]==="duplicate data"){
          this.duplicatedata=true;
          this.show=false; 
          this.errorshow=false;
         }else if(response["message"]==="Data saved successfully"){
          this.duplicatedata=false;
          this.show=true; 
          this.errorshow=false;
          this.displayuserdata();
        }else{
          this.duplicatedata=false;
          this.show=false; 
          this.errorshow=true;
        }
        form.reset();
      });
   
    }

    displayuserdata(){
      this.service.getalluserdata().subscribe(data=>{
        this.users$=data;
        this.dtTrigger.next();
     });
}

updateuser(item){
  let udpateitemdata=JSON.stringify(item);
 if(this.cookieservice.get('updateuserdata')){
    this.cookieservice.delete('updateuserdata');
    this.cookieservice.set('updateuserdata', udpateitemdata);
  }else{
    this.cookieservice.set('updateuserdata', udpateitemdata);
  }
  this.router.navigateByUrl('updateusermanager');
}

deleteuser(item){
  let res={
    id:item.uid,
    key: 'deleteuser'
    
  }
  console.log(res);
  this.http.post(environment.commonurl,JSON.stringify(res))
  .subscribe(response=>{
    console.log(response);
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

    }

