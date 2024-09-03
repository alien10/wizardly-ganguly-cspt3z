import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import sourceData from "./source-data.json";
import type { SourceDataType, TableDataType } from "./types";

/**
 * Example of how a tableData object should be structured.
 *
 * Each `row` object has the following properties:
 * @prop {string} person - The full name of the employee.
 * @prop {number} past12Months - The value for the past 12 months.
 * @prop {number} y2d - The year-to-date value.
 * @prop {number} may - The value for May.
 * @prop {number} june - The value for June.
 * @prop {number} july - The value for July.
 * @prop {number} netEarningsPrevMonth - The net earnings for the previous month.
 */
const calculatedPercentage = (value) => {
  const numericValue = parseFloat(value);
  if (!isNaN(numericValue)) {
    return numericValue * 100;
  } else {
    return 0;
  }
};
const tableData: TableDataType[] = (
  sourceData as unknown as SourceDataType[]
).map((dataRow, index) => {
  console.log(dataRow.employees?.workforceUtilisation?.lastThreeMonthsIndividually[0]?.utilisationRate)
  const person = `${dataRow?.employees?.firstname} ${dataRow?.employees?.lastname}`;

  const row: TableDataType = {
    person: `${person}`,
    past12Months: `${calculatedPercentage(
      dataRow?.employees?.workforceUtilisation?.utilisationRateLastTwelveMonths
    )}%`,
    y2d: `${calculatedPercentage(
      dataRow?.employees?.workforceUtilisation?.utilisationRateYearToDate
    )}%`,
    may: `${calculatedPercentage(dataRow.employees?.workforceUtilisation?.lastThreeMonthsIndividually[0]?.utilisationRate)}%`,
    june: `${calculatedPercentage(dataRow.employees?.workforceUtilisation?.lastThreeMonthsIndividually[1]?.utilisationRate)}%`,
    july: `${calculatedPercentage(dataRow.employees?.workforceUtilisation?.lastThreeMonthsIndividually[2]?.utilisationRate)}%`,
    netEarningsPrevMonth: `No data available`,
  };

  return row;
});

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<TableDataType>[]>(
    () => [
      {
        accessorKey: "person",
        header: "Person",
      },
      {
        accessorKey: "past12Months",
        header: "Past 12 Months",
      },
      {
        accessorKey: "y2d",
        header: "Y2D",
      },
      {
        accessorKey: "may",
        header: "May",
      },
      {
        accessorKey: "june",
        header: "June",
      },
      {
        accessorKey: "july",
        header: "July",
      },
      {
        accessorKey: "netEarningsPrevMonth",
        header: "Net Earnings Prev Month",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
