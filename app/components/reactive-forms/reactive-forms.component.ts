import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Question1 } from './interface'
import { Question2 } from './interface'
import { Question3 } from './interface'
import { Question4 } from './interface'
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

export function passwordsMatchValidator(): Validators {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordDontMatch: true
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  ankietForm!: FormGroup;
  isSubmit = true;
  submitMessage = '';
  private ankietFormFire!: AngularFirestoreCollection<any>;


  question1: Question1[] = [
    { value: 'studentem / studentką PW', viewValue: 'studentem / studentką PW' },
    { value: 'wykładowcą PW', viewValue: 'wykładowcą PW' },
    { value: 'pracownikiem administracyjnym PW', viewValue: 'pracownikiem administracyjnym PW' },
    { value: 'mieszkańcem Kampusu Głównego PW', viewValue: 'mieszkańcem Kampusu Głównego PW' },
    { value: 'mieszkańcem okolicy Kampusu Głównego PW', viewValue: 'mieszkańcem okolicy Kampusu Głównego PW' },
    { value: 'inne', viewValue: 'inne' }
  ];

  question2: Question2[] = [
    { value: 'kobieta', viewValue: 'kobieta' },
    { value: 'mężczyzna', viewValue: 'mężczyzna' },
    { value: 'pozostawię tę informację dla siebie', viewValue: 'pozostawię tę informację dla siebie' }
  ];

  question3: Question3[] = [
    { value: 'rano', viewValue: 'rano' },
    { value: 'popołudniu', viewValue: 'popołudniu' },
    { value: 'wieczorem', viewValue: 'wieczorem' },
    { value: 'wcale nie spędzam tu czasu', viewValue: 'wcale nie spędzam tu czasu' }
  ];

  question4: Question4[] = [
    { value: 'samochód', viewValue: 'samochód' },
    { value: 'metro', viewValue: 'metro' },
    { value: 'tramwaj', viewValue: 'tramwaj' },
    { value: 'autobus', viewValue: 'autobus' },
    { value: 'rower', viewValue: 'rower' },
    { value: 'na piechotę', viewValue: 'na piechotę' },
    { value: 'inne', viewValue: 'inne' }
  ];

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  },
    { validators: passwordsMatchValidator });


  constructor(private authService: AuthenticationService, private observer: BreakpointObserver, private formBuilder: FormBuilder, private firestore: AngularFirestore,
    private toast: HotToastService, private router: Router) { }

  ngOnInit(): void {
    this.ankietFormFire = this.firestore.collection('Ankiety');
    this.ankietForm = this.formBuilder.group({
      question1: [null, Validators.required],
      question2: [null, Validators.required],
      question3: [null, Validators.required],
      question4: [null, Validators.required],
      question5: [null, Validators.required],
      question6: [null, Validators.required],
      question7: [null, Validators.required]
    })
  }

  submit() {
    if (this.ankietForm.valid) return; {

    }
    const { name, email, password } = this.signUpForm.value;
    this.authService.signUp(name!, email!, password!).pipe(
      this.toast.observe({
        success: 'Congrats! You are all signed up',
        loading: 'Signing in',
        error: ({ message }) => `${message}`,
      })
    ).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }


  submitData(value: any) {
    this.ankietFormFire.add(value)
      .then(res => {
        this.submitMessage = 'Thank you for your answers!';
      })
      .catch(err => {
        // console.log(err);
      })
    setTimeout(() => {
      this.isSubmit = false;
    }, 8000);
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
    });
  }
}
