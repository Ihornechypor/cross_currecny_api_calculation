import { ReactNode, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { compareAsc, format } from 'date-fns';

interface ControllerProps {
  children?: ReactNode;
}
const Controller = ({ children }: ControllerProps) => {
  const [rate, setRate] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [ammount, setAmmount] = useState(null);
  const [api, setApi] = useState(null);

  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setRate(data.rates[0].mid);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [startDate]);

  const handleAmmount = (e) => {
    setAmmount(e.target.value);
  };

  const handleSubmit = () => {
    const fee = ammount * rate * 0.01;
    const amFree = ammount * rate - fee;
    setRates((prev) => [...prev, { fee: fee, amFree: amFree }]);
  };

  return (
    <>
      <p>{rate}</p>
      <input type="number" placeholder="ammount" onChange={handleAmmount} /> <br />
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          setApi(`http://api.nbp.pl/api/exchangerates/rates/a/usd/${format(date, 'yyyy-MM-dd')}/?format=json`);
        }}
      />{' '}
      <br />
      <button onClick={handleSubmit}>Claculate price</button>
      <ul>
        {rates.map((item, index) => {
          return (
            <li key={index}>
              fee: {item.fee}; clearAmmount: {item.amFree}
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Controller;
