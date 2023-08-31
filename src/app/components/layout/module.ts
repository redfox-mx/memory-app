import { NgModule } from '@angular/core';
import { LayoutModule as CdkLayoutModule } from '@angular/cdk/layout';
import { HeaderComponent } from './header/header';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../icons';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    CdkLayoutModule,
  ],
  exports: [
    CdkLayoutModule,
    HeaderComponent
  ]
})
export class LayoutModule {}
