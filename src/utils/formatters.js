export const formatCurrency = (amountUsd, currency = 'USD', exchangeRate = 65.00) => {
  const num = Number(amountUsd) || 0;

  if (currency === 'VES' || currency === 'BS' || currency === 'Bs') {
    const amountBs = num * (exchangeRate || 1);
    return `Bs. ${amountBs.toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  return `$${num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};