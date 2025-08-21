import api from "./api";

export interface CurrencyRate {
  code: string;
  alphaCode: string;
  numericCode: string;
  name: string;
  rate: number;
  date: string;
  inverseRate: number;
}

export const getExchangeRates = (code: string) => {
  return api.get<Record<string, CurrencyRate>>(
    `/daily/${encodeURIComponent(code)}.json`
  );
};
