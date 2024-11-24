import { Component, OnInit } from '@angular/core';
import { LayoutBaseComponent } from '../../components/layout-base/layout-base.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SplitButtonModule } from 'primeng/splitbutton';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TarefaService } from '../../services/tarefa.service';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../../interfaces/tarefa';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ator',
  standalone: true,
  imports: [
    LayoutBaseComponent,
    TableModule,
    DialogComponent,
    ButtonModule,
    ToastModule,
    SplitButtonModule,
    ConfirmPopupModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './tarefa.component.html',
  providers: [MessageService, ConfirmationService],
  styles: ``,
})
export class TarefaComponent implements OnInit {
  isDialogOpen: boolean = false;
  items!: Tarefa[];
  itemToEdit!: Tarefa | null;
  ator: string = '';
  rowID: number | null = null;
  formGroup: FormGroup;

  constructor(
    private messageService: MessageService,
    private tarefaService: TarefaService,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = new FormGroup({
      nomeTarefa: new FormControl('', [Validators.required]),
      custo: new FormControl(0, [Validators.required]),
      dataLimite: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.listAll();
  }

  toggleDialog() {
    this.formGroup.reset();
    this.itemToEdit = null;
    this.isDialogOpen = !this.isDialogOpen;
  }

  listAll() {
    this.tarefaService.listAll().subscribe({
      next: (res) => {
        this.items = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao listar tarefas',
        });
      },
    });
  }

  handleSave() {
    if (!this.formGroup.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Preencha todos os campos',
      });
      console.log('aqui');
      return;
    }

    if (this.itemToEdit) {
      this.edit();
    } else {
      this.create();
    }
  }

  handleEdit(id: number) {
    this.tarefaService.listById(id).subscribe({
      next: (res) => {
        this.itemToEdit = res;
        this.isDialogOpen = true;
        this.formGroup.patchValue({
          nomeTarefa: res.nomeTarefa,
          custo: res.custo,
          dataLimite: res.dataLimite,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao editar ator',
        });
      },
    });
  }

  handleDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Realmente deseja excluir este registro?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.delete(id);
      },
    });
  }

  edit() {
    const obj: Tarefa = {
      id: this.itemToEdit?.id,
      nomeTarefa: this.formGroup.get('nomeTarefa')?.value,
      custo: this.formGroup.get('custo')?.value,
      dataLimite: this.formGroup.get('dataLimite')?.value,
      ordemApresentacao: this.itemToEdit?.ordemApresentacao,
    };

    this.tarefaService.update(obj).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Registro atualizado com sucesso',
          life: 3000,
        });
        this.itemToEdit = null;
        this.listAll();
        this.toggleDialog();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar registro',
        });
      },
    });
  }

  create() {
    const obj: Tarefa = {
      nomeTarefa: this.formGroup.get('nomeTarefa')?.value,
      custo: this.formGroup.get('custo')?.value,
      dataLimite: this.formGroup.get('dataLimite')?.value,
    };

    this.tarefaService.create(obj).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Registro inserido com sucesso',
          life: 3000,
        });
        this.listAll();
        this.toggleDialog();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao inserir registro',
        });
      },
    });
  }

  delete(id: number) {
    this.tarefaService.delete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Registro excluído com sucesso',
          life: 3000,
        });
        this.listAll();
      },
      error: (err) => {
        let errorMessage: string;
        try {
          const errorResponse = JSON.parse(err.error);
          errorMessage = errorResponse.message;
        } catch {
          errorMessage = 'Erro ao excluir registro';
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage,
        });
      },
    });
  }

  mouseEnterTableRow(id: number): void {
    this.rowID = id;
  }

  mouseLeaveTableRow(): void {
    this.rowID = null;
  }

  arrowUp(itemId: number) {
    const index = this.items.findIndex((item) => item.id === itemId);
    this.tarefaService.orderItems(this.items[index - 1].id!, this.items[index].id!).subscribe({
      next: () => {
        this.listAll();
      }
    })
  }

  arrowDown(itemId: number) {
    const index = this.items.findIndex((item) => item.id === itemId);
    this.tarefaService.orderItems(this.items[index].id!, this.items[index + 1].id!).subscribe({
      next: () => {
        this.listAll();
      }
    })
  }
}
