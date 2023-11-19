export const getCurrecyRate = async (date: string, formatedDate: string) => {
  try {
    const rsp = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/usd/${date}/?format=json`);
    const data = await rsp.json();

    return {
      currecyDate: data.rates[0].effectiveDate,
      currecyRate: data.rates[0].mid,
      formatedDate,
    };
  } catch (error) {
    console.error('Error making API call:', error);
    throw error;
  }
};
