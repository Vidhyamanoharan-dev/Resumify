import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AboutpageComponent } from '../../footer-pages/aboutpage/aboutpage.component';
import { CareersComponent } from '../../footer-pages/careers/careers.component';
import { BlogComponent } from '../../footer-pages/blog/blog.component';
import { PressComponent } from '../../footer-pages/press/press.component';
import { PricingComponent } from '../../footer-pages/pricing/pricing.component';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private router: Router) {}

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
