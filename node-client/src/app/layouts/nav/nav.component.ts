import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/core/services/session.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  version = environment.version;


  navItems = [
    { link: '/dashboard/home', title: 'Home' },
    { link: '/about', title: 'About' },
    { link: '/contact', title: 'Contact' }
  ];
  constructor(
    private router: Router,
    private sessionService: SessionService,
    authGuard: AuthGuard
    ) { }

  ngOnInit() {
  }
  logout() {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}
