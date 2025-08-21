import { countryCodes } from "../constants/countryCodes";

export function getFlagUrl(currencyCode: keyof typeof countryCodes) {
  const countryCode = countryCodes[currencyCode];
  if (!countryCode) return null;
  return `https://flagcdn.com/${countryCode}.svg`;
}
