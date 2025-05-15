import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Adjust this to match your backend

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        // Save token or user ID to localStorage
        localStorage.setItem('userId', res.id);
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}


