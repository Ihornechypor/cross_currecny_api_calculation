export const getCurrecyRate = async (date: string) => {
  try {
    const rsp = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/usd/${date}/?format=json`);
    const data = await rsp.json();
    console.log(data.rates);
    return data.rates[0].mid;
  } catch (error) {
    console.error('Error making API call:', error);
    throw error;
  }
};
