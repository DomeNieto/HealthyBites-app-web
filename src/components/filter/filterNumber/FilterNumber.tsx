import { Container, InputLabel, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { changeSearchNumber } from "../../../store/utilities/UtitlitySlice";

interface FilterNumberProps {
  field?: string;
}

const FilterNumber = ({ field }: FilterNumberProps) => {
  const dispatch = useDispatch();

  const search = useSelector((state: RootState) => state.utility.searchNumber);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchNumber(e.target.value as string));
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
        type="number"
        variant="outlined"
        placeholder={"0.0"}
        value={search}
        onChange={handleOnChange}
        /*      slotProps={textFieldProps} */
        fullWidth
      />
    </Container>
  );
};

export default FilterNumber;
