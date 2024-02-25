import { NgFor, NgIf } from '@angular/common';
import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../../services/token/token.service';
import Author from '../../../interfaces/author';
import { AuthorService } from '../../../services/author/author.service';
import { Category } from '../../../interfaces/category';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-admin-author',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './admin-author.component.html',
  styleUrl: './admin-author.component.css'
})
export class AdminAuthorComponent {

  @Input() close() {}
  @Input() author?: Author;
  authorForm: FormGroup;
  imageUrl: string|null = null;
  token: String | null = null;



  constructor(private formBuilder: FormBuilder, private tokenService:TokenService, private authorService: AuthorService) {
    this.authorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: [new Date(), Validators.required],
      bio: [''],
      image: null,
    });
  }

  ngOnInit() {
    this.token = this.tokenService.getToken();
    if (this.author?.dob) {
      console.log(new Date(this.author.dob))
      this.authorForm.patchValue({...this.author, dob: new Date(this.author.dob).toISOString().split('T')[0]});
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
    this.authorForm.patchValue({ dob: new Date(event.target.value) });
    console.log(this.authorForm.value.dob)
  }

  onSubmit() {
    this.authorForm.markAllAsTouched();
   
    if (this.authorForm.valid && this.token) {
      const formData = new FormData();
      formData.append('firstName', this.authorForm.get('firstName')!.value);
      formData.append('lastName', this.authorForm.get('lastName')!.value);
      formData.append('dob', this.authorForm.get('dob')!.value.toISOString());
      formData.append('bio', this.authorForm.get('bio')!.value);
      formData.append('image', this.authorForm.get('image')!.value);
      console.log(formData);
      let request$;
      if (this.author) {
        const formValues = this.authorForm.value;
        const isChanged = Object.keys(formValues).some(
          (key) => this.author && formValues[key] !== this.author[key as keyof Author]
        );

        if (!isChanged) {
          this.authorForm.reset();
          this.close();
          return;
        }
        request$ = this.authorService.updateAuthor(
          formData,
          localStorage.getItem('auth_token') || 'null',
          this.author._id
        );
      } else {
        request$ = this.authorService.addAuthor(
          formData,
          localStorage.getItem('auth_token') || 'null'
        );
      }

      request$.subscribe(() => {
        this.authorForm.reset();  
        this.authorService.updateAuthors();
        this.close();
      });
    }
  }
}
