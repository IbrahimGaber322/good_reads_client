import { NgFor, NgIf } from '@angular/common';
import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-author',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './admin-author.component.html',
  styleUrl: './admin-author.component.css'
})
export class AdminAuthorComponent {

  @Input() setCreate(bool:Boolean){}
  authorForm: FormGroup;
  imageUrl: string|null = null;


  categoryOptions = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Fantasy'];
  authorOptions = ['Author 1', 'Author 2', 'Author 3', 'Author 4', 'Author 5'];


  constructor(private formBuilder: FormBuilder) {
    this.authorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      bio: [''],
      image: [''],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.authorForm.patchValue({ image: this.imageUrl });
      };
      reader.readAsDataURL(file);
    }
  }

  onDateSelect(event: any) {
    this.authorForm.patchValue({ dob: event });
  }

  onSubmit() {
    this.authorForm.markAllAsTouched();
    if (this.authorForm.valid) {
      console.log(this.authorForm.value);
      this.authorForm.reset();
      this.setCreate(false);
    }
  }
}
