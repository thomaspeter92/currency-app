import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type State = {
  currencies: string[];
  baseCurrency: string;
  baseAmount: number;
};

const persisted = localStorage.getItem("currenciesState");

const initialState: State = persisted
  ? JSON.parse(persisted)
  : {
      currencies: [],
      baseCurrency: "USD",
      baseAmount: 0.0,
    };

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    addCurrency: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      if (state.currencies.includes(action.payload)) {
        return; // currency already exists
      }

      state.currencies = [...state.currencies, action.payload];
    },
    removeCurrency: (state, action: PayloadAction<string>) => {
      state.currencies = state.currencies.filter(
        (currency) => currency !== action.payload
      );
    },

    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
    setBaseAmount: (state, action: PayloadAction<number>) => {
      state.baseAmount = action.payload;
    },
  },
});

export const { addCurrency, removeCurrency, setBaseAmount, setBaseCurrency } =
  currenciesSlice.actions;

export default currenciesSlice.reducer;
