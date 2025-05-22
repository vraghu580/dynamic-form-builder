import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-config.component.html',
  styleUrls: ['./form-config.component.css']
})
export class FormConfigComponent {
  fieldLabel = '';
  fieldType = 'text';
  isRequired = false;

  fields: any[] = [];
  shareableLink: string = '';

  constructor(private router: Router) {}

  addField() {
    this.fields.push({
      label: this.fieldLabel,
      type: this.fieldType,
      required: this.isRequired
    });

    this.fieldLabel = '';
    this.fieldType = 'text';
    this.isRequired = false;
  }

  removeField(index: number) {
    this.fields.splice(index, 1);
  }

  previewForm() {
    const data = encodeURIComponent(JSON.stringify(this.fields));
    this.router.navigate(['/render'], { queryParams: { data } });
  }

  generateLink() {
    const data = encodeURIComponent(JSON.stringify(this.fields));
    this.shareableLink = `${window.location.origin}/render?data=${data}`;
  }

  copyLink() {
    this.generateLink();
    navigator.clipboard.writeText(this.shareableLink).then(() => {
      alert('📋 Link copied to clipboard!');
    });
  }
}
