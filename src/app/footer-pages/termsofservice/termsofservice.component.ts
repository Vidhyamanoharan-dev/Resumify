import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../home/footer/footer.component";



@Component({
  selector: 'app-termsofservice',
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './termsofservice.component.html',
  styleUrl: './termsofservice.component.scss'
})
export class TermsofserviceComponent {

}
