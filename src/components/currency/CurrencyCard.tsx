import { motion } from "motion/react";
import { getFlagUrl } from "../../utils/getFlagUrl";
import getCurrencySymbol from "../../utils/getCurrencySymbol";
import type { CurrencyRate } from "../../api/currency";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVertical } from "lucide-react";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrency } from "../../stores/currencies";
import type { RootState } from "../../stores";
import { useQueryCache } from "../../lib/reactQuery";
import {
  calculateConvertedAmount,
  getExchangeRateString,
} from "../../utils/currencyUtils";

type Props = {
  currency: string;
};

const CurrencyCard = ({ currency }: Props) => {
  const dispatch = useDispatch();
  const baseAmount = useSelector(
    (state: RootState) => state.currenciesReducer.baseAmount
  );
  const baseCurrency = useSelector(
    (state: RootState) => state.currenciesReducer.baseCurrency
  );

  const handleRemove = () => {
    dispatch(removeCurrency(currency));
  };

  const currencyQueryData = useQueryCache(["currency", baseCurrency]) as Record<
    string,
    CurrencyRate
  > | null;
  const currencyData =
    currencyQueryData && currencyQueryData[currency.toLowerCase()]
      ? currencyQueryData[currency.toLowerCase()]
      : null;

  console.log("hehehehe");

  return (
    <motion.div
      data-testid="currency-card"
      key={currency}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`p-5 pr-2 bg-white w-full rounded-xl cursor-pointer flex gap-5 items-center`}
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
        <img
          src={getFlagUrl(currency) as string}
          alt={`${currency} flag`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="text-left ">{currency}</div>

      <div className="ml-auto text-right ">
        <p className="font-semibold space-x-1">
          <span>{getCurrencySymbol(currency)}</span>
          <span className="break-all">
            {currencyData
              ? calculateConvertedAmount(baseAmount, currencyData.rate)
              : "0.00"}
          </span>
        </p>
        {currencyData ? (
          <span className="text-xs text-neutral-600">
            {getExchangeRateString(baseCurrency, currencyData.rate, currency)}
          </span>
        ) : baseCurrency === currency ? (
          <span className="text-xs text-red-500">Same currency</span>
        ) : null}
      </div>

      <Menu>
        <MenuButton onClick={(e) => e.stopPropagation()}>
          <EllipsisVertical className="text-neutral-300" />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="bg-white rounded-lg shadow-lg p-2 border border-neutral-300"
        >
          <MenuItem>
            <Button
              tabIndex={0}
              onClick={(e) => {
                e?.stopPropagation();
                handleRemove();
              }}
              variant="danger"
            >
              Remove Currency
            </Button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </motion.div>
  );
};

export default CurrencyCard;
