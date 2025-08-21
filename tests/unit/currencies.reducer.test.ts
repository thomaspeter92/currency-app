import { describe, it, expect } from "vitest";
import reducer, {
  addCurrency,
  removeCurrency,
  setBaseAmount,
  setBaseCurrency,
} from "../../src/stores/currencies";

type State = {
  currencies: string[];
  baseCurrency: string;
  baseAmount: number;
};

const start = (overrides?: Partial<State>): State => ({
  currencies: ["USD", "EUR", "KRW"],
  baseCurrency: "USD",
  baseAmount: 0,
  ...overrides,
});

describe("currencies reducer", () => {
  it("addCurrency: adds a new currency", () => {
    const state = start({ currencies: ["USD"] });
    const next = reducer(state, addCurrency("EUR"));
    expect(next.currencies).toEqual(["USD", "EUR"]);
  });

  it("addCurrency: doesnt add if already present", () => {
    const state = start({ currencies: ["USD"] });
    const next = reducer(state, addCurrency("USD"));
    expect(next.currencies).toEqual(["USD"]);
  });

  it("removeCurrency: remove using the currency code", () => {
    const state = start({ currencies: ["USD", "EUR", "KRW"] });
    const next = reducer(state, removeCurrency("EUR"));
    expect(next.currencies).toEqual(["USD", "KRW"]);
  });

  it("setBaseCurrency: sets with provided code", () => {
    const state = start({ baseCurrency: "USD" });
    const next = reducer(state, setBaseCurrency("EUR"));
    expect(next.baseCurrency).toBe("EUR");
  });

  it("setBaseAmount: sets amount", () => {
    const state = start({ baseAmount: 0 });
    const next = reducer(state, setBaseAmount(123.45));
    expect(next.baseAmount).toBe(123.45);
  });
});
