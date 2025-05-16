import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(userData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, userData); // ✅ RETURN it
}

  private apiUrl = 'http://localhost:8080/api/auth';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('userId', res.id);
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          this.isLoggedInSubject.next(true); // ✅ Update login status
        }
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.isLoggedInSubject.next(false); // ✅ Update login status
    }
  }


  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getUserId(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  }
}
