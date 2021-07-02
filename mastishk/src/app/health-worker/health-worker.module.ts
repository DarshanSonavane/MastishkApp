import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthWorkerPageRoutingModule } from './health-worker-routing.module';

import { HealthWorkerPage } from './health-worker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthWorkerPageRoutingModule
  ],
  declarations: [HealthWorkerPage]
})
export class HealthWorkerPageModule {}
