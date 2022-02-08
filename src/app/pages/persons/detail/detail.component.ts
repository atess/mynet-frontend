import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonsService} from "../persons.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit, OnDestroy {

  id: number | undefined;
  form: FormGroup | undefined;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  destroySubject$: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private personService: PersonsService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      gender: [null, [Validators.required]],
    });

    this.route
      .params
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(params => {
      const id = params['id'];
      if (id && id !== "add") {
        this.id = +id;
        this.cd.detectChanges();
        this.personService.find(this.id).subscribe(person => {
          this.form?.patchValue({
            name: person.data.name,
            birthday: person.data.birthday,
            gender: person.data.gender,
          })
        });
      }
    });
  }

  submit() {
    this.loading$.next(true);

    const value = this.form?.value;
    value.birthday = moment(value.birthday).format('YYYY-MM-DD');

    if (this.id) {
      this.personService.update(this.id, value).subscribe(person => {
        this.form?.patchValue({
          name: person.data.name,
          birthday: person.data.birthday,
          gender: person.data.gender,
        });
        this.loading$.next(false);
      });
    } else {
      this.personService.create(value).subscribe(person => {
        this.loading$.next(false);
        this.router.navigate(['/persons/' + person.data.id]).then();
      });
    }
  }

  ngOnDestroy() {
    this.destroySubject$.next(null);
  }
}
