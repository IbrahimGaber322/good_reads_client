import { Component } from '@angular/core';
import { AuthorCardComponent } from '../author-card/author-card.component';
import { AuthorService } from '../../../services/author/author.service';
import Author from '../../../interfaces/author';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [AuthorCardComponent],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css',
})
export class AuthorListComponent {
  authors!: Author[];

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.authorService
      .getAuthors()
      .subscribe((res) => (this.authors = res.authors));
  }
}
