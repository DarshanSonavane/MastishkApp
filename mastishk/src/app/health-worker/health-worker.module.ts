import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthWorkerPageRoutingModule } from './health-worker-routing.module';

import { HealthWorkerPage } from './health-worker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthWorkerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HealthWorkerPage]
})
export class HealthWorkerPageModule {}
