import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileFetcherService {
  private baseUrl = 'assets/files';
  constructor(
    private http: HttpClient
  ) { }
  public getFile(url: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      this.http.get(this.baseUrl + url, {
        responseType: 'text'
      }).subscribe(data => {
        observer.next(data);
      }, err => {
        observer.next('');
        observer.complete();
      }, () => {
        observer.complete();
      });
    });
  }
}
