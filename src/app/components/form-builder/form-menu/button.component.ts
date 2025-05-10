import { Component, input, output, signal } from '@angular/core';
import { FieldTypeDefiniton } from '../../../models/form';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-button',
  imports: [
    MatIconModule,
    DragDropModule
  ],
  template: `
    <button 
      cdkDrag
      [cdkDragData]="field()"
      (cdkDragStarted)="whileDragging.set(true)"
      (cdkDragEnded)="whileDragging.set(false)"
      class="w-full p-3 border border-gray-200 hover:border-black hover:shadow-md transition-shadow rounded-lg flex items-center gap-3 cursor-pointer">
      
      <div class="rounded-md bg-gray-100 flex items-center justify-center p-1">
        <mat-icon class="scale-75">{{ field().icon }}</mat-icon>
      </div>
      <span> {{ field().label }} </span>
      <div *cdkDragPlaceholder></div>

    </button>

    @if(whileDragging()){
      <div 
      class="w-full p-3 border border-gray-200 rounded-lg flex items-center gap-3 cursor-pointer">
      
      <div class="rounded-md bg-gray-100 flex items-center justify-center p-1">
        <mat-icon class="scale-75">{{ field().icon }}</mat-icon>
      </div>
      <span> {{ field().label }} </span>
      <div *cdkDragPlaceholder></div>

    </div>
    }
  `,
  styles: ``
})
export class ButtonComponent {
  field = input.required<FieldTypeDefiniton>();

  whileDragging = signal<boolean>(false);
}
