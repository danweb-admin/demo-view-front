import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environments';
import { AppConfigService } from './app-config.service';

const URL_CALENDARS = '/api/v1/calendar';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl: string;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.apiUrl = appConfig.apiUrl;
  }

  getCalendarView(startDate: string, endDate: string): Observable<any>{
    return this.http.get(`${this.apiUrl}${URL_CALENDARS}/view?startDate=${startDate}&endDate=${endDate}`)
    .pipe(map((resp: any) => {
      return resp;
    }));
  }

  

//   save(calendar: Calendar): Observable<Calendar>{
//     return this.http.post(`${environment.URL_API}${URL_CALENDARS}`,calendar)
//     .pipe(map((resp: Calendar) => {
//       return resp;
//     }));
//   }

//   update(calendar: Calendar): Observable<Calendar>{
//     return this.http.put(`${environment.URL_API}${URL_CALENDARS}/${calendar.id}`,calendar)
//     .pipe(map((resp: Calendar) => {
//       return resp;
//     }));
//   }

  
}


