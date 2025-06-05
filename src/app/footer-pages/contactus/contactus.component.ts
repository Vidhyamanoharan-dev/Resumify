import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../home/footer/footer.component";

@Component({
  selector: 'app-contactus',
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {

}
