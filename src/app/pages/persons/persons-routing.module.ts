import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonsComponent} from "./persons.component";
import {DetailComponent} from "./detail/detail.component";

const routes: Routes = [
  {
    path: '',
    component: PersonsComponent,
  },
  {
    path: ':id',
    component: DetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
