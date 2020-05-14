import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router:Router,
    private cookieservice:CookieService
  ) { }

  ngOnInit() {
    if(this.cookieservice.get("user_name")){
      this.cookieservice.deleteAll();
      this.router.navigateByUrl('login');
    }else{
      this.router.navigateByUrl('login');
    }
  }

}
