import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { ShoppingReducer } from './store/reducers/shopping.reducer';
import { ShoppingEffects } from './store/effects/shopping.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      shopping: ShoppingReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ShoppingEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
