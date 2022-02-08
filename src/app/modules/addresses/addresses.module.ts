import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressesComponent} from './addresses.component';
import {DialogComponent} from './dialog/dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RouterModule} from "@angular/router";
import {MatRippleModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AddressesComponent,
    DialogComponent
  ],
  exports: [
    AddressesComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        RouterModule,
        MatRippleModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        FlexLayoutModule,
        MatIconModule
    ]
})
export class AddressesModule {
}
