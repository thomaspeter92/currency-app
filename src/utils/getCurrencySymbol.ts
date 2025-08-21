const symbolCache: Record<string, string> = {};

const getCurrencySymbol = (currencyCode: string, locale = "en-UK"): string => {
  const key = `${locale}_${currencyCode}`;

  if (symbolCache[key]) {
    return symbolCache[key];
  }

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    });

    const symbol = formatter.format(0).replace(/[0-9.,\s]/g, "");
    symbolCache[key] = symbol;
    return symbol;
  } catch (error) {
    return "";
  }
};

export default getCurrencySymbol;
