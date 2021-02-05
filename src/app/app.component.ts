import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import { Store } from '@ngrx/store';

import { AddItemAction, DeleteItemAction } from './store/actions/shopping.actions';
import { ShoppingItem } from './store/models/shopping-item.model';
import { AppState } from './store/models/app-state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shoppingItems$: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = { id: '', name: '' };

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this.shoppingItems$ = this._store.select(store => store.shopping);
  }

  addItem() {
    this.newShoppingItem.id = uuid();
    this._store.dispatch(new AddItemAction(this.newShoppingItem));
    this.newShoppingItem = { id: '', name: '' };
  }

  deleteItem(id: string) {
    this._store.dispatch(new DeleteItemAction(id));
  }
}
