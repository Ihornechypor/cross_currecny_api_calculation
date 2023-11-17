import { ReactNode, useState, useEffect } from 'react';
import { getCurrecyRate } from '../../api/getCurrecyRate';
import 'react-datepicker/dist/react-datepicker.css';
import { format, subDays, parse } from 'date-fns';
import Papa from 'papaparse';

interface ControllerProps {
  children?: ReactNode;
}
const Controller = ({ children }: ControllerProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [rate, setRate] = useState(0);
  const [formatDate, setFormatDate] = useState('');
  const [ammount, setAmmount] = useState(0);
  // csv
  const [csvData, setCsvData] = useState('');
  const [dataArray, setDataArray] = useState([]);
  const [subDaysCount, setSubDaysCount] = useState(1);

  const findDateWithCurrensy = () => {
    if (subDaysCount > 5) return;

    setSubDaysCount((prev) => prev + 1);
    const desireDays = subDays(startDate, subDaysCount);
    setFormatDate(format(desireDays, 'yyyy-MM-dd'));
  };

  const handleDate = (date: any) => {
    const prevDate = subDays(parse(date, 'MMM d, yyyy', new Date()), 1);
    setFormatDate(format(prevDate, 'yyyy-MM-dd'));
    return format(prevDate, 'yyyy-MM-dd');
  };

  const fetchData = async () => {
    try {
      const data = await getCurrecyRate(formatDate);
      console.log('fetching');
      setRate(data);
      console.log(data);
    } catch (error) {
      findDateWithCurrensy();
    }
  };

  useEffect(() => {
    if (hasMounted) {
      fetchData();
    } else {
      setHasMounted(true);
    }
  }, [formatDate]);

  const handleSubmit = () => {
    const invoicePricePln = ammount * rate;
    const invoiceFee = invoicePricePln * 0.1;
    const invoiceVat = invoiceFee * 0.23;

    console.log(dataArray);
  };

  const handleCsvInputChange = (e) => {
    setCsvData(e.target.value);
  };

  const parseCSVToArray = () => {
    Papa.parse(csvData, {
      complete: (result) => {
        console.log(result.data);
        const filteredArray = result.data.map((obj) => ({
          ...obj,
          formatedDate: handleDate(obj.Date),
          currensyRate: fetchData(),
        }));

        console.log(filteredArray);

        setDataArray(filteredArray);
      },
      header: true, // Set this to true if your CSV has headers
    });
  };

  return (
    <>
      <p>
        Currensy: <br />
        Date:
      </p>
      <br />
      <textarea value={csvData} onChange={handleCsvInputChange} placeholder="Paste CSV data here" rows={5} cols={50} />
      <button onClick={parseCSVToArray}>Load csv</button>
      <table>
        <tbody>
          <tr>
            <th>Date:</th>
            <th>DateCurency:</th>
            <th>CurrencyRate:</th>
            <th>Ammount in USD:</th>
            <th>Ammount in PLN:</th>
            <th>Fee in PLN:</th>
            <th>Fee VAT in PLN:</th>
          </tr>
          {dataArray.map((item, index) => (
            <tr key={index}>
              <th>{item.Date}</th>
              <th>{item.formatedDate}</th>
              <th></th>
              <th>{item.Amount}</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Controller;
