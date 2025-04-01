//import { Component } from '@angular/core';
//
//@Component({
//  selector: 'app-scripture-detail',
//  standalone: false,
//  templateUrl: './scripture-detail.component.html',
//  styleUrl: './scripture-detail.component.css'
//})
//export class ScriptureDetailComponent {
//
//}

import { Component, OnInit } from '@angular/core';
import { Scripture } from '../scripture.model';
import { ScriptureService } from '../scripture.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-scripture-detail',
  standalone: false,
  
  templateUrl: './scripture-detail.component.html',
  styleUrl: './scripture-detail.component.css'
})
export class ScriptureDetailComponent implements OnInit{
  scripture: Scripture;
  id: string;
  nativeWindow: any;

  constructor(private scriptureService: ScriptureService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.scripture = this.scriptureService.getScripture(this.id);
      })

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    if (this.scripture.url) {
      this.nativeWindow.open(this.scripture.url);
    }
  }

  onDelete() {
    this.scriptureService.deleteScripture(this.scripture);
    this.router.navigate(['/scriptures']);
 }
}
