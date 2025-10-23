
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  convert(amount: number, rate: number): number {
    return parseFloat((amount * rate).toFixed(2));
  }
}
