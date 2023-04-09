export interface IProduct {
    count: number;
    title: string;
    description: string;
    id: string;
    price: number;
}

export type IProductDB = {
    TableName: string;
    Item: {
        id: { S: string },
        title: { S: string },
        price: { N: number },
        description: { S: string },
    },
}