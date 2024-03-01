import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user/user.service';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  token!: string | null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.token = params.get('token');
      if (this.token) {
        this.confirm();
      } else {
        Swal.fire('Error', 'Token not found', 'error');
      }
    });
  }

  confirm() {
    this.userService.confirmUser(this.token).subscribe({
      next: (response: any) => {
        this.tokenService.setToken(response.token);
        Swal.fire('Success', response.message, 'success');
        this.router.navigate(['/']);
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      },
    });
  }
}
