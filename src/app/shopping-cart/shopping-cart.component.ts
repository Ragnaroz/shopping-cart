import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { element } from 'protractor';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  @Input()
  set message(message: Product) {
    this.addProductToList(message);
  }
  @Output() onPurchase: EventEmitter<Array<Product>> = new EventEmitter<Array<Product>>();

  public productList: Array<Product> = [];
  public totalPrice: number = 0;

  constructor(
    private cRef: ChangeDetectorRef,
    private elRef: ElementRef
  ) { 
  }

  ngOnInit() {
  }

  private addProductToList(product: Product) {
    let filteredProduct = this.productList.filter(p => {
      return p.name === product.name;
    })[0];

    if (filteredProduct) {
      filteredProduct.quantity += product.quantity;
    } else {
      let newProduct: Product = new Product(product.name, product.price, product.vendor, product.quantity);
      this.productList.push(newProduct);
    }
    this.updateTotalPrice();
  }
  
  private updateTotalPrice(): void {
    this.totalPrice = this.productList.reduce(function(a, b) { return a + b.price * b.quantity; }, 0);
  }

  public remove(product: Product, index: number): void {
    this.productList = this.productList.filter(p => {
      return p.name !== product.name;
    });
    
    let productCartEle = document.querySelector('product-cart');
    if(productCartEle != null) {
      productCartEle['message'] = product;
    }
    this.updateTotalPrice();
    this.cRef.detectChanges();
  }

  public purchase(): void {    
    this.onPurchase.emit(this.productList);
    this.productList = [];
    this.updateTotalPrice();
    this.cRef.detectChanges();
  }
}
