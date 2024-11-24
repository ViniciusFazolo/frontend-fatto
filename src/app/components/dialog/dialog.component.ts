import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ButtonModule, DialogModule],
  templateUrl: './dialog.component.html',
  styles: ``
})
export class DialogComponent {
  @Input() visible: boolean = false
  @Input() header: string = ''
  @Output() closeDialog = new EventEmitter() 

  close(){
    this.closeDialog.emit()
  }
}
