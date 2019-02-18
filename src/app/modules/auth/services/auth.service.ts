import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnLoginAnswer, RegisterInfo } from './../interfaces/OnLoginAnswer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  private apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<OnLoginAnswer> {

    return this.http.post<OnLoginAnswer>(`${this.apiUrl}/public/auth/login`, { email, password }, this.httpOptions).pipe(
      map((res: OnLoginAnswer): OnLoginAnswer => {
        if (!res.error) {
          localStorage.setItem('mlp_client_id', res.id);
          localStorage.setItem('mlp_client_token', res.token);
        }

        return res;
      })
    )
  }
  register( registerInfo: object) {
      return this.http.post(`${this.apiUrl}/public/auth/signup`, {...registerInfo}, this.httpOptions);
    }
}
