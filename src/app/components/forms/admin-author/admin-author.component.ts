import { AuthorService } from './../../../services/author/author.service';
import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../../services/token/token.service';
import Author from '../../../interfaces/author';
import { Category } from '../../../interfaces/category';
import { CategoryService } from '../../../services/category/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-author',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './admin-author.component.html',
  styleUrl: './admin-author.component.css',
})
export class AdminAuthorComponent {
  @Input() close() {}
  @Input() author?: Author;
  @Input() authors: Author[] = [];
  @Input() token: string | null = null;
  authorForm: FormGroup;
  imageUrl: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorService
  ) {
    this.authorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: [null, Validators.required],
      bio: [''],
      image: null,
    });
  }

  ngOnInit() {
    if (this.author?.dob) {
      this.authorForm.patchValue({
        ...this.author,
        dob: new Date(this.author.dob).toISOString().split('T')[0],
      });
      this.setImageUrl(this.author.image as File);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.type)) {
      this.authorForm.patchValue({ image: file });
      this.setImageUrl(file);
    }
  }

  setImageUrl(image: string | File) {
    if (typeof image === 'string') {
      this.imageUrl = image;
    } else if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(image);
    }
  }

  onDateSelect(event: any) {
    this.authorForm.patchValue({ dob: event.target.value });
  }
   //add moment
  onSubmit() {
    this.authorForm.markAllAsTouched();
    if (this.authorForm.valid && this.token) {
      const formData = new FormData();
      formData.append('firstName', this.authorForm.get('firstName')!.value);
      formData.append('lastName', this.authorForm.get('lastName')!.value);
      formData.append('dob', this.authorForm.get('dob')!.value);
      formData.append('bio', this.authorForm.get('bio')!.value);
      formData.append('image', this.authorForm.get('image')!.value);
      let request$;
      let updated = false;
      if (this.author) {
        const formValues = this.authorForm.value;
        const isChanged = Object.keys(formValues).some(
          (key) =>
            this.author && formValues[key] !== this.author[key as keyof Author]
        );

        if (!isChanged) {
          this.authorForm.reset();
          this.close();
          return;
        }
        request$ = this.authorService.updateAuthor(
          formData,
          this.token,
          this.author._id
        );
        updated = true;
      } else {
        request$ = this.authorService.addAuthor(formData, this.token);
      }

      request$.subscribe({
        next: (response) => {
          this.authorService.updateAuthors();
          this.authorForm.reset();
          this.close();
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Author ${updated ? 'updated' : 'added'} successfully.`,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error.message,
          });
        },
      });
    }
  }
}
