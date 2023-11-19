import { ReactNode, useState, useEffect } from 'react';
import { getCurrecyRate } from '../../api/getCurrecyRate';
import 'react-datepicker/dist/react-datepicker.css';
import { format, subDays, parse } from 'date-fns';
import Papa from 'papaparse';

interface ControllerProps {
  children?: ReactNode;
}

const updateSubDays = (date: string, day: number) => subDays(parse(date, 'MMM d, yyyy', new Date()), day);

const formatedDate = (date: string) => format(date, 'yyyy-MM-dd');

const calculateLocalAmounts = (amount: number, rate: number) => {
  const amountFee = +(amount * 0.1).toFixed(2);
  const amountLocal = +(amount * rate).toFixed(2);
  const amountFeeLocal = +(amountLocal * 0.1).toFixed(2);
  const amountFeeVat = +(amountFeeLocal * 0.23).toFixed(2);

  return {
    amountFee,
    amountLocal,
    amountFeeLocal,
    amountFeeVat,
  };
};

const Controller = ({ children }: ControllerProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [rate, setRate] = useState([]);
  const [formatDate, setFormatDate] = useState();
  const [apiData, setApiData] = useState({});
  // csv
  const [csvData, setCsvData] = useState();

  const fetchData = async (formatedDate: string) => {
    let currentDate = formatedDate;
    let retryCount = 0;

    while (retryCount < 5) {
      try {
        const data = await getCurrecyRate(currentDate, formatedDate);
        console.log(data);

        setApiData({ ...data });
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
      setRate((prev) => {
        const newDateArray = prev.map((item) => {
          if (item.formatedDate === apiData.formatedDate) {
            return { ...item, ...apiData, ...calculateLocalAmounts(item.amount, apiData.currecyRate) };
          }
          return { ...item };
        });
        return newDateArray;
      });
    } else {
      setHasMounted(true);
    }
  }, [apiData]);

  const handleReset = () => {
    setRate([]);
    setApiData([]);
  };

  const handleCsvInputChange = (e) => {
    setCsvData(e.target.value);
  };

  const parseCSVToArray = () => {
    Papa.parse(csvData, {
      complete: (result) => {
        const filteredArray = result.data.map((obj) => ({
          initialDate: obj.Date,
          formatedDate: handleDate(obj.Date),
          amount: Number(obj.Amount),
        }));

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
            <th>CSV Date:</th>
            <th>Formated Date:</th>
            <th>Currecy Date:</th>
            <th>Currecy Rate:</th>
            <th>Amount in USD:</th>
            <th>Amount fee in USD:</th>
            <th>Amount in PLN:</th>
            <th>Amount Fee in PLN:</th>
            <th>Amount Fee VAT in PLN:</th>
          </tr>
          {rate.map((item, index) => (
            <tr key={index}>
              <th>{item.initialDate}</th>
              <th>{item.formatedDate}</th>
              <th>{item.currecyDate}</th>
              <th>{item.currecyRate}</th>
              <th>{item.amount}</th>
              <th>{item.amountFee}</th>
              <th>{item.amountLocal}</th>
              <th>{item.amountFeeLocal}</th>
              <th>{item.amountFeeVat}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Controller;
