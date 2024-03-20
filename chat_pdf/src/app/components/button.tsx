import React from "react";
import clsx from "clsx";
import Link from "next/link";

const variantStyles = {
  primary:
    "bg-indigo-400 text-white hover:bg-indigo-300 ring-1 ring-inset ring-indigo-300",
  secondary:
    "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 ring-1 ring-inset ring-zinc-800",
  filled: "bg-indigo-600 text-white hover:bg-opacity-90",
  outline:
    "text-zinc-400 ring-1 ring-inset ring-white/10 hover:bg-white/5 hover:text-white",
  danger: "bg-red-600 text-white hover:bg-red-500",
  text: "text-indigo-400 hover:text-indigo-500",
  disabled: "bg-zinc-600 text-white cursor-not-allowed hover:bg-zinc-500",
};

type ButtonProps = {
  variant?: keyof typeof variantStyles;
  className?: string;
  href?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg"; // Add size prop
} & React.ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "primary",
  className,
  children,
  href,
  disabled = false,
  size = "md", // Default size
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base", // Adjust these styles as needed
    lg: "px-6 py-3 text-lg",
  };

  className = clsx(
    "rounded-md inline-flex gap-0.5 justify-center overflow-hidden font-medium transition",
    variantStyles[variant],
    sizeStyles[size], // Apply size styles
    className,
  );

  // Render a link with a button inside if href is provided
  if (href && !disabled) {
    // Check disabled state
    return (
      <Link href={href}>
        <button className={className} {...props}>
          {children}
        </button>
      </Link>
    );
  }

  // Render a button if no href is provided
  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
