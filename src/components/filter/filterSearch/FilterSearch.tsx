import {
  Container,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { changeFilterBySearch } from "../../../store/utilities/UtitlitySlice";
import { Label } from "@mui/icons-material";

interface FilterSearchProps {
  placeholder?: string;
}

const FilterSearch = ({ placeholder = "Buscar..." }: FilterSearchProps) => {
  const dispatch = useDispatch();

  const search = useSelector((state: RootState) => state.utility.search);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterBySearch(e.target.value as string));
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
        {placeholder}
      </InputLabel>
      <TextField
        variant="outlined"
        placeholder={placeholder}
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

export default FilterSearch;
