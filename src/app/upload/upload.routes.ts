import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploadComponent } from './upload.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'upload', component: UploadComponent }
]);
