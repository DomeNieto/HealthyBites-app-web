import { Container, Grid, Stack } from "@mui/material";
import GenericStickyTable from "../../components/table/Table";
import ActionButtons from "../../components/acctionButtons/ActionsButtons";
import SpinnerIsLoading from "../../components/loading/SpinnerLoading";
import FilterSearch from "../../components/filter/filterSearch/FilterSearch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FilterNumber from "../../components/filter/filterNumber/FilterNumber";
import {
  useActivateIngredientMutation,
  useCreateIngredientMutation,
  useDisableIngredientMutation,
  useGetAllIngredientsQuery,
  useUpdateIngredientMutation,
} from "../../store/ingredient/IngredientApi";
import {
  resetCurrentIngredient,
  selectFilteredIngredients,
  setCurrentIngredient,
  setIngredients,
} from "../../store/ingredient/IngredientSlice";
import { Ingredient } from "../../interfaces/Ingredient";
import { dataHeaderIngredients, ingredientFieldsConfig } from "./HeaderColumns";
import { AppDispatch, RootState } from "../../store/store";
import FormModal from "../../components/modal/FormModal";
import AddButton from "../../components/acctionButtons/AddButton";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import { resetUtilityState } from "../../store/utilities/UtitlitySlice";

const IngredientPage = () => {
  const { data, isLoading } = useGetAllIngredientsQuery();

  const dispatch = useDispatch<AppDispatch>();

  const ingredients = useSelector(selectFilteredIngredients);

  const { currentIngredient } = useSelector(
    (state: RootState) => state.ingredients
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info" | "warning",
  });

  const [createIngredient, { isLoading: isCreating }] =
    useCreateIngredientMutation();
  const [updateIngredient, { isLoading: isUpdating }] =
    useUpdateIngredientMutation();

  const [disableIngredient] = useDisableIngredientMutation();
  const [activateIngredient] = useActivateIngredientMutation();

  useEffect(() => {
    if (data) {
      dispatch(setIngredients(data));
      dispatch(resetUtilityState());
    }
  }, [data, dispatch]);

  const handleOpenCreateModal = () => {
    setModalMode("create");
    dispatch(resetCurrentIngredient());
    setIsModalOpen(true);
  };

  const handleUpdate = (ingredient: Ingredient) => {
    setModalMode("edit");
    dispatch(setCurrentIngredient(ingredient));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(resetCurrentIngredient());
  };

  const handleModalSubmit = async (
    formData: Record<string, string | number>
  ) => {
    try {
      const payload = {
        name: formData.name.toString(),
        quantityCalories: Number(formData.calories),
        creationDate: new Date().toISOString(),
      };
      if (modalMode === "create") {
        await createIngredient(payload).unwrap();
        setSnackbar({
          open: true,
          message: "Ingrediente creado correctamente",
          severity: "success",
        });
      } else if (modalMode === "edit" && currentIngredient?.id) {
        await updateIngredient({
          ...payload,
          id: currentIngredient.id,
        }).unwrap();
        setSnackbar({
          open: true,
          message: "Ingrediente actualizado correctamente",
          severity: "success",
        });
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error guardando ingrediente:", error);
      setSnackbar({
        open: true,
        message: "Error guardando el ingrediente",
        severity: "success",
      });
    }
  };

  const handleDisable = async (row: Ingredient) => {
    if (
      window.confirm(`¿Estás seguro de que quieres desactivar ${row.name}?`)
    ) {
      try {
        await disableIngredient(row.id.toString()).unwrap();
        setSnackbar({
          open: true,
          message: "Ingrediente desactivado correctamente",
          severity: "success",
        });
      } catch (error) {
        console.log("Error desactiva", error);
        setSnackbar({
          open: true,
          message: "Error desactivando el ingrediente. Inténtalo de nuevo.",
          severity: "error",
        });
      }
    }
  };

  const handleActivate = async (row: Ingredient) => {
    if (window.confirm(`¿Estás seguro de que quieres activar ${row.name}?`)) {
      try {
        await activateIngredient(row.id.toString()).unwrap();
        setSnackbar({
          open: true,
          message: "Ingrediente activado correctamente",
          severity: "success",
        });
      } catch (error) {
        console.log("Error activando", error);
        setSnackbar({
          open: true,
          message: "Error activando el ingrediente. Inténtalo de nuevo.",
          severity: "error",
        });
      }
    }
  };

  const actions = (row: Ingredient) => {
    if (row.active === false) {
      return (
        <ActionButtons
          handleActivate={() => handleActivate(row)}
          handleUpdate={() => handleUpdate(row)}
        />
      );
    } else {
      return (
        <ActionButtons
          handleDisable={() => handleDisable(row)}
          handleUpdate={() => handleUpdate(row)}
        />
      );
    }
  };

  if (isLoading) {
    return <SpinnerIsLoading />;
  }

  const initialFormValues =
    modalMode === "edit" && currentIngredient
      ? {
          name: currentIngredient.name,
          calories: currentIngredient.quantityCalories,
        }
      : { name: "", calories: 0 };

  return (
    <Container>
      <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 5 }}>
        <Grid size={8}>
          <Stack direction="row" spacing={2}>
            <FilterSearch field="Nombre Ingrediente" />
            <FilterNumber field="Calorias" />
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
          <AddButton text="Crear Ingrediente" onClick={handleOpenCreateModal} />
        </Grid>
      </Grid>

      <GenericStickyTable<Ingredient>
        columns={dataHeaderIngredients()}
        data={ingredients}
        rowKey="id"
        actions={actions}
        isRowDisabled={(row) => !row.active}
      />

      {isModalOpen && (
        <FormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={
            modalMode === "create"
              ? "Crear Nuevo Ingrediente"
              : "Editar Ingrediente"
          }
          fields={ingredientFieldsConfig}
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
export default IngredientPage;
