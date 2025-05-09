import {
  Container,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { changeSearchText } from "../../../store/utilities/UtitlitySlice";

interface FilterSearchProps {
  field?: string;
}

const FilterSearch = ({ field }: FilterSearchProps) => {
  const dispatch = useDispatch();

  const search = useSelector((state: RootState) => state.utility.searchText);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchText(e.target.value as string));
  };

  return (
    <Container
      maxWidth="sm"
      disableGutters
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
        variant="outlined"
        placeholder={field}
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

export default FilterSearch;
