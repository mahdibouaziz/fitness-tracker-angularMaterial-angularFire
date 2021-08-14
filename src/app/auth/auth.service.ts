import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthDataDto } from '../dto/auth-data.dto';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  constructor() {}

  registerUser(authData: AuthDataDto) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authChange.next(true);
  }

  login(authData: AuthDataDto) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
