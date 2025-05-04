import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{title}}!</h1>
    <h1 class="text-sm bg-red-500 font-bold underline">
      Hello world!
    </h1>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Angular-UI-Builder';
}
