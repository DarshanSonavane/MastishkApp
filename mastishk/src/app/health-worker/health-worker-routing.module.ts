import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthWorkerPage } from './health-worker.page';

const routes: Routes = [
  {
    path: '',
    component: HealthWorkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthWorkerPageRoutingModule {}
