import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonModule, SidebarModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() show: boolean = false;
  @Output() closeModal = new EventEmitter()
  
  close(){
    this.closeModal.emit()
  }
}
