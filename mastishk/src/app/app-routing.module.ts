import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /* {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }, */
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registeration',
    loadChildren: () => import('./registeration/registeration.module').then( m => m.RegisterationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'verify-otp/:userId',
    loadChildren: () => import('./verify-otp/verify-otp.module').then( m => m.VerifyOtpPageModule)
  },
  {
    path: 'reset-password/:userId',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'example-page',
    loadChildren: () => import('./example-page/example-page.module').then( m => m.ExamplePagePageModule)
  },
  {
    path: 'doctor-profile',
    loadChildren: () => import('./doctor-profile/doctor-profile.module').then( m => m.DoctorProfilePageModule)
  },  {
    path: 'health-worker',
    loadChildren: () => import('./health-worker/health-worker.module').then( m => m.HealthWorkerPageModule)
  },
  {
    path: 'child-profile',
    loadChildren: () => import('./child-profile/child-profile.module').then( m => m.ChildProfilePageModule)
  },
  {
    path: 'self',
    loadChildren: () => import('./self/self.module').then( m => m.SelfPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
