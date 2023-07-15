export const formatCurrency = (currency: number) =>
  currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
