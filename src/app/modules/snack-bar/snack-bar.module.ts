import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './snack-bar.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class SnackBarModule { }
