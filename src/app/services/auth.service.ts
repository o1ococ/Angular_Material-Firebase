import { UserService } from './user.service';
import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute, 
    private userService: UserService) { 
      this.user$ = afAuth.authState;
    } // End constructor

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  
  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return of(null);
      })
    );
  }

}
