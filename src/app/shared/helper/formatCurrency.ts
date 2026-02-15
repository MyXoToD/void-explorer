export const formatCurrency = (amount: number): string => {
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No'];
  let suffixIndex = 0;
  while (amount >= 1000 && suffixIndex < suffixes.length - 1) {
    amount /= 1000;
    suffixIndex++;
  }
  return amount.toFixed(suffixIndex > 0 ? 1 : 0) + suffixes[suffixIndex] + '¤';
};
