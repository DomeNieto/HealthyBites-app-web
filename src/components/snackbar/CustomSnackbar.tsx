import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
  duration?: number;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
  message,
  severity = "info",
  duration = 4000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
