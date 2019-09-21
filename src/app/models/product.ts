export class Product {
    name: string;
    price: number;
    stock: number;
    vendor: string;
    quantity: number;

    constructor(
        name: string,
        price: number,
        vendor: string,
        quantity: number
    ) { 
        this.name = name;
        this.price = price;
        this.vendor = vendor;
        this.quantity = quantity;
    }
}
