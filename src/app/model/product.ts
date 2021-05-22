export class Product {
  productName: string
  productPrice: number
  countOfProduct: number



  constructor(productName: string, productPrice: number, countOfProduct: number) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.countOfProduct = countOfProduct;

  }
}
