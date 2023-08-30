import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

import { DialogModule } from '@memory/components/dialog';
import { IconsModule } from '@memory/components/icons';
import { CardModule } from '@memory/components/card';
import { LayoutModule } from '@memory/components/layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { GameView } from './game/views/home/game.view'
import { UsernameFormComponent } from './game/modals/username-form/username.form';
import { WinnerDialogComponent } from './game/modals/winner/winner.modal';

const VIEWS = [
  GameView
]

const COMPONENTS = [
  UsernameFormComponent,
  WinnerDialogComponent,
]

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...VIEWS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    A11yModule,
    AppRoutingModule,
    IconsModule,
    CardModule,
    DialogModule,
    LayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
