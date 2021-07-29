import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';
import { StoreService } from 'src/app/core/services/store-service/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isPasswordVisible: boolean = false;
  formData!: FormGroup;
  isOtpView: boolean = false;
  authData:
    | {
        user_id: string | undefined;
        password: string | undefined;
        secure_code: string | undefined;
      }
    | undefined;
  constructor(
    private storeService: StoreService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.formData = new FormGroup({
      user_id: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      secure_code: new FormControl(null, [Validators.required]),
    });
  }
  submit() {
    // this.storeService.authenticateUser(this.formData.value['user_id'],this.formData.value['password'])

    this.authData = { ...this.formData.value };
    if(this.authData && this.authData.user_id && this.authData.password )
    {
      this.isOtpView = true;
    }
  }

  authenticateUser() {
    const enteredCode = this.formData.value['secure_code'];
    if (
      this.authData &&
      this.authData.user_id &&
      this.authData.password &&
      enteredCode
    ) {
      this.storeService.authenticateUser(
        this.authData.user_id,
        this.authData.password,
        enteredCode
      );
    } else {
      this.toastrService.error('Credentials not found in code');
    }
  }
}
