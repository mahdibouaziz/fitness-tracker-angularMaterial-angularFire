import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthDataDto } from '../dto/auth-data.dto';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UiService
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
    this.uiService.loadingStateChanged.next(true);
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((err) => {
        this.uiService.loadingStateChanged.next(false);
        this.snackBar.open(err.message, null, {
          duration: 3000,
        });
      });
  }

  login(authData: AuthDataDto) {
    this.uiService.loadingStateChanged.next(true);
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((err) => {
        this.uiService.loadingStateChanged.next(false);
        this.snackBar.open(err.message, null, {
          duration: 3000,
        });
      });
  }

  logout() {
    this.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
