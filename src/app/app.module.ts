import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [BrowserModule],
  entryComponents: [ShoppingCartComponent]
})
export class AppModule {

  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const myCustomElement = createCustomElement(ShoppingCartComponent, { injector: this.injector });
    customElements.define('shopping-cart', myCustomElement);
  }
}
