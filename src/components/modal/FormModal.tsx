import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { FormFieldConfig } from "../../interfaces/ModalForm";
import { useEffect, useState } from "react";
interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FormFieldConfig[];
  initialValues: Record<string, string | number>;
  onSubmit: (formData: Record<string, string | number>) => void;
  isLoading?: boolean;
  submitButtonText?: string;
}

const FormModal = ({
  isOpen,
  onClose,
  title,
  fields,
  initialValues,
  onSubmit,
  isLoading = false,
  submitButtonText = "Guardar",
}: FormModalProps) => {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialValues);
    }
  }, [initialValues, isOpen]);

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography sx={{ justifySelf: "center", fontSize: 22 }}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              type={field.type || "text"}
              value={formData[field.name] ?? ""}
              onChange={(e) =>
                handleChange(
                  field.name,
                  field.type === "number" ? +e.target.value : e.target.value
                )
              }
              fullWidth
              multiline={field.multiline || field.type === "textarea"}
              rows={field.rows || (field.type === "textarea" ? 3 : 1)}
            />
          ))}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: "16px 24px", justifyContent: "center" }}>
        <Button onClick={handleSubmit} variant="contained" disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            submitButtonText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
