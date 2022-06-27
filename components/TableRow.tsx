// @mui
import { TableRow, TableCell } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  row: any;
};

const ACTION_TYPES: any = {
  INITIATE_APPLICATION: "Intitate application",
  SUBMIT_APPLICATION: "Submit Application",
  DARI_APP_LOGIN: "Dari app login",
  DARI_REFRESH_TOKEN: "Dari refresh token",
  ADD_EMPLOYEE: "Add employee",
};

const APPLICATION_TYPE: any = {
  ADD_POA: "add POA",
  LEASE_REGISTRATION: "lease registration",
  CERT_TITLE_DEED_PLOT: "Cert title deed plot",
  ADD_COMPANY: "Add company",
  ADD_COMPANY_EMPLOYEE: "Add company employee",
  CERT_PROP_OWNERSHIP: "Cert prop ownership",
};

export default function TableRowComponent({ row }: Props) {
  const {
    logId,
    applicationType,
    applicationId,
    actionType,
    creationTimestamp,
  } = row;
  return (
    <TableRow hover>
      <TableCell>{logId}</TableCell>

      <TableCell align="left">
        {(APPLICATION_TYPE[applicationType] || applicationType) ?? "-/-"}
      </TableCell>

      <TableCell align="left">{applicationId ?? "-/-"}</TableCell>

      <TableCell align="center">
        {(ACTION_TYPES[actionType] || actionType) ?? "-/-"}
      </TableCell>
      <TableCell align="center">-/-</TableCell>
      <TableCell align="center">{creationTimestamp}</TableCell>
    </TableRow>
  );
}
