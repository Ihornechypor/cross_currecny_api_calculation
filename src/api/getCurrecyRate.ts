import { format } from 'date-fns';

export const getCurrecyRate = async ({ date }: string) => {
  try {
    const rsp = await fetch(
      `http://api.nbp.pl/api/exchangerates/rates/a/usd/${format(date, 'yyyy-MM-dd')}/?format=json`,
    );
    const data = await rsp.json();

    return data.rates[0].mid;
  } catch (error) {
    console.error('Error making API call:', error);
    throw error;
  }
};
