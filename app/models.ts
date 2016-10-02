export class Design {
    id: number;
    title:string;
    color: string;
    type: string;
    price: number;
}

export class Order {
    id: number;
    design: Design;
}