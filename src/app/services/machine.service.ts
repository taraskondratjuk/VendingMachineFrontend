import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Products} from "../model/products";
import {BASE_URL} from "../settings/BASE_URL";

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private httpClient: HttpClient) {
  }

  getAllProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(BASE_URL + '/list');
  }

  purchaseProduct(product: Products): Observable<Products[]> {
    return this.httpClient.post<Products[]>(BASE_URL + '/purchase', product);
  }
}
