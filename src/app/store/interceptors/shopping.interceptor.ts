import { ShoppingItem } from '../models/shopping-item.model';

import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class ShoppingListHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<ShoppingItem>, next: HttpHandler) {
    const newReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'null'
      )
    });

    return next.handle(newReq);
  }
}
