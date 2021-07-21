import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { HeroComponent } from './component/hero/hero.component';
import { MainComponent } from './component/main/main.component';
import { SubscriptionComponent } from './component/subscription/subscription.component';

const routes: Routes = [
  {path:'',component: MainComponent},
  { path: 'subscribe', component: SubscriptionComponent },
  { path: 'second', component: HeroComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
