export interface Currency {
    code: string;
    name: string;
  }
  
  export interface ExchangeRate {
    from: string;
    to: string;
    rate: number;
    date: Date;
  }
  
  export interface HistoricalData {
    date: string;
    rate: number;
  }