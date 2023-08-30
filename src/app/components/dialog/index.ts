import { NgModule } from '@angular/core';
import { DialogModule as CdkDialogModule } from '@angular/cdk/dialog';


@NgModule({
  imports: [ CdkDialogModule ],
  exports: [ CdkDialogModule ]
})
export class DialogModule {}
