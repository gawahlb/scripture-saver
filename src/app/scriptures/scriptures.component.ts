import { Component } from '@angular/core';
import { Scripture } from './scripture.model';
import { ScriptureService } from './scripture.service';

@Component({
  selector: 'app-scriptures',
  standalone: false,
  
  templateUrl: './scriptures.component.html',
  styleUrl: './scriptures.component.css'
})
export class ScripturesComponent {
  selectedScripture: Scripture;
  
  constructor(private scriptureService: ScriptureService) {}

  ngOnInit() {
    this.scriptureService.scriptureSelectedEvent.subscribe(
      (scripture: Scripture) => {
        this.selectedScripture = scripture;
      }
    )
  }
}
