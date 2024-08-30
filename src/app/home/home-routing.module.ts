import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'',component: HomeComponent,



  children: [
    { path: '', loadChildren: () => import('../component/component.module').then(m => m.ComponentModule) },
  ]


},
  //{ path: '', loadChildren: () => import('./commodule/commodule.module').then(m => m.CommoduleModule) },

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
