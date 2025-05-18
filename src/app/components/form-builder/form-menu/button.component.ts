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
      class="w-full p-3 border border-gray-200 hover:shadow-md transition-shadow rounded-lg flex items-center gap-3 cursor-pointer btn"
      
    >
      
      <div class="rounded-md bg-gray-100 flex items-center justify-center p-1" style="background-color: #c9e6ff !important;">
        <mat-icon class="scale-75" style="color: #006591 !important;">{{ field().icon }}</mat-icon>
      </div>
      <span> {{ field().label }} </span>
      <div *cdkDragPlaceholder></div>

    </button>

    @if(whileDragging()){
      <div 
      class="w-full p-3 border border-gray-200 rounded-lg flex items-center gap-3 cursor-pointer">
      
      <div class="rounded-md bg-gray-100 flex items-center justify-center p-1" style="background-color: #c9e6ff !important;">
        <mat-icon class="scale-75" style="color: #006591 !important;">{{ field().icon }}</mat-icon>
      </div>
      <span> {{ field().label }} </span>
      <div *cdkDragPlaceholder></div>

    </div>
    }
  `,
  styles: `

  .btn:hover{
    border-color: #006591 !important;
  }
  `
})
export class ButtonComponent {
  field = input.required<FieldTypeDefiniton>();

  whileDragging = signal<boolean>(false);
}
