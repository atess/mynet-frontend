import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input, OnChanges,
  OnDestroy,
  OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {AddressesService} from "./addresses.service";
import {Address, Pagination, Person} from "../../interfaces/data";
import {AddressesDataSource} from "../../data-sources/AddressesDataSource";
import {MatPaginator} from "@angular/material/paginator";
import {Observable, share, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressesComponent implements OnInit, OnDestroy, OnChanges {

  @Input() personId: number | undefined;
  pagination: Pagination | undefined;
  displayedColumns = ["address", "post_code", "city_name", "country_name", "delete"];
  dataSource: AddressesDataSource | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  destroySubject$: Subject<any> = new Subject<any>();

  constructor(private addressesService: AddressesService,
              private dialog: MatDialog,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.personId) {
      this.dataSource = new AddressesDataSource(this.addressesService);
      this.dataSource.loadAddresses(this.personId, 1);
      this.dataSource.pagination$
        .pipe(takeUntil(this.destroySubject$))
        .subscribe(pagination => {
          this.pagination = pagination;
          this.cd.detectChanges();
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('personId')) {
      this.personId = changes['personId'].currentValue;
    }
  }

  showDetail(address: Address | null) {
    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: 400,
      maxWidth: 400,
      data: {
        address: address,
        personId: this.personId,
      },
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(reload => {
      if (reload && this.personId && typeof this.paginator?.pageIndex === 'number' && this.dataSource) {
        this.dataSource.loadAddresses(this.personId, this.paginator.pageIndex)
      }
    });
  }

  delete(row: Person) {
    this.addressesService.delete(row.id).subscribe(() => {
      if (this.personId && typeof this.paginator?.pageIndex === 'number' && this.dataSource) {
        this.dataSource.loadAddresses(this.personId, this.paginator.pageIndex)
      }
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next(null);
  }
}
