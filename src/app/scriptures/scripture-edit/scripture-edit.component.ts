//import { Component } from '@angular/core';
//
//@Component({
//  selector: 'app-scripture-edit',
//  standalone: false,
//  templateUrl: './scripture-edit.component.html',
//  styleUrl: './scripture-edit.component.css'
//})
//export class ScriptureEditComponent {
//
//}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Scripture } from '../scripture.model';
import { ScriptureService } from '../scripture.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scripture-edit',
  standalone: false,
  
  templateUrl: './scripture-edit.component.html',
  styleUrl: './scripture-edit.component.css'
})
export class ScriptureEditComponent implements OnInit{
  @ViewChild('f') scriptureForm: NgForm;
  originalScripture: Scripture;
  scripture: Scripture;
  editMode: boolean = false;
  subscription: Subscription;
  id: string;
  editedDocIndex: number;

  constructor(
    private scriptureService: ScriptureService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  onCancel() {
    this.router.navigate(['/scriptures']);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalScripture = this.scriptureService.getScripture(this.id);

      if(!this.originalScripture) {
        return;
      }

      this.editMode = true;
      this.scripture = JSON.parse(JSON.stringify(this.originalScripture));
    });

  }

  onSubmit(form: NgForm) {
    const value = form.value;

    let newScripture = new Scripture(
      value.id, 
      value.verse, 
      value.notes,
      value.url);

    if (this.editMode) {
      this.scriptureService.updateScripture(this.originalScripture, newScripture);
    } else {
      this.scriptureService.addScripture(newScripture);
    }

    this.router.navigate(['/scriptures']);
  }
}
