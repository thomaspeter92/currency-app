import { AnimatePresence } from "motion/react";
import { Dropdown, type DropdownOption } from "./components/common/Dropdown";
import getCurrencySymbol from "./utils/getCurrencySymbol";
import { useQuery } from "@tanstack/react-query";
import { getExchangeRates, type CurrencyRate } from "./api/currency";
import { addCurrency } from "./stores/currencies";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./stores";
import CurrencyCard from "./components/currency/CurrencyCard";
import BaseCurrency from "./components/currency/BaseCurrency";
import { useEffect } from "react";
import { addToast } from "./stores/toast";

// 1 choose a base currency
// 2 add currencies to compare with the base currency
// 3 display the base currency with an input to change the amount
// 4 display the other currencies with their exchange rates compared to the base currency
// 5 allow removing currencies and changing the base currency
// 6 show error message when fetch fails or user attempts erroneous input
// 7 Show loading states when fetching
// 8 Write a couple of example tests (unit for util/store, component for base currency, e2e for whole user flow)

function App() {
  const baseCurrency = useSelector(
    (state: RootState) => state.currenciesReducer.baseCurrency
  );
  const currencies = useSelector(
    (state: RootState) => state.currenciesReducer.currencies
  );
  const dispatch = useDispatch();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["currency", baseCurrency],
    queryFn: () => getExchangeRates(baseCurrency),
  });

  useEffect(() => {
    if (isError) {
      dispatch(addToast({ message: "Failed to fetch", type: "error" }));
    }
  }, [isError, dispatch]);

  const handleAddCurrency = (newCurrency: DropdownOption) => {
    if (currencies.length >= 3) {
      dispatch(
        addToast({
          message: "Maximum 3 currencies, please remove one",
          type: "info",
        })
      );
      return;
    }
    dispatch(addCurrency(newCurrency.id as string));
  };

  return (
    <main className="grid place-items-center min-h-screen w-screen bg-neutral-200/50 py-10">
      <div className="transition bg-neutral-200 p-5 rounded-xl w-96 max-w-screen space-y-3">
        <div className=" space-y-3">
          <AnimatePresence>
            <BaseCurrency />
            {currencies.length > 0
              ? currencies.map((currency) => (
                  <CurrencyCard key={currency} currency={currency} />
                ))
              : null}
          </AnimatePresence>
        </div>
        <hr className="border-neutral-300" />
        {data && !isError ? (
          <Dropdown
            options={Object.entries(data as Record<string, CurrencyRate>)?.map(
              ([, value]) => ({
                id: value.code,
                label: `${value.name} (${value.alphaCode} - ${getCurrencySymbol(
                  value.code
                )} )`,
              })
            )}
            onChange={handleAddCurrency}
            placeholder="Select a currency"
          />
        ) : isFetching ? (
          <div className="p-10 rounded-xl bg-neutral-300 animate-pulse"></div>
        ) : null}
      </div>
    </main>
  );
}

export default App;
