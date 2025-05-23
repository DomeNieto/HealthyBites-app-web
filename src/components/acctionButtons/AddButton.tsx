import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

interface AddButtonProps {
  onClick: () => void;
  text: string;
}

/**
 * AddButton component renders a styled button with an add icon.
 * It triggers the provided onClick handler when clicked.
 *
 * @param onClick - Function to call on button click
 * @param text - Button label text
 */
const AddButton = ({ onClick, text }: AddButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      startIcon={<AddIcon />}
      sx={{
        textTransform: "none",
        width: "320px",
        height: "46px",
      }}
    >
      {text}
    </Button>
  );
};

export default AddButton;
