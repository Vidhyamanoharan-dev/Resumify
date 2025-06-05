import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../home/footer/footer.component';

@Component({
  selector: 'app-help',
  standalone:true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {

}
