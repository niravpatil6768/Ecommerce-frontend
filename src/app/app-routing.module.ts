import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
//import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'register', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)}
  //{path: 'products', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
