export const APPLICATION_TYPES: { label: string; value: string }[] = [
  { label: "All", value: "" },
  { label: "ADD_POA", value: "ADD_POA" },
  { label: "LEASE_REGISTRATION", value: "LEASE_REGISTRATION" },
  { label: "CERT_TITLE_DEED_PLOT", value: "CERT_TITLE_DEED_PLOT" },
  { label: "ADD_COMPANY", value: "ADD_COMPANY" },
  { label: "ADD_COMPANY_EMPLOYEE", value: "ADD_COMPANY_EMPLOYEE" },
  { label: "CERT_PROP_OWNERSHIP", value: "CERT_PROP_OWNERSHIP" },
];

export const ACTION_TYPES: { label: string; value: string }[] = [
  { label: "All", value: "" },
  { label: "INITIATE_APPLICATION", value: "INITIATE_APPLICATION" },
  { label: "SUBMIT_APPLICATION", value: "SUBMIT_APPLICATION" },
  { label: "DARI_REFRESH_TOKEN", value: "DARI_REFRESH_TOKEN" },
  { label: "ADD_EMPLOYEE", value: "ADD_EMPLOYEE" },
];

export const TABLE_HEAD: {
  id: string;
  label: string;
  align: string;
}[] = [
  { id: "logId", label: "Log ID", align: "left" },
  { id: "applicationType", label: "Application Type", align: "left" },
  { id: "applicationId", label: "Application ID", align: "left" },
  { id: "actionType", label: "Action", align: "center" },
  { id: "ActionDeatils", label: "Action Details", align: "center" },
  { id: "creationTimestamp", label: "Date", align: "center" },
];
