import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBooksComponent } from './category-books.component';

describe('CategoryBooksComponent', () => {
  let component: CategoryBooksComponent;
  let fixture: ComponentFixture<CategoryBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
