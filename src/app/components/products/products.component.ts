import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../settings/BASE_URL";
import {Product} from "../../model/product";
import {FormControl, FormGroup} from "@angular/forms";
import {VendingMachine} from "../../model/VendingMachine";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // @ts-ignore
  products: Product[];

  // @ts-ignore
  vendingMachine: VendingMachine[];

  // @ts-ignore
  statistic: any[];

  myCategoryFormIsVisible = "none";
  myProductFormIsVisible = "none";
  myCreateVendingMachineFormIsVisible = "none";
  addProductButton = "block";
  isVisibleStatisticsBlock = "none";

  productName = new FormControl();
  productPrice = new FormControl();
  countOfProduct = new FormControl();

  myCategoryForm = new FormGroup({
    productName: this.productName,
    productPrice: this.productPrice,
    countOfProduct: this.countOfProduct
  });


  vendingMachineName = new FormControl();

  myVendingMachineForm = new FormGroup({
    vendingMachineName: this.vendingMachineName
  })

  year = new FormControl();
  month = new FormControl();
  day = new FormControl();

  myStatisticsForm = new FormGroup({
    year: this.year,
    month: this.month,
    day: this.day
  })


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<any>(BASE_URL + '/getVendingMachine').subscribe(value => this.vendingMachine = value);
    this.httpClient.get<any[]>(BASE_URL + '/list').subscribe(value => this.products = value);
  }


  boughtProduct(product: Product) {
    this.httpClient.post(BASE_URL + '/purchase', product).subscribe(value => {
      this.httpClient.get<any[]>(BASE_URL + '/list').subscribe(value => this.products = value);
      console.log(value)
    });

  }

  deletedProduct(product: Product) {
    this.httpClient.post(BASE_URL + '/clear', product).subscribe(value => {
      this.httpClient.get<any[]>(BASE_URL + '/list').subscribe(value => this.products = value);
      console.log(value)
    });
  }

  saveCategory() {

    let product = new Product("", 0, 0);
    product.productName = this.myCategoryForm.value.productName;
    product.productPrice = this.myCategoryForm.value.productPrice;
    product.countOfProduct = this.myCategoryForm.value.countOfProduct;
    this.httpClient.post(BASE_URL + '/addCategory', product).subscribe(value => {
      this.httpClient.get<any[]>(BASE_URL + '/list').subscribe(value => this.products = value);
      console.log(value)
    });

    this.productName.reset();
    this.productPrice.reset();
    this.countOfProduct.reset();

  }

  showFormToAddCategory() {
    this.myCategoryFormIsVisible = "block";
    this.addProductButton = "none";
  }

  hideFormToAddCategory() {
    this.myCategoryFormIsVisible = "none";
    this.addProductButton = "block";
  }

  showProductFormIsVisible() {
    this.myProductFormIsVisible = "block";
    this.addProductButton = "none";
  }

  hideProductFormIsVisible() {
    this.myProductFormIsVisible = "none";
    this.addProductButton = "block";
  }

  saveProduct() {
    let product = new Product("", 0, 0);
    product.productName = this.myCategoryForm.value.productName;
    product.productPrice = 0;
    product.countOfProduct = this.myCategoryForm.value.countOfProduct;
    this.httpClient.post(BASE_URL + '/addItem', product).subscribe(value => {
      this.httpClient.get<any[]>(BASE_URL + '/list').subscribe(value => this.products = value);
      console.log(value)
    });

    this.productName.reset();
    this.productPrice.reset();
    this.countOfProduct.reset();

  }

  createVendingMachine() {
    this.myCreateVendingMachineFormIsVisible = "block";
  }

  saveVendingMachine() {
    this.httpClient.post(BASE_URL + '/addVendingMachine', new VendingMachine(0, this.myVendingMachineForm.value.vendingMachineName)).subscribe(value => {
      this.httpClient.get<any>(BASE_URL + '/getVendingMachine').subscribe(value => this.vendingMachine = value);
    })

    this.myCreateVendingMachineFormIsVisible = "none";
  }

  closeStatisticsBlock() {
    this.isVisibleStatisticsBlock = "none";
  }

  snowStatisticsBlock() {
    this.isVisibleStatisticsBlock = "block";
  }

  saveDataOf() {
    // @ts-ignore
    let year = this.myStatisticsForm.value.year;
    let month = this.myStatisticsForm.value.month;
    let day = this.myStatisticsForm.value.day;

    if (this.myStatisticsForm.value.year == null || this.myStatisticsForm.value.year <= 0) {
      year = 0;
    }
    if (this.myStatisticsForm.value.month == null || this.myStatisticsForm.value.month <= 0) {
      month = 0;
    }
    if (this.myStatisticsForm.value.day == null || this.myStatisticsForm.value.day <= 0) {
      day = 0;
    }

    this.httpClient.get<any[]>(BASE_URL + '/report' + '/' + year + '/' + month + '/' + day).subscribe(value => this.statistic = value);

  }
}
