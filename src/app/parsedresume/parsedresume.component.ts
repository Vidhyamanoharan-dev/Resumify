import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-resume-parser',
  imports:[FormsModule,NgIf,NgFor],
    standalone: true,
  templateUrl: './parsedresume.component.html',
  styleUrl: './parsedresume.component.scss'
})
export class ParsedresumeComponent implements OnInit {
  resumes: any[] = [];
  searchText = '';
  selectedExperienceRange = '';
  selectedSkill = '';
  
  showSortDropdown = false;
  showFilterDropdown = false;

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

  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
    this.showFilterDropdown = false;
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
    this.showSortDropdown = false;
  }

  setExperienceRange(range: string) {
    this.selectedExperienceRange = range;
    this.showSortDropdown = false;
  }

  applySkillFilter(skill: string) {
    this.selectedSkill = skill.toLowerCase();
    this.showFilterDropdown = false;
  }

  get filteredResumes() {
    return this.resumes.filter(resume => {
      // Filter by search text
      const matchesSearch = resume.name?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        resume.skills?.some((skill: string) => skill.toLowerCase().includes(this.searchText.toLowerCase()));

      // Filter by experience range
      const exp = resume.yearsOfExperience;
      let matchesExperience = true;
      switch (this.selectedExperienceRange) {
        case '0-1':
          matchesExperience = exp >= 0 && exp <= 1;
          break;
        case '1-2':
          matchesExperience = exp > 1 && exp <= 2;
          break;
        case '2-3':
          matchesExperience = exp > 2 && exp <= 3;
          break;
        case '3-5':
          matchesExperience = exp > 3 && exp <= 5;
          break;
        case '5+':
          matchesExperience = exp > 5;
          break;
      }

      // Filter by selected skill
      const matchesSkill = this.selectedSkill
        ? resume.skills?.some((skill: string) => skill.toLowerCase().includes(this.selectedSkill))
        : true;

      return matchesSearch && matchesExperience && matchesSkill;
    });
  }

  deleteResume(index: number) {
    this.resumes.splice(index, 1);
  }

  deleteAll() {
    this.resumes = [];
  }


  onFileSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (file.type !== 'application/pdf') {
    alert('Please upload a PDF file.');
    return;
  }

  const userIdStr = localStorage.getItem('userId');
  if (!userIdStr) {
    alert('User not logged in.');
    return;
  }
  const userId = parseInt(userIdStr, 10);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId.toString());

  this.uploadService.uploadResume(userId, formData).subscribe({
    next: (response) => {
      console.log('Resume uploaded:', response);
      this.resumes.push(response); // Assuming backend returns the parsed resume object
    },
    error: (error) => {
      console.error('Upload failed:', error);
      alert('Failed to upload resume.');
    }
  });
}

}
