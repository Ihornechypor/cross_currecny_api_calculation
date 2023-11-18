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
  const [rate, setRate] = useState([]);
  const [formatDate, setFormatDate] = useState('');
  const [ammount, setAmmount] = useState(0);
  // csv
  const [csvData, setCsvData] = useState('');
  const [dataArray, setDataArray] = useState([]);

  const updateSubDays = (date: string, day: number) => subDays(parse(date, 'MMM d, yyyy', new Date()), day);

  const formatedDate = (date: string) => format(date, 'yyyy-MM-dd');

  const parseDay = (date: string) => parse(date, 'MMM d, yyyy', new Date());

  // const findDateWithCurrensy = (date: any) => {
  //   const prevDate = ;

  //   return prevDate;
  // };

  const fetchData = async (formatDate: string) => {
    let currentDate = formatDate;
    let retryCount = 0;

    while (retryCount < 5) {
      try {
        const data = await getCurrecyRate(currentDate);

        console.log(data);
        setRate((prev) => [...prev, { formatDate, ...data }]);
        break;
      } catch (error) {
        const subDay = subDays(parse(currentDate, 'yyyy-MM-dd', new Date()), 1);

        currentDate = formatedDate(subDay);
        retryCount++;
      }
    }
  };

  const handleDate = (date: any) => {
    const prevDate = updateSubDays(date, 1);
    setFormatDate(formatedDate(prevDate));
    fetchData(formatedDate(prevDate));

    return formatedDate(prevDate);
  };

  useEffect(() => {
    if (hasMounted) {
      console.log(rate);
    } else {
      setHasMounted(true);
    }
  }, [rate]);

  // const handleSubmit = () => {
  //   const invoicePricePln = ammount * rate;
  //   const invoiceFee = invoicePricePln * 0.1;
  //   const invoiceVat = invoiceFee * 0.23;

  //   console.log(dataArray);
  // };

  const handleReset = () => setDataArray([]);

  const handleCsvInputChange = (e) => {
    setCsvData(e.target.value);
  };

  const parseCSVToArray = () => {
    Papa.parse(csvData, {
      complete: (result) => {
        console.log(result.data);
        const filteredArray = result.data.map((obj) => ({
          formatedDate: handleDate(obj.Date),
          currecyRate: '',
          currecyDate: '',
        }));
        // setDataArray(filteredArray);
        setRate(filteredArray);
      },
      header: true, // Set this to true if your CSV has headers
    });
  };

  return (
    <>
      <p>
        Currensy: <br />
        Date: {formatDate}
      </p>
      <br />
      <textarea value={csvData} onChange={handleCsvInputChange} placeholder="Paste CSV data here" rows={5} cols={50} />
      <br />
      <button onClick={parseCSVToArray}>Load csv</button>
      <button onClick={handleReset}>Reset List</button>
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
          {rate.map((item, index) => (
            <tr key={index}>
              <th>{item.date}</th>
              <th>{item.formatedDate}</th>
              <th>{item.currensyRate}</th>
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
