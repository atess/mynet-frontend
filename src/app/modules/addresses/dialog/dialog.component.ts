import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Address} from "../../../interfaces/data";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressesService} from "../addresses.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form: FormGroup | undefined;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                address: Address | null,
                personId: number
              },
              private formBuilder: FormBuilder,
              private addressesService: AddressesService,
              public dialogRef: MatDialogRef<DialogComponent>) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [null, Validators.required],
      post_code: [null, Validators.required],
      city_name: [null, Validators.required],
      country_name: [null, Validators.required],
      person_id: [this.data.personId, [Validators.required]],
    });

    if (this.data.address) {
      this.form.patchValue(this.data.address);
    }
  }

  submit() {
    this.loading$.next(true);
    if (this.data.address) {
      this.addressesService.update(this.data.address.id, this.form?.value)
        .subscribe(() => {
          this.dialogRef.close(true);
          this.loading$.next(false);
        });
    } else {
      this.addressesService.create(this.form?.value)
        .subscribe(() => {
          this.dialogRef.close(true);
          this.loading$.next(false);
        });
    }
  }
}
