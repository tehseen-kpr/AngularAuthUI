import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  /* {path:'',component:LoginComponent}, */
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'**',component:NotFoundComponent} //must be last route as not found 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
