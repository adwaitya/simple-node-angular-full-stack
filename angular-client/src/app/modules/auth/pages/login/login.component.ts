import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { SessionService } from 'src/app/core/services/session.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;
  isLoading: boolean;
  loginForm: FormGroup;
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
    this.isError = false;
  }

  get f () {
    return this.loginForm.controls;
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
      if (!data.isSuccess) {
        this.isError = true;
        this.error = data.message;
        console.log('error', this.error);
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(data.model));
      this.sessionService.setCurrentUserValue(data.model);
      this.router.navigate(['/dashboard/home']);
    },
    err => {
      console.log(err.error.isSuccess);
      if (! err.error.isSuccess) {
        this.isError = true;
        this.error = err.error.message;
      }
    },
    );

  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
