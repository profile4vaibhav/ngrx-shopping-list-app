import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, pipe } from 'rxjs';

import {
  ShoppingAction,
  ShoppingActionTypes,
  LoadShoppingAction,
  LoadShoppingSuccessAction,
  LoadShoppingFailureAction,
  AddItemAction,
  AddItemSuccessAction,
  AddItemFailureAction,
  DeleteItemAction,
  DeleteItemSuccessAction,
  DeleteItemFailureAction
} from '../actions/shopping.actions';
import { ShoppingService } from '../service/shopping.service';

@Injectable()
export class ShoppingEffects {

  constructor(
    private _actions$: Actions,
    private _shoppingService: ShoppingService
  ) {}

  @Effect() loadShopping$ = this._actions$
    .pipe(
      ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
      mergeMap(
        () => this._shoppingService.getShoppingItems()
          .pipe(
            map(data => {
              return new LoadShoppingSuccessAction(data)
            }),
            catchError(error => of(new LoadShoppingFailureAction(error)))
          )
      ),
  )

  @Effect() addShoppingItem$ = this._actions$
    .pipe(
      ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
      mergeMap(
        (data) => this._shoppingService.addShoppingItem(data.payload)
          .pipe(
            map(() => new AddItemSuccessAction(data.payload)),
            catchError(error => of(new AddItemFailureAction(error)))
          )
      )
  )

  @Effect() deleteShoppingItem$ = this._actions$
  .pipe(
    ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
    mergeMap(
      (data) => this._shoppingService.deleteShoppingItem(data.payload)
        .pipe(
          map(() => new DeleteItemSuccessAction(data.payload)),
          catchError(error => of(new DeleteItemFailureAction(error)))
        )
    )
  )

}
