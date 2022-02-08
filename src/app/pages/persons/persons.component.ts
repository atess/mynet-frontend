import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PersonsService} from "./persons.service";
import {Pagination, Person} from "../../interfaces/data";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonDataSource} from "../../data-sources/PersonDataSource";
import * as moment from "moment";
import {MatPaginator} from "@angular/material/paginator";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonsComponent implements OnInit, OnDestroy {
  pagination: Pagination | undefined;
  persons: Person | undefined;
  displayedColumns = ["name", "birthday", "gender", "delete"];
  dataSource: PersonDataSource | undefined;
  moment: any = moment;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  destroySubject$: Subject<any> = new Subject<any>();

  constructor(private personsService: PersonsService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataSource = new PersonDataSource(this.personsService);
    this.dataSource.loadPersons(0);
    this.dataSource.pagination$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(pagination => {
        this.pagination = pagination;
        this.cd.detectChanges();
      });
  }

  showDetail(row: Person) {
    this.router.navigate(['/persons/' + row.id]).then();
  }

  delete(row: Person) {
    if (confirm('Are you sure?'))
      this.personsService.delete(row.id).subscribe(() => {
        if (typeof this.paginator?.pageIndex === 'number' && this.dataSource) {
          this.dataSource.loadPersons(this.paginator.pageIndex)
        }
      });
  }

  ngOnDestroy() {
    this.destroySubject$.next(null);
  }
}
