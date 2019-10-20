import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',canActivate:[AuthGuard],loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'list',canActivate:[AuthGuard],loadChildren: () => import('./list/list.module').then(m => m.ListPageModule) },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'list-details',canActivate:[AuthGuard], loadChildren: './list/list-details/list-details.module#ListDetailsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
