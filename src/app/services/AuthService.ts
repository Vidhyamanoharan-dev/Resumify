import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; // Adjust if needed

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Signup method
  signup(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  // Forgot password method
  forgotPassword(data: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, data);
  }

  // Optional: Save JWT to local storage
  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
  sendOtp(email: string) {
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, { email });
  }


  verifyOtp(email: string, otp: string) {
    return this.http.post(`${this.baseUrl}/verify-otp`, { email, otp });
  }

  resetPassword(email: string, newPassword: string) {
    return this.http.post(`${this.baseUrl}/reset-password`, { email, newPassword });
  }

}
