import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public show;
  uname:string;
  upass:string;
  constructor(
    private http:HttpClient,
    private router: Router,
    private cookieService:CookieService
  ) { }
  async onSubmit(form: NgForm){
    let res={
      uname: form.value.uname,
      pword: form.value.upass,
      key: 'login'
    }

    this.http.post(environment.commonurl,JSON.stringify(res))
      .subscribe(response=>{
      if(response["message"]==="No data find"){
         this.show=true; 
          form.reset();
        }else{
          var username=form.value.uname;
        this.cookieService.set('user_name', username);
          this.router.navigateByUrl('dashboard');
        }
     })
  }
  ngOnInit() {
    
  }

}
