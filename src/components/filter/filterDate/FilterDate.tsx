import {
  Container,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { changeSearchDate } from "../../../store/utilities/UtitlitySlice";

interface FilterDateProps {
  field?: string;
}

// FilterDate component provides a date picker input for filtering data by date.
const FilterDate = ({ field }: FilterDateProps) => {
  const dispatch = useDispatch();

  const search = useSelector((state: RootState) => state.utility.searchDate);

  // Handles date change and dispatches updated value to Redux
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchDate(e.target.value as string));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <InputLabel
        htmlFor="label"
        sx={{ textAlign: "left", width: "100%", fontSize: 14 }}
      >
        {field}
      </InputLabel>
      <TextField
        type="date"
        variant="outlined"
        value={search}
        onChange={handleOnChange}
        slotProps={textFieldProps}
        fullWidth
        sx={{
          height: 36,
          "& .MuiInputBase-root": {
            height: 46,
            fontSize: "0.8rem",
          },
          "& input::placeholder": {
            fontSize: 14,
          },
        }}
      />
    </Container>
  );
};

const textFieldProps = {
  input: {
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon fontSize="small" />
      </InputAdornment>
    ),
  },
};

export default FilterDate;
