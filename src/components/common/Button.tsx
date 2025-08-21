import React, { forwardRef } from "react";

type Props<T = void> = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  onClick?: (data?: T) => void;
  className?: string;
  variant?: "primary" | "danger";
};

const variants = {
  primary: "bg-lime-900 text-lime-300 hover:bg-lime-100 hover:text-lime-900",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, onClick, className, variant = "primary", ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        onClick={onClick}
        className={`${variants[variant]} flex items-center justify-center gap-3 w-full rounded-full disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-600 font-bold text-sm px-8 py-3 transition-colors cursor-pointer ${className}`}
      >
        {children}
      </button>
    );
  }
);

export default Button;
