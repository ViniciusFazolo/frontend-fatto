export interface Tarefa {
    id?: number;
    nomeTarefa: string;
    custo: number;
    dataLimite: string;
    ordemApresentacao?: number;
}