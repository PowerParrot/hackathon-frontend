import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';
import { MicrophoneInputComponent } from './microphone/microphone.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'microphone', component: MicrophoneInputComponent }
]);
