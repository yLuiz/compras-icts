import { IProduct } from "./IProduct";

export interface IPurchase {
    id?: number,
    status: string,
    total: number,
    tipo_pagamento: string,
    produtos: IProduct[] | null
}

export interface IPurchaseCreate {
    status: string,
    tipo_pagamento: string,
    produtos: number[]
}