import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wp',
  templateUrl: './WP.component.html',
  styleUrls: ['./WP.component.scss']
})
export class LandingComponent implements OnInit {
  constructor() { }
  logo: string = "assets/images/main.png";
  ngOnInit(): void {
  }
}
