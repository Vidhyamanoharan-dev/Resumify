import { Component } from '@angular/core';
import { FooterComponent } from "../../home/footer/footer.component";

@Component({
  selector: 'app-blog',
  imports: [FooterComponent],
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

}
