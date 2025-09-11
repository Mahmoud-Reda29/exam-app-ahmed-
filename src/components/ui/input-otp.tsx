"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // shadcn utility, change if you don't use it

// ----------------------
// Types
// ----------------------
type OTPSlot = {
  char: string | null;
  isActive: boolean;
  hasFakeCaret: boolean;
};

type OTPContextType = {
  slots: OTPSlot[];
};

const OTPInputContext = React.createContext<OTPContextType | null>(null);

function useOTPContext() {
  const ctx = React.useContext(OTPInputContext);
  if (!ctx) {
    throw new Error("useOTPContext must be used inside <InputOTP>");
  }
  return ctx;
}

// ----------------------
// InputOTP (parent)
// ----------------------
interface InputOTPProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
}

export function InputOTP({
  maxLength,
  value,
  onChange,
  className,
  children,
  ...props
}: InputOTPProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const slots: OTPSlot[] = Array.from({ length: maxLength }).map((_, i) => ({
    char: value[i] ?? null,
    isActive: value.length === i,
    hasFakeCaret: value.length === i && value.length < maxLength,
  }));

  // ✅ Autofocus + always refocus
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && value.length > 0) {
      e.preventDefault();
      onChange(value.slice(0, -1));
    }
  }

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const newValue = (e.target as HTMLInputElement).value
      .replace(/\D/g, "")
      .slice(0, maxLength);
    onChange(newValue);
  }

  return (
    <OTPInputContext.Provider value={{ slots }}>
      <div
        {...props}
        className={cn("flex justify-center items-center gap-2", className)}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          className="sr-only"
          value={value}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          // ✅ keep refocus even if something steals focus
          onBlur={() => {
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
        />
        {children}
      </div>
    </OTPInputContext.Provider>
  );
}

// ----------------------
// InputOTPGroup (wrapper for slots)
// ----------------------
export function InputOTPGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex gap-2", className)} {...props} />;
}

// ----------------------
// InputOTPSlot (each box)
// ----------------------
interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

export function InputOTPSlot({
  index,
  className,
  ...props
}: InputOTPSlotProps) {
  const { slots } = useOTPContext();
  const slot = slots[index];

  return (
    <div
      {...props}
      className={cn(
        "relative h-12 w-10 rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-900",
        slot.isActive && "border-blue-600",
        className
      )}
    >
      {slot.char ? <span>{slot.char}</span> : <span>&nbsp;</span>}
      {slot.hasFakeCaret && (
        <span className="absolute inset-y-2 left-1/2 w-px bg-blue-600 animate-pulse" />
      )}
    </div>
  );
}
