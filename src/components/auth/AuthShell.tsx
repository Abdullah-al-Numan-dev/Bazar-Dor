import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10 pb-16">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl leading-8 font-bold">{title}</h1>
        <p className="text-sm">{subtitle}</p>
      </header>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">{children}</div>
      <Link href="/" className="text-sm hover:underline">← হোম পেজে ফিরে যান</Link>
    </main>
  );
}

export function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-error">{error}</p>
      )}
    </div>
  );
}

export const inputClass = (invalid: boolean) =>
  `h-10 w-full rounded-lg border bg-base-100 px-3 text-sm outline-none transition focus:ring-2 ${
    invalid
      ? "border-error focus:ring-error/30"
      : "border-base-300 focus:border-primary focus:ring-primary/30"
  }`;
