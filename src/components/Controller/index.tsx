import { ReactNode, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { getCurrecyRate } from '../../api/getCurrecyRate';
import 'react-datepicker/dist/react-datepicker.css';
import { format, subDays } from 'date-fns';

interface ControllerProps {
  children?: ReactNode;
}
const Controller = ({ children }: ControllerProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [rate, setRate] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [formatDate, setFormatDate] = useState('');
  const [ammount, setAmmount] = useState(0);
  const [rates, setRates] = useState([]);

  const [subDaysCount, setSubDaysCount] = useState(1);

  const handleDate = (date: any) => {
    const prevDate = subDays(date, 1);
    setStartDate(prevDate);
    setFormatDate(format(prevDate, 'yyyy-MM-dd'));
  };

  const findDateWithCurrensy = () => {
    setSubDaysCount((prev) => prev + 1);
    const desireDays = subDays(startDate, subDaysCount);
    setFormatDate(format(desireDays, 'yyyy-MM-dd'));
  };

  useEffect(() => {
    if (hasMounted) {
      const fetchData = async () => {
        try {
          const data = await getCurrecyRate(formatDate);
          setRate(data);
          console.log(data);
        } catch (error) {
          findDateWithCurrensy();
        }
      };
      fetchData();
    } else {
      setHasMounted(true);
    }
  }, [formatDate]);

  const handleAmmount = (e: any) => setAmmount(e.target.value);

  const handleSubmit = () => {
    const invoicePricePln = ammount * rate;
    const invoiceFee = invoicePricePln * 0.1;
    const invoiceVat = invoiceFee * 0.23;
    setRates((prev) => [...prev, { invoicePricePln, invoiceFee, invoiceVat }]);
  };

  return (
    <>
      <p>
        Currensy: {rate} <br />
        Date: {formatDate}
      </p>
      <input type="number" placeholder="ammount" onChange={handleAmmount} /> <br />
      <DatePicker selected={startDate} placeholderText="pick the date" dateFormat="yyyy-MM-dd" onChange={handleDate} />
      <br />
      <button onClick={handleSubmit}>Claculate price</button>
      <table>
        <tbody>
          <tr>
            <th>Total:</th>
            <th>Fee:</th>
            <th>VAT:</th>
          </tr>
          {rates.map((item, index) => {
            return (
              <tr key={index}>
                <td> {item.invoicePricePln}</td>
                <td> {item.invoiceFee}</td>
                <td> {item.invoiceVat}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Controller;
