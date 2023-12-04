import { TO_FIXED_VALUE } from '../../consts';

export const calculateLocalAmounts = (amount: number, rate: number, type: string) => {
  let amountFee = +(amount * 0.1).toFixed(TO_FIXED_VALUE);
  const amountLocal = +(amount * rate).toFixed(TO_FIXED_VALUE);
  let amountFeeLocal = -Math.abs(+(amountLocal * 0.1).toFixed(TO_FIXED_VALUE));
  let amountFeeVat = -Math.abs(+(amountFeeLocal * 0.23).toFixed(TO_FIXED_VALUE));
  if (type === 'Withdrawal Fee') {
    amountFee = 0;
    amountFeeLocal = 0;
    amountFeeVat = 0;
  }
  if (type === 'Membership Fee') {
    amountFee = 0;
    amountFeeVat = 0;
    amountFeeLocal = +(amountLocal * 0.23).toFixed(TO_FIXED_VALUE);
  }
  return {
    amountFee,
    amountLocal,
    amountFeeLocal,
    amountFeeVat,
  };
};
