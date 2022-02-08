import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonsRoutingModule} from './persons-routing.module';
import {DetailComponent} from './detail/detail.component';
import {PersonsComponent} from './persons.component';
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {AddressesModule} from "../../modules/addresses/addresses.module";
import {MatDividerModule} from "@angular/material/divider";
import {MatRippleModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    DetailComponent,
    PersonsComponent
  ],
    imports: [
        MatDatepickerModule,
        CommonModule,
        PersonsRoutingModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatIconModule,
        AddressesModule,
        MatDividerModule,
        MatRippleModule,
        MatPaginatorModule,
        MatRadioModule,
    ],
})
export class PersonsModule {
}
