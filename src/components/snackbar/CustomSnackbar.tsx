import { Alert, AlertColor, Snackbar } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
}

/**
 * CustomSnackbar component shows a Material-UI Snackbar with an Alert inside.
 *
 * @param {boolean} open - Controls whether the Snackbar is visible.
 * @param {() => void} onClose - Callback function called when the Snackbar closes.
 * @param {string} message - The message text displayed inside the Alert.
 * @param {"success" | "error" | "info" | "warning"} severity - Defines the Alert color and icon.
 *
 * @returns A Snackbar component with an Alert, anchored to the top-right,
 *          automatically hides after 4000ms, and supports manual closing.
 */
const CustomSnackbar = ({
  open,
  onClose,
  message,
  severity,
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
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
