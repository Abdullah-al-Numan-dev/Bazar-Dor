"use client";
import { useState } from "react";
import { inputClass } from "./AuthShell";

export default function PasswordInput(props: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  invalid: boolean;
  placeholder?: string;
  autoComplete: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={props.id}
        type={show ? "text" : "password"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        aria-invalid={props.invalid}
        aria-describedby={props.invalid ? `${props.id}-error` : undefined}
        className={`${inputClass(props.invalid)} pr-16`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute inset-y-0 right-2 px-2 text-xs text-primary hover:underline"
        aria-pressed={show}
      >
        {show ? "লুকান" : "দেখান"}
      </button>
    </div>
  );
}
