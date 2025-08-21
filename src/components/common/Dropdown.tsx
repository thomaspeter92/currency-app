import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export type DropdownOption = {
  id: string | number;
  label: string;
};

type DropdownProps<T extends DropdownOption> = {
  options: T[];
  value?: T;
  onChange: (option: T) => void;
  displayValue?: (option: T | null) => string;
  placeholder?: string;
};

export function Dropdown<T extends DropdownOption>({
  options,
  value,
  onChange,
  displayValue = (option) => option?.label ?? "",
  placeholder = "Select...",
}: DropdownProps<T>) {
  return (
    <Listbox onChange={onChange}>
      <div className="relative">
        <ListboxButton className="p-5 flex justify-between rounded-xl w-full text-left bg-white">
          {value ? displayValue(value) : placeholder} <ChevronDown />
        </ListboxButton>
        <ListboxOptions className="absolute z-10 mt-1 w-full border focus:outline-lime-300 bg-white rounded shadow h-28 overflow-y-auto">
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className={({ selected }) =>
                `px-2 data-focus:bg-lime-200 py-1 cursor-pointer ${
                  selected ? "font-semibold" : ""
                }`
              }
            >
              {displayValue(option)}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
