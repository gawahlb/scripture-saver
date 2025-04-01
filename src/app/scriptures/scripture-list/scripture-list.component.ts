import { Component, OnDestroy, OnInit } from '@angular/core';
import { Scripture } from '../scripture.model';
import { ScriptureService } from '../scripture.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scripture-list',
  standalone: false,
  
  templateUrl: './scripture-list.component.html',
  styleUrl: './scripture-list.component.css'
})
export class ScriptureListComponent implements OnInit,OnDestroy{
  subscription: Subscription;

  scriptures: Scripture[] = []

  constructor(private scriptureService: ScriptureService) {}

  ngOnInit() {
    this.scriptures = this.scriptureService.getScriptures();

    this.subscription = this.scriptureService.scriptureListChangedEvent.subscribe((scripturesList: Scripture[]) => {
      this.scriptures = scripturesList;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
