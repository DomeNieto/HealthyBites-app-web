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

const FilterDate = ({ field }: FilterDateProps) => {
  const dispatch = useDispatch();

  const search = useSelector((state: RootState) => state.utility.searchDate);

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
      <InputLabel htmlFor="label" sx={{ textAlign: "left", width: "100%" }}>
        {field}
      </InputLabel>
      <TextField
        type="date"
        variant="outlined"
        value={search}
        onChange={handleOnChange}
        slotProps={textFieldProps}
        fullWidth
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
