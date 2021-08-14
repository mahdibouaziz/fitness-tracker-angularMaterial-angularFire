import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  // maxDate: Date;
  startDate: Date;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.maxDate = new Date();
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.startDate = new Date(2000, 0, 1);
  }

  onSubmit(form: NgForm): void {
    // console.log(form.value);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
