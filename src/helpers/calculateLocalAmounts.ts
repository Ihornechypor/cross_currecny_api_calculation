export const calculateLocalAmounts = (amount: number, rate: number, type: string) => {
  let amountFee = +(amount * 0.1).toFixed(2);
  const amountLocal = +(amount * rate).toFixed(2);
  let amountFeeLocal = -Math.abs(+(amountLocal * 0.1).toFixed(2));
  let amountFeeVat = -Math.abs(+(amountFeeLocal * 0.23).toFixed(2));
  if (type === 'Withdrawal Fee') {
    amountFee = 0;
    amountFeeLocal = 0;
    amountFeeVat = 0;
  }
  if (type === 'Membership Fee') {
    amountFee = 0;
    amountFeeVat = 0;
    amountFeeLocal = +(amountLocal * 0.23).toFixed(2);
  }
  return {
    amountFee,
    amountLocal,
    amountFeeLocal,
    amountFeeVat,
  };
};
