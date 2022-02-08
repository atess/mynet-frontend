import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Address, Pagination} from "../interfaces/data";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {AddressesService} from "../modules/addresses/addresses.service";

export class AddressesDataSource implements DataSource<Address> {
  public addressesSubject$ = new BehaviorSubject<Address[]>([]);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  public pagination$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({current_page: 0});
  public loading$ = this.loadingSubject$.asObservable();

  constructor(private addressesService: AddressesService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Address[]> {
    return this.addressesSubject$.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.addressesSubject$.complete();
    this.loadingSubject$.complete();
  }

  loadAddresses(personId: number, pageIndex: number) {
    this.loadingSubject$.next(true);

    this.addressesService.get(personId, pageIndex)
      .pipe(
        catchError(() => of({
          data: {
            list: [],
            pagination: {
              current_page: 0,
            }
          }
        })),
        finalize(() => this.loadingSubject$.next(false))
      )
      .subscribe(addresses => {
        this.addressesSubject$.next(addresses?.data.list);

        this.pagination$.next(
          Object.assign({}, addresses?.data.pagination, {
            current_page: addresses?.data.pagination.current_page - 1
          })
        )
      });
  }
}
