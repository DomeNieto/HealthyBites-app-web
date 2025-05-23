import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

/**
 * BackButton component provides a styled button to navigate back to the previous page.
 */
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      startIcon={<ArrowBackIcon />}
      sx={{
        color: "#9c27b0",
        textTransform: "none",
        fontSize: "1rem",
        fontWeight: "medium",
        "&:hover": {
          backgroundColor: "rgba(156, 39, 176, 0.08)",
        },
      }}
    >
      Volver
    </Button>
  );
};

export default BackButton;
