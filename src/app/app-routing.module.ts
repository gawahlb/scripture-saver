//import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
//
//const routes: Routes = [];
//
//@NgModule({
//  imports: [RouterModule.forRoot(routes)],
//  exports: [RouterModule]
//})
//export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScripturesComponent } from './scriptures/scriptures.component';
import { ScriptureEditComponent } from './scriptures/scripture-edit/scripture-edit.component';
import { ScriptureDetailComponent } from './scriptures/scripture-detail/scripture-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/scriptures', pathMatch: 'full' },
  { path: 'scriptures', component: ScripturesComponent, children: [
      { path: 'new', component: ScriptureEditComponent },
      { path: ':id', component: ScriptureDetailComponent },
      { path: ':id/edit', component: ScriptureEditComponent },
    ]
  }  
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }