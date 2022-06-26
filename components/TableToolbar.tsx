import { Stack, InputAdornment, TextField, MenuItem } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
// components

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

type Props = {
  actionsType: string[];
  applicationType: string[];
  filterName: string;
  AppTypeFilter: string;
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  onFilterName: (value: string) => void;
  onFilterAppID: (value: string) => void;
  onFilterAppType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterActionType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterStartDate: (value: Date | null) => void;
  onFilterEndDate: (value: Date | null) => void;
};

export default function TableToolbar({
  actionsType,
  applicationType,
  filterStartDate,
  filterEndDate,
  filterName,
  AppTypeFilter,
  onFilterName,
  onFilterAppType,
  onFilterActionType,
  onFilterStartDate,
  onFilterEndDate,
  onFilterAppID,
}: Props) {
  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", md: "row" }}
      sx={{ py: 2.5, px: 3 }}
    >
      <TextField
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Employee Name"
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
      <TextField
        fullWidth
        select
        label="Action type"
        value={AppTypeFilter}
        onChange={onFilterActionType}
        SelectProps={{
          MenuProps: {
            sx: { "& .MuiPaper-root": { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
          textTransform: "capitalize",
        }}
      >
        {actionsType.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: "body2",
              textTransform: "capitalize",
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Application type"
        value={AppTypeFilter}
        onChange={onFilterAppType}
        SelectProps={{
          MenuProps: {
            sx: { "& .MuiPaper-root": { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
          textTransform: "capitalize",
        }}
      >
        {applicationType.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: "body2",
              textTransform: "capitalize",
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <DatePicker
        label="from date"
        value={filterStartDate}
        onChange={onFilterStartDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />

      <DatePicker
        label="to date"
        value={filterEndDate}
        onChange={onFilterEndDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />
      <TextField
        value={filterName}
        onChange={(event) => onFilterAppID(event.target.value)}
        placeholder="Application ID"
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
    </Stack>
  );
}
