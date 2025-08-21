import React, { useState } from "react";
import getCurrencySymbol from "../../utils/getCurrencySymbol";
import { getFlagUrl } from "../../utils/getFlagUrl";
import { useDispatch } from "react-redux";
import { setBaseAmount } from "../../stores/currencies";
import { useSelector } from "react-redux";
import type { RootState } from "../../stores";
import { ChevronDown, RefreshCw } from "lucide-react";
import Button from "../common/Button";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { countryCodes } from "../../constants/countryCodes";
import { setBaseCurrency } from "../../stores/currencies";
import { addToast } from "../../stores/toast";

const BaseCurrency = () => {
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();

  const baseCurrency = useSelector(
    (state: RootState) => state.currenciesReducer.baseCurrency
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // stop negative sign
    if (value.startsWith("-")) return;
    // allow only numbers with up to 2 decimal places
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    if (value.length > 12) {
      value = value.slice(0, 12);
    }
    setAmount(parseFloat(value) || 0);
  };

  const handleClick = () => {
    if (amount <= 0) {
      dispatch(
        addToast({ message: "Amount must be greater than 0", type: "info" })
      );
      return;
    }
    dispatch(setBaseAmount(amount));
  };

  const handleCurrencyChange = (currency: string) => {
    dispatch(setBaseCurrency(currency));
  };

  return (
    <>
      <div
        data-testid="base-currency"
        className={`py-7 px-3  w-full rounded-xl cursor-pointer flex gap-3 items-center bg-white`}
      >
        <div>
          <p className="text-sm text-neutral-500">Amount</p>
          <div className="gap-2 items-center w-fitp-3 rounded flex text-3xl">
            <p className="font-bold">{getCurrencySymbol(baseCurrency)}</p>
            <label htmlFor="amountInput" className="sr-only">
              Enter an amount to convert
            </label>
            <input
              data-testid="amount-input"
              id="amountInput"
              min="0"
              step="0.01"
              value={amount.toString()}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick();
                }
              }}
              type="number"
              className="min-w-0 w-full font-bold focus:outline-none focus:border-b-2 border-lime-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
        <Listbox onChange={handleCurrencyChange} value={baseCurrency}>
          <ListboxButton
            data-testid="currency-select"
            aria-labelledby="currency-label currency-value"
            className="flex items-center gap-2 p-2 rounded-full border border-neutral-300 text-neutral-500"
          >
            <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
              <img
                src={getFlagUrl(baseCurrency) as string}
                alt={`${baseCurrency} flag`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <span className="sr-only" id="currency-label">
              Change currency, current selection:{" "}
            </span>
            <p id="currency-value">{baseCurrency}</p>
            <ChevronDown />
          </ListboxButton>
          <ListboxOptions anchor="bottom" className="mt-2 h-48 bg-white">
            {Object.keys(countryCodes).map((code) => (
              <ListboxOption
                key={code}
                value={code}
                className="px-3 py-2 flex items-center gap-2 data-focus:bg-lime-200"
              >
                <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                  <img
                    src={getFlagUrl(code) as string}
                    alt={`${code} flag`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <p>{code}</p>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      <Button
        data-testid="convert-button"
        disabled={amount <= 0}
        onClick={handleClick}
      >
        <RefreshCw size={20} />
        Convert Currency
      </Button>
    </>
  );
};

export default BaseCurrency;
