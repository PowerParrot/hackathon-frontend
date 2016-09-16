import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'upload',  pathMatch: 'full' },
  { path: 'upload', component: UploadComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
