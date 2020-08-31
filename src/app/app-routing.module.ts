import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IotComponent } from './iot/iot.component';


const routes: Routes = [
  { path: '', component: IotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
