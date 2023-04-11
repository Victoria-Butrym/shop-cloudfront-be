export interface IProduct {
    title: string;
    description: string;
    id: string;
    price: number;
}

export interface IStock {
    product_id: string;
    count: number;
}

export interface IProductStock extends IProduct {
    count: number
}