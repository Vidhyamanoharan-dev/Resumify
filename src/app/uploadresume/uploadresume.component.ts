import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-uploadresume',
    standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule ],

  templateUrl: './uploadresume.component.html',
  styleUrl: './uploadresume.component.scss'
})
export class UploadresumeComponent {

}
