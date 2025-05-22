import { Routes } from '@angular/router';
import { FormConfigComponent } from './form-config/form-config.component';
import { FormRenderComponent } from './form-render/form-render.component';

export const routes: Routes = [
  { path: '', component: FormConfigComponent },
  { path: 'render', component: FormRenderComponent }
];
