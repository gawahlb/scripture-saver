//import { NgModule } from '@angular/core';
//import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
//
//import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';
//
//@NgModule({
//  declarations: [
//    AppComponent
//  ],
//  imports: [
//    BrowserModule,
//    AppRoutingModule
//  ],
//  providers: [
//    provideClientHydration(withEventReplay())
//  ],
//  bootstrap: [AppComponent]
//})
//export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ScripturesComponent } from './scriptures/scriptures.component';
import { ScriptureListComponent } from './scriptures/scripture-list/scripture-list.component';
import { ScriptureItemComponent } from './scriptures/scripture-item/scripture-item.component';
import { ScriptureDetailComponent } from './scriptures/scripture-detail/scripture-detail.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { MessageService } from './messages/message.service';
import { ScriptureEditComponent } from './scriptures/scripture-edit/scripture-edit.component';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScripturesComponent,
    ScriptureListComponent,
    ScriptureItemComponent,
    ScriptureDetailComponent,
    DropdownDirective,
    ScriptureEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DndModule,
  ],
  providers: [
    MessageService,
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
