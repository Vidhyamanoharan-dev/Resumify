import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient,) { }

  uploadResume(userId: number, formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/resumes/upload/${userId}`, formData, {
    responseType: 'text'  // ✅ treat response as plain text
  });
}


  getUserResumes(userId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/resumesByUserId?userId=${userId}`);
  }

}
