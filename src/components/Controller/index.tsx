import { ReactNode, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { getCurrecyRate } from '../../api/getCurrecyRate';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface ControllerProps {
  children?: ReactNode;
}
const Controller = ({ children }: ControllerProps) => {
  const [rate, setRate] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [ammount, setAmmount] = useState(null);

  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrecyRate(startDate);
        console.log(data);
      } catch (error) {
        // Handle errors if necessary
      }
    };

    fetchData();
  }, [startDate]);

  const handleAmmount = (e) => {
    setAmmount(e.target.value);
  };

  const handleSubmit = () => {
    const invoicePricePln = ammount * rate;
    const invoiceFee = invoicePricePln * 0.1;
    const invoiceVat = invoiceFee * 0.23;
    setRates((prev) => [...prev, { invoicePricePln, invoiceFee, invoiceVat }]);
  };

  return (
    <>
      <p>{rate}</p>
      <input type="number" placeholder="ammount" onChange={handleAmmount} /> <br />
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(format(date, 'yyyy-MM-dd'));
        }}
      />{' '}
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
