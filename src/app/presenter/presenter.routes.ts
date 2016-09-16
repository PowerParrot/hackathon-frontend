import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';
import { PresenterComponent } from './presenter.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'presenter/:id', component: PresenterComponent }
]);
