
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthguardGuard } from './service/authguard.guard';
import { WebphoneComponent } from './webphone/webphone.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', component: NavigationComponent, canActivate: [AuthguardGuard] },
  { path: 'webphone', component: WebphoneComponent, canActivate: [AuthguardGuard] },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
