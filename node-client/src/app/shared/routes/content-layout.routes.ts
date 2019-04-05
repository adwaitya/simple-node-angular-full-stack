import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './modules/home/home.module#HomeModule'
  }
];
