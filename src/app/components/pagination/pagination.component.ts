import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() pages: number = 1;
  @Input() itemsNumber: number = 1;
  @Input() itemsPerPage: number = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onPageChange(page: number): void {
    console.log(`Page changed to ${page}`);
  }

  changePage(page: number): void {
    this.page = page;
    this.router.navigate(['categories', `?page=${page}`]);
  }

  counter(count: number) {
    return new Array(count);
  }
}
