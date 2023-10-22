import { ReactNode, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ControllerProps {
  children?: ReactNode;
}
const Controller = ({ children }: ControllerProps) => {
  const [rate, setRate] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [api, setApi] = useState(`http://api.nbp.pl/api/exchangerates/rates/a/usd/${startDate}/?format=json`);

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRate(data.rates[0].mid);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [startDate]);

  return (
    <div>
      <p>{rate}</p>
      <p>{startDate}</p>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          console.log(date);

          // setStartDate(date);
        }}
      />
    </div>
  );
};
export default Controller;
