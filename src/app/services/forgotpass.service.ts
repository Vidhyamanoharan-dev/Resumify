import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private baseUrl = 'http://localhost:8080/api'; // Change this if your backend base URL is different

  constructor(private http: HttpClient) {}

  sendCode(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/setEmail`, { email }, { responseType: 'text' });
  }

  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/setCode`, { email, validationCode: code },
      { responseType: 'text' }
    ); // ✅ RETURN
  }

  resetPassword(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/newpassword`,
      { email, password },
      { responseType: 'text' } // 👈 Add this line
    );
  }
}



