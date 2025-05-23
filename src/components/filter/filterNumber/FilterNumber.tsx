import { Container, InputLabel, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { changeSearchNumber } from "../../../store/utilities/UtitlitySlice";

interface FilterNumberProps {
  field?: string;
}

//  FilterNumber component provides a numeric input field for filtering data by number.
const FilterNumber = ({ field }: FilterNumberProps) => {
  const dispatch = useDispatch();

  const search = useSelector((state: RootState) => state.utility.searchNumber);

  // Handles number input changes and dispatches updated value to Redux
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchNumber(e.target.value as string));
  };

  return (
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <InputLabel
        htmlFor="label"
        sx={{ textAlign: "left", width: "100%", fontSize: 14 }}
      >
        {field}
      </InputLabel>
      <TextField
        type="number"
        variant="outlined"
        placeholder={"0.0"}
        value={search}
        onChange={handleOnChange}
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

export default FilterNumber;
