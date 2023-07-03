export interface IProduct {
    id?: number,
    nome: string,
    descricao: string,
    preco: number,
    data_criacao?: Date,
    data_atualizacao?: Date
}