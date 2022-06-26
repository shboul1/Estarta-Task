import { useState, useEffect } from "react";
import {
  Divider,
  TableContainer,
  Table,
  TablePagination,
  Box,
  TableBody,
} from "@mui/material";
import BreadCrumbs from "./BreadCrumbs";
import TableToolbar from "./TableToolbar";
import useTable, { getComparator, emptyRows } from "../hooks/useTable";
import TableHeadCustom from "./TableHeadCustom";
import TableRowComponent from "./TableRow";
import { TableDataTypes } from "../@types/TableTypes";

const APPLICATION_TYPES: string[] = [
  "all",
  "full stack development",
  "backend development",
  "ui design",
  "ui/ux design",
  "front end development",
];

const ACTION_TYPES: string[] = [
  "all",
  "full stack development",
  "backend development",
  "ui design",
  "ui/ux design",
  "front end development",
];

const TABLE_HEAD: {
  id: string;
  label: string;
  align: string;
}[] = [
  { id: "invoiceNumber", label: "Log ID", align: "left" },
  { id: "createDate", label: "Application Type", align: "left" },
  { id: "dueDate", label: "Application ID", align: "left" },
  { id: "price", label: "Action", align: "center" },
  { id: "sent", label: "Action Details", align: "center" },
  { id: "status", label: "Date", align: "center" },
];

export default function MainTable() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "createDate" });

  const [tableData, setTableData] = useState<TableDataTypes[]>([]);
  const [filterName, setFilterName] = useState("");

  const [AppTypeFilter, setFilterAppType] = useState("all");
  const [ActionTypeFilter, setFilterActionType] = useState("all");
  const [AppIDFilter, setAPPIDFilter] = useState("all");

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);

  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterAppType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAppType(event.target.value);
  };
  const handleFilterActionType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterActionType(event.target.value);
  };
  const handleFilterAppID = (filterAppID: string) => {
    setAPPIDFilter(filterAppID);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    ActionTypeFilter,
    AppTypeFilter,
    filterStartDate,
    filterEndDate,
    AppIDFilter,
  });
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
      );
      if (res) {
        const data = await res.json();
        setTableData(data.result?.auditLog);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <BreadCrumbs />
      <Divider />
      <TableToolbar
        filterName={filterName}
        AppTypeFilter={AppTypeFilter}
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        onFilterAppID={handleFilterAppID}
        onFilterName={handleFilterName}
        onFilterAppType={handleFilterAppType}
        onFilterActionType={handleFilterActionType}
        onFilterStartDate={(newValue) => {
          setFilterStartDate(newValue);
        }}
        onFilterEndDate={(newValue) => {
          setFilterEndDate(newValue);
        }}
        applicationType={APPLICATION_TYPES}
        actionsType={ACTION_TYPES}
      />
      <TableContainer>
        <Table>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            onSort={onSort}
            sx={{ width: 1000 }}
          />

          <TableBody>
            {dataFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRowComponent key={row.logId} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: "relative" }}>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Box>
    </>
  );
}

// ------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStartDate,
  filterEndDate,
  AppIDFilter,
  ActionTypeFilter,
}: {
  tableData: TableDataTypes[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  AppTypeFilter: string;
  ActionTypeFilter: string;
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  AppIDFilter: string;
}) {
  //   const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  //   stabilizedThis.sort((a, b) => {
  //     const order = comparator(a[0], b[0]);
  //     if (order !== 0) return order;
  //     return a[1] - b[1];
  //   });

  //   tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !==
          -1 ||
        item.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !==
          -1
    );
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.createDate.getTime() >= filterStartDate.getTime() &&
        item.createDate.getTime() <= filterEndDate.getTime()
    );
  }

  return tableData;
}
