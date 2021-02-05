import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { ShoppingItem } from '../models/shopping-item.model';

@Injectable({
  providedIn: 'root'
})

export class ShoppingService {
  private SHOPPING_URL = 'http://localhost:3000/shopping';

  constructor(private _http: HttpClient) {}

  public getShoppingItems() {
    return this._http.get<Array<ShoppingItem>>(this.SHOPPING_URL)
      .pipe(
        delay(2000)
      );
  }

  public addShoppingItem(shoppingItem: ShoppingItem) {
    return this._http.post(this.SHOPPING_URL, shoppingItem)
    .pipe(
      delay(2000)
    );
  }

  public deleteShoppingItem(id: string) {
    return this._http.delete(`${this.SHOPPING_URL}/${id}`)
      .pipe(
        delay(2000)
      );
  }
}
