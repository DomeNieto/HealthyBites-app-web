import { Button, Stack, Tooltip } from "@mui/material";

interface ActionButtonProps {
  handleShowDetails?: () => void;
  handleUpdate?: () => void;
  handleDelete?: () => void;
  handleDisable?: () => void;
  handleActivate?: () => void;
}

const ActionButtons = ({
  handleShowDetails,
  handleDelete,
  handleUpdate,
  handleDisable,
  handleActivate,
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

  const renderButtonDisable = () =>
    handleDisable && (
      <Tooltip title="Desabilitar Ingrediente">
        <Button
          variant="contained"
          color="primary"
          onClick={handleDisable}
          sx={{ textTransform: "none" }}
        >
          Desabilitar
        </Button>
      </Tooltip>
    );

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
