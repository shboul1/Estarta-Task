// React
import { useState, useEffect } from "react";
// next
import { useRouter } from "next/router";
// mui
import {
  Divider,
  TableContainer,
  Table,
  TablePagination,
  Box,
  TableBody,
} from "@mui/material";
// Components
import BreadCrumbs from "./BreadCrumbs";
import TableToolbar from "./TableToolbar";
import TableHeadCustom from "./TableHeadCustom";
import TableRowComponent from "./TableRow";
// Types
import { TableDataTypes } from "../@types/TableTypes";
// Hooks & Helpers
import useTable, { getComparator } from "../hooks/useTable";
// Constants
import { APPLICATION_TYPES, ACTION_TYPES, TABLE_HEAD } from "../constants";

export default function MainTable() {
  const router = useRouter();
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "createDate" });
  // Table Filters States
  const [tableData, setTableData] = useState<TableDataTypes[]>([]);
  const [filterName, setFilterName] = useState<string>("");
  const [AppTypeFilter, setFilterAppType] = useState<string>("");
  const [ActionTypeFilter, setFilterActionType] = useState<string>("");
  const [AppIDFilter, setAPPIDFilter] = useState<string>("");
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);

  // ------------------------------------------------
  // Table Filters Actions & Helpers

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };
  const handleFilterAppType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAppType(event.target.value);
    router.push(`/?search=ApplicationType=${event.target.value}&`, undefined, {
      shallow: true,
    });
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

  const handleResetFeilds = () => {
    setFilterName("");
    setFilterAppType("");
    setFilterActionType("");
    setAPPIDFilter("");
    setFilterStartDate(null);
    setFilterEndDate(null);
  };
  // ------------------------------------------------

  // SYNC URL with search Query using Shallow routing
  useEffect(() => {
    const ApplicationTypeQuery = `ApplicationType=${AppTypeFilter}&`;
    const ActionTypeQuery = `ActionType=${ActionTypeFilter}&`;
    const ApplicationIdQuery = `ApplicationId=${AppIDFilter}&`;
    const StartDatedQuery =
      filterStartDate &&
      `StartDate=${new Date(filterStartDate).toLocaleDateString("en-US")}&`;
    const EndDateQuery =
      filterEndDate &&
      `EndDate=${new Date(filterEndDate).toLocaleDateString("en-US")}&`;

    router.push(
      `/?search=${AppTypeFilter && ApplicationTypeQuery}${
        ActionTypeFilter && ActionTypeQuery
      }${AppIDFilter && ApplicationIdQuery}${
        filterStartDate ? StartDatedQuery : ""
      }${filterEndDate ? EndDateQuery : ""}`,
      undefined,
      { shallow: true }
    );
  }, [
    AppTypeFilter,
    ActionTypeFilter,
    filterName,
    AppIDFilter,
    filterStartDate,
    filterEndDate,
  ]);

  // ------------------------------------------------

  // Get Data From API
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
        AppIDFilter={AppIDFilter}
        AppTypeFilter={AppTypeFilter}
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        ActionTypeFilter={ActionTypeFilter}
        onFilterAppID={handleFilterAppID}
        onFilterName={handleFilterName}
        onFilterAppType={handleFilterAppType}
        onFilterActionType={handleFilterActionType}
        onReset={handleResetFeilds}
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
  AppTypeFilter,
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
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData;
  }

  if (AppIDFilter) {
    tableData = tableData.filter((item: Record<string, any>) =>
      item.applicationId?.toString().includes(AppIDFilter)
    );
  }

  if (AppTypeFilter) {
    tableData = tableData.filter((item: Record<string, any>) =>
      item.applicationType?.toString().includes(AppTypeFilter)
    );
  }

  if (ActionTypeFilter) {
    tableData = tableData.filter((item: Record<string, any>) =>
      item.actionType?.includes(ActionTypeFilter)
    );
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        new Date(item.creationTimestamp).getTime() >=
          filterStartDate.getTime() &&
        new Date(item.creationTimestamp).getTime() <= filterEndDate.getTime()
    );
  }

  return tableData;
}
