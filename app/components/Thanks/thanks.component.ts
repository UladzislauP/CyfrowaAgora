import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BreakpointObserver } from '@angular/cdk/layout'


@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  user$ = this.authService.currentUser$;
  logo: string = "assets/images/logo2.png";

  constructor(private authService: AuthenticationService, private observer: BreakpointObserver) { }

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.observer.observe(['(max-width:800px']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }
}
