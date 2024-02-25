import { Component, Input } from '@angular/core';
import { AdminDeleteComponent } from '../../forms/admin-delete/admin-delete.component';
import Author from '../../../interfaces/author';

@Component({
  selector: 'app-admin-authors',
  standalone: true,
  imports: [AdminDeleteComponent],
  templateUrl: './admin-authors.component.html',
  styleUrl: './admin-authors.component.css'
})
export class AdminAuthorsComponent {
  authors = [
    {
      _id:"wsinfgu53rti89435",
      firstName: "John",
      lastName: "Doe",
      dob: new Date("1980-01-01"),
      bio: "John Doe is a prolific author...",
      image: "https://example.com/john-doe.jpg",
    },
    {
      _id:"wsinfguisgyh4589435",
      firstName: "Jane",
      lastName: "Smith",
      dob: new Date("1975-05-15"),
      bio: "Jane Smith is an award-winning author...",
      image: "https://example.com/jane-smith.jpg",
    },
    {
      _id:"wsinfguk56yhi89435",
      firstName: "Alice",
      lastName: "Johnson",
      dob: new Date("1990-12-10"),
      bio: "Alice Johnson is a bestselling author...",
      image: "https://example.com/alice-johnson.jpg",
    },
  ];

  @Input() edit(author:Author){}
}
