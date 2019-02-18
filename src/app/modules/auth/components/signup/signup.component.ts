import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './../../../../helpers/errorStateMatcher';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { OnLoginAnswer, RegisterInfo } from '../../interfaces/OnLoginAnswer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public registerForm: FormGroup;
  public regmatcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // Init form
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'nickname': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'first_name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'last_name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(7)]),
      'gender_orientation': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'city': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'country': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'date_of_birth_day': new FormControl('', [Validators.required, Validators.maxLength(2)]),
      'date_of_birth_month': new FormControl('', [Validators.required, Validators.maxLength(3)]),
      'date_of_birth_year': new FormControl('', [Validators.required, Validators.maxLength(4)]),
    });
  }

  onSignup() {
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const nickname = this.registerForm.get('nickname').value;
    const first_name = this.registerForm.get('first_name').value;
    const last_name = this.registerForm.get('last_name').value;
    const phone = this.registerForm.get('phone').value;
    const gender_orientation = this.registerForm.get('gender_orientation').value;
    const city = this.registerForm.get('city').value;
    const country = this.registerForm.get('country').value;
    const date_of_birth_day = Number(this.registerForm.get('date_of_birth_day').value);
    const date_of_birth_month = Number(this.registerForm.get('date_of_birth_month').value);
    const date_of_birth_year = Number(this.registerForm.get('date_of_birth_year').value);

    const registerInfo: RegisterInfo = {
      email,
      password,
      nickname,
      first_name,
      last_name,
      phone,
      gender_orientation,
      city,
      country,
      date_of_birth_day,
      date_of_birth_month,
      date_of_birth_year
    }

    this.authService.register(registerInfo).subscribe((data: OnLoginAnswer) => {
        this.registerForm.reset();
        this.messageService.add({severity:'error', summary:'Server error', detail: data.message});
    });
  }

}
