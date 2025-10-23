import { Injectable, signal } from '@angular/core';
import { ExchangeRate } from '../models/currency.model';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private rate = signal<ExchangeRate | null>(null);
  private loading = signal<boolean>(false);
  
  readonly currentRate = this.rate.asReadonly();
  readonly isLoading = this.loading.asReadonly();

  setRate(rate: ExchangeRate): void {
    this.rate.set(rate);
  }

  setLoading(loading: boolean): void {
    this.loading.set(loading);
  }

  getRate(): ExchangeRate | null {
    return this.rate();
  }
}
 