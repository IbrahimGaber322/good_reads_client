import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  @Input() myreview!:any

}
