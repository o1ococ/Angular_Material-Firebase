import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService, private authService: AuthService, router: Router) {
    authService.user$.subscribe(user => {
      if (!user) return;
      
      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  } // End constructor

}
