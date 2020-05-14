import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import {CpssmainService} from  '../service/cpssmain.service';


@Component({
  selector: 'app-updateusermanager',
  templateUrl: './updateusermanager.component.html',
  styleUrls: ['./updateusermanager.component.css']
})
export class UpdateusermanagerComponent implements OnInit {
  myusertype;
  updateid;
  firstname;
  lastname;
  username;
  upassword;
  location;
  errorshow;
  duplicatedata;
  show;


  constructor(
    private cookieService:CookieService,
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit() {
    const usercookieexit=this.cookieService.check("updateuserdata");
    const checkadmincookieexit=this.cookieService.check("user_name");
    
    if(!usercookieexit||!checkadmincookieexit){
      this.router.navigateByUrl("login");
    }else{
      let itemlist=JSON.parse(this.cookieService.get('updateuserdata'));
      this.updateid=itemlist.uid;
      this.firstname=itemlist.firstname;
      this.lastname=itemlist.lastname;
      this.location=itemlist.location;
    }

  }
  onSubmit(form: NgForm){
    let res={
      id:this.updateid,
      fname: form.value.firstname,
      lname:form.value.lastname,
      location:form.value.location,
      key:"updateuserdata"
    }
    this.http.post(environment.commonurl,JSON.stringify(res))
    .subscribe(response=>{
      console.log(response);
        if(response["message"]==="Data saved successfully"){
          this.cookieService.delete("updateuserdata");
         this.router.navigateByUrl("usermanager");
       }else if(response["message"]==="Data not saved successfully"){
       this.errorshow=true;
      }
     
    });
  }



}
