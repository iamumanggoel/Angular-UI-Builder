import { Directive, HostBinding, input, OnInit } from '@angular/core';

export type StyleKey = 'primary-container' | 'secondary-container' | 'button-primary' | 'header';


@Directive({
  selector: '[appStyle]'
})
export class StyleDirective implements OnInit {

  private readonly styles: Record<StyleKey, string> = {
    'primary-container': 'p-4 bg-white rounded-lg border-gray-200 shadow-sm',
    'secondary-container': 'p-2 bg-gray-50 rounded h-full',
    'button-primary': 'px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600',
    'header': 'text-xl font-semibold text-gray-800 mb-4',
  };


  appStyle = input.required<StyleKey>();
  @HostBinding('class') classNames = '';


  ngOnInit(): void {
      if(!this.appStyle()){
        throw new Error('appStyle is required');
      }

      const found = this.styles[this.appStyle()];
      if(!found){
        throw new Error(`Style ${this.appStyle()} not found`);
      }
      this.classNames = found;
  }
}
