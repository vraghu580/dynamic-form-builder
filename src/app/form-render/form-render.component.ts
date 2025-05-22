import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-render',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-render.component.html',
  styleUrls: ['./form-render.component.css'] // optional
})
export class FormRenderComponent implements OnInit {
  form: FormGroup;
  fields: any[] = [];
  submittedData: any = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const encoded = params['data'];
      if (encoded) {
        try {
          this.fields = JSON.parse(decodeURIComponent(encoded));
          this.buildForm();
        } catch (e) {
          console.error('Invalid form data');
        }
      }
    });
  }

  buildForm() {
    this.fields.forEach(field => {
      this.form.addControl(
        field.label,
        this.fb.control('', field.required ? Validators.required : [])
      );
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submittedData = this.form.value;
      console.log('Form submitted:', this.submittedData);
    }
  }
}
