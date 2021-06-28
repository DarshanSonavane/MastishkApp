import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamplePagePageRoutingModule } from './example-page-routing.module';

import { ExamplePagePage } from './example-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamplePagePageRoutingModule
  ],
  declarations: [ExamplePagePage]
})
export class ExamplePagePageModule {}
