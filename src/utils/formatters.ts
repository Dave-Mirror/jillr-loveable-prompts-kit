
/**
 * Formats a number for display:
 * - Numbers < 1000 are displayed as is
 * - Numbers >= 1000 and < 1,000,000 are displayed in K (e.g., 1.5K)
 * - Numbers >= 1,000,000 are displayed in M (e.g., 2.3M)
 */
export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
}

/**
 * Formats a currency value with the specified currency symbol
 */
export function formatCurrency(amount: number, currency: string = '€'): string {
  return `${amount.toLocaleString('de-DE')}${currency}`;
}

/**
 * Formats a percentage value
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}
