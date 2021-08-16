import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoginSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) {}

  ngOnInit(): void {
    this.isLoginSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
  }

  onSubmit(form: NgForm): void {
    // console.log(form.value);
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }

  ngOnDestroy(): void {
    this.isLoginSubscription.unsubscribe();
  }
}
