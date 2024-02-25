import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
 @Input() currentPage: number=1;
@Input() totalPages!: number;
@Input() itemsPerPage!: number;
@Input() totalItems!: number;
@Output() pageChanged: EventEmitter<number> = new EventEmitter();
  
constructor(private router:Router) {}

  ngOnInit(): void {}

  onPageChange(page: number): void {
    console.log(`Page changed to ${page}`);
  }


  changePage(page: number): void {
 
      this.currentPage = page;
      this.router.navigate(['categories',`?page=${page}`])

      console.log(this.currentPage)
      this.pageChanged.emit(page);
    
  }
}
