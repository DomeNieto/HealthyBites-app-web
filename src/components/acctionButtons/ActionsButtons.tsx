import { Button, ButtonGroup, Stack, Tooltip } from "@mui/material";

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
        <Button variant="contained" color="primary" onClick={handleShowDetails}>
          Ver detalles
        </Button>
      </Tooltip>
    );

  const renderButtonDelete = () =>
    handleDelete && (
      <Tooltip title="Eliminar">
        <Button variant="contained" color="error" onClick={handleDelete}>
          Eliminar
        </Button>
      </Tooltip>
    );

  const renderButtonUpdate = () =>
    handleUpdate && (
      <Tooltip title="Actualizar">
        <Button variant="contained" color="secondary" onClick={handleUpdate}>
          Editar
        </Button>
      </Tooltip>
    );

  const renderActionsButtons = () => (
    <ButtonGroup>
      {renderButtonShowDetails()}
      {renderButtonUpdate()}
      {renderButtonDelete()}
    </ButtonGroup>
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
