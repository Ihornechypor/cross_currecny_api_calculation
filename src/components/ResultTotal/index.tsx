import { TO_FIXED_VALUE } from '../../consts';
import { TotalData } from '../../types';
import * as Styled from './ResultTotal.styles';

export const ResultTotal = ({ totalData }: { totalData: TotalData }) => (
  <Styled.ResultTotal>
    <p>
      <b>Total Incum</b>: {totalData.amountOfIncum.toFixed(TO_FIXED_VALUE)}
    </p>
    <p>
      <b>Total Costs</b>: {totalData.amountOfCosts.toFixed(TO_FIXED_VALUE)}
    </p>
    <p>
      <b>Total Costs with Vat</b>: {totalData.amountOfCostsWithVat.toFixed(TO_FIXED_VALUE)}
    </p>
    <p>
      <b>Total Vat 23%</b>: {totalData.ammountOfFeeOfVat.toFixed(TO_FIXED_VALUE)}
    </p>
    <p>
      <b>Total to spend</b>: {totalData.ammoutClear.toFixed(TO_FIXED_VALUE)}
    </p>
    <p>
      <b>Total to spend and Vat</b>: {totalData.ammoutClearAndVat.toFixed(TO_FIXED_VALUE)}
    </p>
  </Styled.ResultTotal>
);
