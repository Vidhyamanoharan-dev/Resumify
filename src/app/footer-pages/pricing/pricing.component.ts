import { Component } from '@angular/core';
import { FooterComponent } from "../../home/footer/footer.component";

@Component({
  selector: 'app-pricing',
  imports: [FooterComponent],
  standalone: true,
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {

}
