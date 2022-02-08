import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Pagination, Person} from "../interfaces/data";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {PersonsService} from "../pages/persons/persons.service";

export class PersonDataSource implements DataSource<Person> {
  public personsSubject$ = new BehaviorSubject<Person[]>([]);
  public pagination$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({current_page: 0});
  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject$.asObservable();

  constructor(private personsService: PersonsService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Person[]> {
    return this.personsSubject$.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.personsSubject$.complete();
    this.loadingSubject$.complete();
  }

  loadPersons(pageIndex: number) {
    this.loadingSubject$.next(true);

    this.personsService.get(pageIndex)
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
      .subscribe(persons => {
        this.personsSubject$.next(persons?.data.list);

        this.pagination$.next(
          Object.assign({}, persons?.data.pagination, {
            current_page: persons?.data.pagination.current_page - 1
          })
        )
      });
  }
}
