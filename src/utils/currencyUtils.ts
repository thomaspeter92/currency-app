export function calculateConvertedAmount(
  baseAmount: number,
  rate: number
): string {
  return (baseAmount * rate).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getExchangeRateString(
  baseCurrency: string,
  rate: number,
  currency: string
): string {
  return `1 ${baseCurrency} = ${(1 * rate).toFixed(5)} ${currency}`;
}
