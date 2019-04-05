import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        children: [
          {
            path: 'home',
            component: HomeComponent
          },
          {
            path: 'profile/:id',
            component: UserProfileComponent
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
