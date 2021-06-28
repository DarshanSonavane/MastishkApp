import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamplePagePage } from './example-page.page';

const routes: Routes = [
  {
    path: '',
    component: ExamplePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplePagePageRoutingModule {}
