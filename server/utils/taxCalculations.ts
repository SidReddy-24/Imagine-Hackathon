export function determineITRType(primaryIncome: number, secondaryIncome: number): string {
  if (secondaryIncome === 0) return 'ITR-1';
  if (primaryIncome > 500000 && secondaryIncome > 0) return 'ITR-2';
  if (primaryIncome <= 500000 && secondaryIncome > 0) return 'ITR-3';
  return 'ITR-4';
}

export function calculateTaxReturn(primaryIncome: number, secondaryIncome: number): number {
  const totalIncome = primaryIncome + secondaryIncome;
  let tax = 0;

  if (totalIncome <= 250000) tax = 0;
  else if (totalIncome <= 500000) tax = (totalIncome - 250000) * 0.05;
  else if (totalIncome <= 1000000) tax = 12500 + (totalIncome - 500000) * 0.2;
  else tax = 112500 + (totalIncome - 1000000) * 0.3;

  return tax;
} 