import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

interface AddButtonProps {
  onClick: () => void;
  text: string;
}

const AddButton = ({ onClick, text }: AddButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      startIcon={<AddIcon />}
      sx={{
        textTransform: "none",
        width: "750px",
        height: "46px",
      }}
    >
      {text}
    </Button>
  );
};

export default AddButton;
