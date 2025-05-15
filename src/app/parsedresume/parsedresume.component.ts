import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-parsedresume',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './parsedresume.component.html',
  styleUrl: './parsedresume.component.scss'
})
export class ParsedresumeComponent {
resumes = [
    {
      id: '#1001',
      name: 'Olivia Rhye',
      skills: ['Angular', 'TypeScript', 'SCSS'],
      experience: '5 years'
    },
    {
      id: '#1002',
      name: 'Phoenix Baker',
      skills: ['Java', 'Spring Boot', 'SQL'],
      experience: '4 years'
    },
    {
      id: '#1003',
      name: 'Lana Steiner',
      skills: ['Python', 'Django', 'REST'],
      experience: '6 years'
    },
    {
      id: '#1004',
      name: 'Demi Wilkinson',
      skills: ['Node.js', 'Express', 'MongoDB'],
      experience: '3 years'
    },
    {
      id: '#1005',
      name: 'Candice Wu',
      skills: ['C++', 'Qt'],
      experience: '2 years'
    }
  ];

}
