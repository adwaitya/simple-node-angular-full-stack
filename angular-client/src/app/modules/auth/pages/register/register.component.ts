import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  error: string;
  isError: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticateService,
    private sessionService: SessionService
  ) {
    this.buildForm();
   }

  ngOnInit() {

  }
  get f () {
    return this.registrationForm.controls;
  }
  private buildForm(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    console.log('this.registrationForm.value', this.registrationForm.value);
    this.authService.registration(this.registrationForm.value).subscribe(data => {
      if (data.isSuccess) {
        if (!data.isSuccess) {
          this.isError = true;
          this.error = data.message;
          console.log('error', this.error);
          return;
        }
        console.log('register data', data.model);
        localStorage.setItem('currentUser', JSON.stringify(data.model));
        this.sessionService.setCurrentUserValue(data.model);
        this.router.navigate(['/dashboard/home']);
       }
    },
    err => {
      console.log(err.error.isSuccess);
      if (! err.error.isSuccess) {
        this.isError = true;
        this.error = err.error.message;
      }
    });
  }

}
