
import { Observable } from 'rxjs';
import { ExchangeRate, HistoricalData } from '../models/currency.model';

export abstract class CurrencyApi {
  abstract getRate(from: string, to: string): Observable<ExchangeRate>;
  abstract getHistory(currency: string, days: number): Observable<HistoricalData[]>;
}
