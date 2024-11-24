import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Output() open = new EventEmitter();

  toggleSidebar(){
    this.open.emit();
  }
}
