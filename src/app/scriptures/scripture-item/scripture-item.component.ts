import { Component, Input } from '@angular/core';
import { Scripture } from '../scripture.model';

@Component({
  selector: 'app-scripture-item',
  standalone: false,
  
  templateUrl: './scripture-item.component.html',
  styleUrl: './scripture-item.component.css'
})
export class ScriptureItemComponent {
  @Input() scripture: Scripture;
  @Input() id: number;
}
