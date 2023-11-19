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
  const [formatDate, setFormatDate] = useState('');
  const [apiData, setApiData] = useState([]);
  // csv
  const [csvData, setCsvData] = useState();

  const fetchData = async (formatedDate: string) => {
    let currentDate = formatedDate;
    const retryCount = 0;
    while (retryCount < 5) {
      try {
        const data = await getCurrecyRate(currentDate, formatedDate);
        if (data && data.formatedDate) {
          setApiData((prev) => [...prev, data]);
          break;
        } else {
          console.error('Empty or invalid API response');
        }
      } catch (error) {
        const subDay = subDays(parse(currentDate, 'yyyy-MM-dd', new Date()), 1);

        currentDate = formatedDate(subDay);
        retryCount + 1;
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
    if (hasMounted && apiData.length !== 0) {
      if (apiData.length === rate.length) {
        const sortedByDays = apiData.sort(
          (a, b) => parse(b.formatedDate, 'yyyy-MM-dd', new Date()) - parse(a.formatedDate, 'yyyy-MM-dd', new Date()),
        );
        const compairedArray = rate.map((item, index) => ({
          ...item,
          ...sortedByDays[index],
          ...calculateLocalAmounts(item.amount, sortedByDays[index].currecyRate),
        }));

        setRate(compairedArray);
      } else {
        console.error('currensy date not full');
      }
    } else {
      setHasMounted(true);
    }
  }, [apiData]);

  const handleReset = () => {
    setRate([]);
    setApiData([]);
    console.clear();
  };

  const handleCsvInputChange = (e) => {
    setCsvData(e.target.value);
  };

  const parseCSVToArray = () => {
    try {
      Papa.parse(csvData, {
        complete: (result) => {
          const filteredArray = result.data.map((obj) => ({
            initialDate: obj.Date,
            formatedDate: handleDate(obj.Date),
            amount: Number(obj.Amount),
          }));

          setRate(filteredArray);
        },
        header: true,
      });
    } catch (error) {
      console.error('Error parsing CSV:', error);
    }
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
