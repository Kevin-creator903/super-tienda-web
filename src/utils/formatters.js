/**
 * Formatea montos en USD o VES de forma 100% segura.
 */
export const formatCurrency = (amountInUsd = 0, currency = 'USD', rate = 1) => {
  const validAmount = typeof amountInUsd === 'number' && !isNaN(amountInUsd) ? amountInUsd : 0;
  const validRate = typeof rate === 'number' && !isNaN(rate) && rate > 0 ? rate : 1;

  if (currency === 'VES') {
    const vesValue = validAmount * validRate;
    return `${vesValue.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs`;
  }
  return `${validAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $`;
};