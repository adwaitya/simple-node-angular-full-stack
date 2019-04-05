import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { HomeComponent } from './pages/home.component';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRenderComponent } from './pages/render/button-render/button-render.component';
@NgModule({
  declarations: [UserProfileComponent, HomeComponent, ButtonRenderComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([ButtonRenderComponent]),
    SharedModule,
    CoreModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
