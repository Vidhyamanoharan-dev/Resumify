import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-resume-parser',
  imports:[FormsModule,NgFor],
    standalone: true,
  templateUrl: './parsedresume.component.html',
  styleUrl: './parsedresume.component.scss'
})
export class ResumeParserComponent implements OnInit{

    resumes: any[] = [];

  constructor(private uploadService: UploadService) {}

ngOnInit(): void {
    const userIdStr = localStorage.getItem('userId');
    if (!userIdStr) {
      alert('User not logged in.');
      return;
    }
    const userId = parseInt(userIdStr, 10);
    this.uploadService.getUserResumes(userId).subscribe({
      next: (resumes) => {
        this.resumes = resumes;
        console.log('Parsed resumes:', this.resumes);
      },
      error: (err) => {
        console.error('Failed to fetch resumes', err);
      }
    });
  }

  searchText = '';
  get filteredResumes() {
    return this.resumes.filter(resume =>
      resume.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      resume.skills.some((skill: string) => skill.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  deleteResume(index: number) {
    this.resumes.splice(index, 1);
  }

  deleteAll() {
    this.resumes = [];
  }

  sortByExperience() {
    this.resumes.sort((a, b) => b.experience - a.experience);
  }
}
