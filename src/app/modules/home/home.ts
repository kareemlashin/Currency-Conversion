
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CurrencyApi } from '../../core/abstractions/currency-api.interface';
import { StateService } from '../../core/store/currency.store';
import { ConverterService } from '../../core/services/converter.service';
import { FormatterService } from '../../core/services/formatter.service';
import { ButtonComponent } from '../../shared/components/button/button';
import { InputComponent } from '../../shared/components/input/input';
import { SelectComponent } from '../../shared/components/select/select';
import { CardComponent } from '../../shared/components/card/card';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    CardComponent,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  from = signal('USD');
  to = signal('EGP');
  amount = signal(1);
  result = signal(0);
  
  currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'EGP', label: 'EGP' },
    { value: 'JPY', label: 'JPY' }
  ];

  constructor(
    private api: CurrencyApi,
    private state: StateService,
    private converter: ConverterService,
    private formatter: FormatterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.syncRate();
  }


  syncRate(): void {
    this.state.setLoading(true);
    
    this.api.getRate(this.from(), this.to()).subscribe({
      next: (rate) => {
        this.state.setRate(rate);
        this.state.setLoading(false);
        this.calculate();
      },
      error: () => this.state.setLoading(false)
    });
  }


  calculate(): void {
    const rate = this.state.getRate();
    if (!rate) return;
    
    const converted = this.converter.convert(this.amount(), rate.rate);
    this.result.set(converted);
  }


  swapCurrencies(): void {
    const temp = this.from();
    this.from.set(this.to());
    this.to.set(temp);
    this.syncRate();
  }


  goToDetails(): void {
    this.router.navigate(['/details', this.from()]);
  }


  onFromChange(value: string): void {
    this.from.set(value);
    this.syncRate();
  }


  onToChange(value: string): void {
    this.to.set(value);
    this.syncRate();
  }


  onAmountChange(value: number): void {
    this.amount.set(value);
    this.calculate();
  }

  get rate(): number {
    return this.state.getRate()?.rate || 0;
  }

  get isLoading(): boolean {
    return this.state.isLoading();
  }

  formatNumber(value: number): string {
    return this.formatter.formatNumber(value);
  }
}
