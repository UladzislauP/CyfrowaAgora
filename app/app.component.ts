import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  logo:string="assets/images/logotyp.png";
  constructor(public authService:AuthenticationService, private router:Router){

  }
  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['']);
    });
  }

}
