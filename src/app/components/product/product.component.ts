import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../model/product";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product: any;

  @Output()
  buyProductUp = new EventEmitter();

  @Output()
  deleteProductUp=new EventEmitter()



  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  buyProduct(product: Product) {

    this.buyProductUp.emit(product);
  }

  deleteProduct(product: Product) {
    this.deleteProductUp.emit(product)

  }
}
