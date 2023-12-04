import { TotalData } from '../../types';

export const ResultTotal = ({ totalData }: { totalData: TotalData }) => (
  <div>
    <p>
      <b>Total Incum</b>: {totalData.amountOfIncum}
    </p>
    <p>
      <b>Total Costs</b>: {totalData.amountOfCosts}
    </p>
    <p>
      <b>Total Costs with Vat</b>: {totalData.amountOfCostsWithVat}
    </p>
    <p>
      <b>Total Vat 23%</b>: {totalData.ammountOfFeeOfVat}
    </p>
    <p>
      <b>Total to spend</b>: {totalData.ammoutClear}
    </p>
    <p>
      <b>Total to spend and Vat</b>: {totalData.ammoutClearAndVat}
    </p>
  </div>
);
