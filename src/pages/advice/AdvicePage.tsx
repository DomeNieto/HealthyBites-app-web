import { useDispatch, useSelector } from "react-redux";
import {
  useCreateAdviceMutation,
  useDeleteAdviceMutation,
  useGetAllAdvicesQuery,
  useUpdateAdviceMutation,
} from "../../store/advice/AdviceApi";
import { AppDispatch, RootState } from "../../store/store";

import ActionButtons from "../../components/acctionButtons/ActionsButtons";
import { Advice } from "../../interfaces/Advices";
import SpinnerIsLoading from "../../components/loading/SpinnerLoading";
import { Container, Grid, Stack } from "@mui/material";
import GenericStickyTable from "../../components/table/Table";
import { adviceFieldsConfig, dataHeaderAdvice } from "./HeaderColumns";
import FilterSearch from "../../components/filter/filterSearch/FilterSearch";
import AddButton from "../../components/acctionButtons/AddButton";
import FormModal from "../../components/modal/FormModal";
import {
  resetCurrentAdvice,
  selectFilteredadvices,
  setAdvices,
  setCurrentAdvice,
} from "../../store/advice/AdviceSlice";
import { useEffect, useState } from "react";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import { resetUtilityState } from "../../store/utilities/UtitlitySlice";

const AdvicePage = () => {
  const { data, isLoading } = useGetAllAdvicesQuery();

  const dispatch = useDispatch<AppDispatch>();
  const advices = useSelector(selectFilteredadvices);

  const [createAdvice, { isLoading: isCreating }] = useCreateAdviceMutation();
  const [updateAdvice, { isLoading: isUpdating }] = useUpdateAdviceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info" | "warning",
  });

  const { currentAdvice } = useSelector((state: RootState) => state.advices);

  const [deleteAdvice] = useDeleteAdviceMutation();

  useEffect(() => {
    if (data) {
      dispatch(setAdvices(data));
      dispatch(resetUtilityState());
    }
  }, [data, dispatch]);

  const handleOpenCreateModal = () => {
    setModalMode("create");
    dispatch(resetCurrentAdvice());
    setIsModalOpen(true);
  };

  const handleUpdate = (advice: Advice) => {
    setModalMode("edit");
    dispatch(setCurrentAdvice(advice));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(resetCurrentAdvice());
  };

  const handleModalSubmit = async (
    formData: Record<string, string | number>
  ) => {
    try {
      const payload = {
        title: formData.title.toString(),
        description: formData.description.toString(),
        creationDate: new Date().toISOString(),
      };
      if (modalMode === "create") {
        await createAdvice(payload).unwrap();
        setSnackbar({
          open: true,
          message: "Consejo nutricional creado correctamente.",
          severity: "success",
        });
      } else if (modalMode === "edit" && currentAdvice?.id) {
        await updateAdvice({
          ...payload,
          id: currentAdvice.id,
        }).unwrap();
        setSnackbar({
          open: true,
          message: "Consejo nutricional actualizado correctamente.",
          severity: "success",
        });
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error guardando consejos:", error);
    }
  };

  const handleDelete = async (row: Advice) => {
    console.log("ROW AL ELIMINAR:", row);
    if (window.confirm(`¿Estás seguro de que quieres eliminar ${row.title}?`)) {
      try {
        await deleteAdvice(row.id.toString()).unwrap();
        setSnackbar({
          open: true,
          message: "Consejo nutricional eliminado correctamente.",
          severity: "success",
        });
      } catch (error) {
        console.log("Eliminando ID:", row.id);

        console.error("Error eliminando ingrediente:", error);
        setSnackbar({
          open: true,
          message:
            "Error al eliminar el consejo nutricional. Inténtalo de nuevo.",
          severity: "error",
        });
      }
    }
  };

  const actions = (row: Advice) => (
    <ActionButtons
      handleDelete={() => handleDelete(row)}
      handleUpdate={() => handleUpdate(row)}
    />
  );

  if (isLoading) {
    return <SpinnerIsLoading />;
  }

  const initialFormValues =
    modalMode === "edit" && currentAdvice
      ? {
          title: currentAdvice.title,
          description: currentAdvice.description,
        }
      : { title: "", description: "" };

  return (
    <Container>
      <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 5 }}>
        <Grid size={8}>
          <Stack direction="row" spacing={2}>
            <FilterSearch field="Título del consejo" />
          </Stack>
        </Grid>
        <Grid
          size={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <AddButton text="Crear Consejo" onClick={handleOpenCreateModal} />
        </Grid>
      </Grid>

      <GenericStickyTable<Advice>
        columns={dataHeaderAdvice()}
        data={advices}
        rowKey="id"
        actions={actions}
      />

      {isModalOpen && (
        <FormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={
            modalMode === "create" ? "Crear Nuevo Consejo" : "Editar Consejo"
          }
          fields={adviceFieldsConfig}
          initialValues={initialFormValues}
          onSubmit={handleModalSubmit}
          isLoading={isCreating || isUpdating}
        />
      )}
      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Container>
  );
};
export default AdvicePage;
