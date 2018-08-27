import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataFetcherService {
  private baseUrl = 'assets/datas/';
  constructor(
    private http: HttpClient
  ) { }

  public getData(url: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(`${this.baseUrl}${url}`).subscribe(data => {
        observer.next(data);
      }, err => {
        observer.next({});
        observer.complete();
      }, () => {
        observer.complete();
      });
    });
  }
}
