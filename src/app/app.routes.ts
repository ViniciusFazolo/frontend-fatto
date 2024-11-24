import { Routes } from '@angular/router';
import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: TarefaComponent,
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
