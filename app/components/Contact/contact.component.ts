import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  private ankietFormFire!: AngularFirestoreCollection<any>;
  opinionForm!: FormGroup;
  name = '';

  constructor(private authService: AuthenticationService, private observer: BreakpointObserver, private formBuilder: FormBuilder, private firestore: AngularFirestore) { }

  ngOnInit(): void { }

  onValueChange(event: Event): void {
    const value = (event.target as any).value;
    this.name = value;
    // console.log(this.name);
  }

  ngDoCheck(): void {
    this.ankietFormFire = this.firestore.collection('Contact');
    this.opinionForm = this.formBuilder.group({
      comment: [this.name]
    });
  }

  submitData(value: any) {
    // console.log(value);
    this.ankietFormFire.add(value);
  }

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
