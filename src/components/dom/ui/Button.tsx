"use client";

import { forwardRef, ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950 disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.02] active:scale-[0.98]";

    const variants = {
      primary:
        "bg-gradient-to-r from-electric-600 to-electric-500 text-white hover:from-electric-500 hover:to-electric-400 shadow-lg shadow-electric-500/25 hover:shadow-electric-500/40",
      secondary:
        "bg-void-800 text-electric-300 hover:bg-void-700 border border-electric-500/20 hover:border-electric-500/40",
      ghost:
        "text-electric-400 hover:text-electric-300 hover:bg-electric-500/10",
      outline:
        "border-2 border-electric-500 text-electric-400 hover:bg-electric-500 hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}

        {/* Glow effect */}
        {variant === "primary" && (
          <span className="absolute inset-0 rounded-full bg-electric-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
