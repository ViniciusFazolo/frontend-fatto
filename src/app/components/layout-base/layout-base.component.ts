import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-layout-base',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, ButtonModule, NgClass],
  templateUrl: './layout-base.component.html',
})
export class LayoutBaseComponent {
  @Input() title: string = ''
  @Input() btnTitle: string = ''
  @Output() toggleDialog = new EventEmitter()
  showNavbar: boolean = false;

  toggleNavbar(){
    this.showNavbar = !this.showNavbar
  }

  btnNew(){
    this.toggleDialog.emit()
  }
}
