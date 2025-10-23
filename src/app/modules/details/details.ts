
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyApi } from '../../core/abstractions/currency-api.interface';
import { FormatterService } from '../../core/services/formatter.service';
import { HistoricalData } from '../../core/models/currency.model';
import { LoaderComponent } from '../../shared/components/loader/loader';
import { ButtonComponent } from '../../shared/components/button/button';
import { CardComponent } from '../../shared/components/card/card';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    LoaderComponent
  ],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  currency = signal('');
  data = signal<HistoricalData[]>([]);
  loading = signal(true);

  max = computed(() => {
    const rates = this.data().map(d => d.rate);
    return rates.length ? Math.max(...rates) : 0;
  });

  min = computed(() => {
    const rates = this.data().map(d => d.rate);
    return rates.length ? Math.min(...rates) : 0;
  });

  avg = computed(() => {
    const rates = this.data().map(d => d.rate);
    if (!rates.length) return 0;
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: CurrencyApi,
    private formatter: FormatterService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currency.set(params['currency']);
      this.loadHistoricalData();
    });
  }


  private loadHistoricalData(): void {
    this.loading.set(true);
    
    this.api.getHistory(this.currency(), 7).subscribe({
      next: (data) => {
        this.data.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }


  goBack(): void {
    this.router.navigate(['/']);
  }


  formatDate(date: string): string {
    return this.formatter.formatDate(date);
  }

  formatNumber(num: number): string {
    return this.formatter.formatNumber(num, 4);
  }


  getChange(current: number, previous: number): string {
    const change = ((current - previous) / previous) * 100;
    return this.formatter.formatPercentage(change);
  }


  isIncrease(current: number, previous: number): boolean {
    return current > previous;
  }

  getChartPoints(): string {
    const data = this.data();
    if (!data.length) return '';

    const maxRate = this.max();
    const minRate = this.min();
    const range = maxRate - minRate || 1;

    return data.map((item, index) => {
      const x = 10 + (index * 15);
      const y = 35 - ((item.rate - minRate) / range * 25);
      return `${x},${y}`;
    }).join(' ');
  }
}
