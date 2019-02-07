import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MFOPhysical } from './mfo';

@Injectable()
export class MfoService {
  constructor(private http: HttpClient) {}

  apiRoot = 'http://localhost:3500';

  getMFO() {
     let user = JSON.parse(localStorage.getItem('currentUser'));
     let pid = user.pid;
     //let body = {pid: pid};
    const url = `${this.apiRoot}/mfos`;
    return this.http.post(url, {pid});
  }

  // export class or interface instead
  getMFOPhysical(): Observable<MFOPhysical[]> {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let pid = user.pid;
    const url = `${this.apiRoot}/mfosPhysical`;
    return this.http.post<MFOPhysical[]>(url,{pid}).pipe(
      tap(_ => console.log('fetched MFO Physical')),
      catchError(this.handleError('getMFOPhysical', []))
    );
  }

  getLogs(beds): Observable<any> {
    const url = `${this.apiRoot}/getLogs`;
    const uid = JSON.parse(localStorage.getItem('currentUser'));
    const id = uid.user_id;
    return this.http.post<any>(url, { id,beds }).pipe(
      tap(_ => console.log('fetched Logs')),
      catchError(this.handleError('getLogs', []))
    );
  }

  getDistrict(): Observable<any> {
    const url = `${this.apiRoot}/getDistrict`;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const pid = user.pid;
    return this.http.post<any>(url, { pid }).pipe(
      tap(_ => console.log('fetched District')),
      catchError(this.handleError('getDistrict', []))
    );
  }

  getDistrictDetails(data): Observable<any> {
    const url = `${this.apiRoot}/getDistrictDetails`;
    // const user = JSON.parse(localStorage.getItem('currentUser'));
    // const pid = user.pid;
    return this.http.post<any>(url, { data }).pipe(
      tap(_ => console.log('fetched District Details')),
      catchError(this.handleError('getDistrictDetails', []))
    );
  }

  updateDistrictDetails(data): Observable<any> {
    const url = `${this.apiRoot}/updateDistrictDetails`;
    // const user = JSON.parse(localStorage.getItem('currentUser'));
    // const pid = user.pid;
    return this.http.post<any>(url, { data }).pipe(
      tap(_ => console.log('updated District Details')),
      catchError(this.handleError('updateDistrictDetails', []))
    );
  }
  

  getLastUpdated(beds): Observable<any> {
    const uid = JSON.parse(localStorage.getItem('currentUser'));
    const id = uid.user_id;
    const url = `${this.apiRoot}/lastUpdated`;
    return this.http.post<any>(url, { id,beds }).pipe(
      tap(_ => console.log('fetched Last Updated')),
      catchError(this.handleError('getLastUpdated', []))
    );
  }

  addObject(mfo_id, object_id) {
    const url = `${this.apiRoot}/addObject`;
    return this.http.post(url, { mfo_id, object_id });
  }

  updateAllotment(id: number, value: number, col: string) {
    const url = `${this.apiRoot}/updateAllotment`;
    return this.http.post(url, { id, value, col });
  }

  updatePhysical(id: number, value: number, col: string): Observable<any> {
    const url = `${this.apiRoot}/updatePhysical`;
    return this.http.post<any>(url, { id, value, col }).pipe(
      tap(_ => console.log('Updated the Physical')),
      catchError(this.handleError('updatePhysical', []))
    );
  }

  updateLogs(
    mfo_id: number,
    value: number,
    uid: number,
    col: string,
    month: string,
    beds: number,
    prov: any,
    dist: any,
    mun: any,
  ): Observable<any> {
    const url = `${this.apiRoot}/addLogs`;
    let mo: string;
    if(month === 'jan' || month === 'jan_t' || month === 'jant' || month === 'jana')
    mo = 'January';
    if(month === 'feb' || month === 'feb_t' || month === 'febt' || month === 'feba')
    mo = 'February';
    if(month === 'mar' || month === 'mar_t' || month === 'mart' || month === 'mara')
    mo = 'March';
    if(month === 'apr' || month === 'apr_t' || month === 'aprt' || month === 'apra')
    mo = 'April';
    if(month === 'may' || month === 'may_t' || month === 'mayt' || month === 'maya')
    mo = 'May';
    if(month === 'jun' || month === 'jun_t' || month === 'junt' || month === 'junna')
    mo = 'June';
    if(month === 'jul' || month === 'jul_t' || month === 'jult' || month === 'jula')
    mo = 'July';
    if(month === 'aug' || month === 'aug_t' || month === 'augt' || month === 'auga')
    mo = 'August';
    if(month === 'sep' || month === 'sep_t' || month === 'sept' || month === 'sepa')
    mo = 'September';
    if(month === 'oct' || month === 'oct_t' || month === 'octt' || month === 'octa')
    mo = 'October';
    if(month === 'nov' || month === 'nov_t' || month === 'novt' || month === 'nova')
    mo = 'November';
    if(month === 'decm' || month === 'dec_t' || month === 'dect' || month === 'deca')
    mo = 'December';
    var message = col + ' was updated to ' + value + ' in the month of ' + mo;
    if(beds==4){ message = col + ' in ' + mun + ', ' + prov + ' was updated to ' + value;}
    if(beds==41){ message = month+' remarks of '+ col + ' was updated to "' + value +'"'; beds=4;}
    return this.http.post<any>(url, { mfo_id, uid, message,beds }).pipe(
      tap(_ => console.log('Updated the Logs')),
      catchError(this.handleError('addLogs', []))
    );
  }

  getSummaryObject() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let pid = user.pid;
    const url = `${this.apiRoot}/summaryObject`;
    return this.http.post(url,{pid});
  }

  getDisbursement() {
    const url = `${this.apiRoot}/disbursement`;
    return this.http.get(url);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
