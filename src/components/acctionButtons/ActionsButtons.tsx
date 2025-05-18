import { Button, Stack, Tooltip } from "@mui/material";

interface ActionButtonProps {
  handleShowDetails?: () => void;
  handleUpdate?: () => void;
  handleDelete?: () => void;
}

const ActionButtons = ({
  handleShowDetails,
  handleDelete,
  handleUpdate,
}: ActionButtonProps) => {
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

  const renderActionsButtons = () => (
    <Stack direction="row" spacing={1}>
      {renderButtonShowDetails()}
      {renderButtonUpdate()}
      {renderButtonDelete()}
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
