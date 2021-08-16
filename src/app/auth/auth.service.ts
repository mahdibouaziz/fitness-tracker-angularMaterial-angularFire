import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthDataDto } from '../dto/auth-data.dto';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['login']);
      }
    });
  }

  registerUser(authData: AuthDataDto) {
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  login(authData: AuthDataDto) {
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    this.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
