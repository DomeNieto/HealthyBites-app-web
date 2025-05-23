import { Button, Stack, Tooltip } from "@mui/material";

interface ActionButtonProps {
  handleShowDetails?: () => void;
  handleUpdate?: () => void;
  handleDelete?: () => void;
  handleDisable?: () => void;
  handleActivate?: () => void;
}

/**
 * ActionButtons component renders a set of buttons based on the
 * provided handlers. Each button triggers a specific action like
 * showing details, updating, deleting, disabling, or activating.
 */
const ActionButtons = ({
  handleShowDetails,
  handleDelete,
  handleUpdate,
  handleDisable,
  handleActivate,
}: ActionButtonProps) => {
  // Render "Show Details" button if handler is provided
  const renderButtonShowDetails = () =>
    handleShowDetails && (
      <Tooltip title="Ver detalles">
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowDetails}
          sx={{ textTransform: "none" }}
        >
          Ver detalles
        </Button>
      </Tooltip>
    );

  // Render "Delete" button if handler is provided
  const renderButtonDelete = () =>
    handleDelete && (
      <Tooltip title="Eliminar">
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ textTransform: "none" }}
        >
          Eliminar
        </Button>
      </Tooltip>
    );

  // Render "Update" button if handler is provided
  const renderButtonUpdate = () =>
    handleUpdate && (
      <Tooltip title="Actualizar">
        <Button
          variant="contained"
          color="tertiary"
          onClick={handleUpdate}
          sx={{ textTransform: "none" }}
        >
          Editar
        </Button>
      </Tooltip>
    );

  // Render "Disable" button if handler is provided
  const renderButtonDisable = () =>
    handleDisable && (
      <Tooltip title="Deshabilitar Ingrediente">
        <Button
          variant="contained"
          color="primary"
          onClick={handleDisable}
          sx={{ textTransform: "none" }}
        >
          Deshabilitar
        </Button>
      </Tooltip>
    );

  // Render "Activate" button if handler is provided
  const renderButtonActivate = () =>
    handleActivate && (
      <Tooltip title="Habilitar Ingrediente">
        <Button
          variant="contained"
          color="primary"
          onClick={handleActivate}
          sx={{ textTransform: "none" }}
        >
          Habilitar
        </Button>
      </Tooltip>
    );

  // Combine all available action buttons in a horizontal stack
  const renderActionsButtons = () => (
    <Stack direction="row" spacing={1}>
      {renderButtonShowDetails()}
      {renderButtonUpdate()}
      {renderButtonDelete()}
      {renderButtonDisable()}
      {renderButtonActivate()}
    </Stack>
  );

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      {renderActionsButtons()}
    </Stack>
  );
};

export default ActionButtons;
