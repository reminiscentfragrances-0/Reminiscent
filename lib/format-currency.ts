export function formatCurrency(
  amount: number,
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number },
) {
  return new Intl.NumberFormat("en-PK", {
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
  }).format(amount);
}
