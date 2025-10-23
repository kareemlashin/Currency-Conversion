
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ExchangeRate, HistoricalData } from '../models/currency.model';
import { CurrencyApi } from '../abstractions/currency-api.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService extends CurrencyApi {
  private readonly MOCK_RATES: Record<string, number> = {
   'USD-EGP': 47.85,
   'USD-EUR': 0.92,
   'USD-GBP': 0.79,
 
   'EUR-USD': 1 / 0.92,      
   'EUR-EGP': 47.85 / 0.92,  
   'EUR-GBP': 0.79 / 0.92,   
 
   'GBP-USD': 1 / 0.79,      
   'GBP-EUR': 0.92 / 0.79,   
   'GBP-EGP': 47.85 / 0.79,  
 
   'EGP-USD': 1 / 47.85,    
   'EGP-EUR': 1 / (47.85 / 0.92), 
   'EGP-GBP': 1 / (47.85 / 0.79), 
  };

  getRate(from: string, to: string): Observable<ExchangeRate> {
    const key = `${from}-${to}`;
    const rate = this.MOCK_RATES[key] || 1;
    
    return of({
      from,
      to,
      rate,
      date: new Date()
    }).pipe(delay(500));
  }

  getHistory(currency: string, days: number): Observable<HistoricalData[]> {
    const data: HistoricalData[] = [];
    const today = new Date();
    const baseRate = this.MOCK_RATES[`${currency}-EGP`] || 30;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const variation = (Math.random() - 0.5) * 2;
      
      data.push({
        date: date.toISOString().split('T')[0],
        rate: parseFloat((baseRate + variation).toFixed(4))
      });
    }
    
    return of(data).pipe(delay(500));
  }
}