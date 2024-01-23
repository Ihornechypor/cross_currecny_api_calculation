import { TO_FIXED_VALUE, VAT_RATE } from '../../consts';

export const calculateLocalAmounts = (amount: number, rate: number, type: string, hasVat: boolean) => {
  let amountFee = +(amount * 0.1).toFixed(TO_FIXED_VALUE);
  const amountLocal = +(amount * rate).toFixed(TO_FIXED_VALUE);
  let amountFeeLocal = -Math.abs(+(amountLocal * 0.1).toFixed(TO_FIXED_VALUE));
  let amountFeeVat = hasVat ? -Math.abs(+(amountFeeLocal * VAT_RATE).toFixed(TO_FIXED_VALUE)) : 0;

  if (type === 'Withdrawal Fee') {
    amountFee = 0;
    amountFeeLocal = 0;
    amountFeeVat = 0;
  }

  if (type === 'Membership Fee') {
    amountFee = 0;
    amountFeeVat = 0;
    amountFeeLocal = hasVat ? +(amountLocal * VAT_RATE).toFixed(TO_FIXED_VALUE) : 0;
  }

  return {
    amountFee,
    amountLocal,
    amountFeeLocal,
    amountFeeVat,
  };
};
