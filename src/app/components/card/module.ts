import { NgModule }from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { IconsModule } from '../icons';

import { CardComponent } from './card';

@NgModule({
  declarations: [CardComponent],
  imports: [IconsModule, CommonModule, A11yModule],
  exports: [CardComponent]
})
export class CardModule {}
