import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  users: User[] = [
    {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      image: "https://example.com/john-doe.jpg",
      admin: true,
      confirmed: true,
    },
    {
      _id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      image: "https://example.com/jane-smith.jpg",
      admin: false,
      confirmed: true,
    },
    {
      _id: "3",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      admin: false,
      confirmed: false,
    },
  ];
}
