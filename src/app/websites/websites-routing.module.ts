import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./w10002/w10002.module').then(m => m.W10002Module) },
  { path: 'w10001', loadChildren: () => import('./w10001/w10001.module').then(m => m.W10001Module) },
  
 
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsitesRoutingModule { }
