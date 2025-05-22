import { Grid } from "@mui/material";
import SexPieChart from "../../components/charts/SexPieChart";
import ImcLineChart from "../../components/charts/ImcLineChart";
import IngredientPieChart from "../../components/charts/IngredientPieChart";
import UserAgeRangeBarChart from "../../components/charts/UserAgeBarChart";
import UserRegistrationAreaChart from "../../components/charts/UserRegistrationAreaChart";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetAllUsersQuery } from "../../store/users/UserApi";
import { useGetAllIngredientsQuery } from "../../store/ingredient/IngredientApi";
import { setUsers } from "../../store/users/UserSlice";
import { setIngredients } from "../../store/ingredient/IngredientSlice";
import SpinnerIsLoading from "../../components/loading/SpinnerLoading";

// Home page
const HomePage = () => {
  const dispatch = useDispatch();

  // Fetch users and ingredients data from the API
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: ingredients, isLoading: ingredientsLoading } =
    useGetAllIngredientsQuery();

  // Store users in Redux once they are fetched
  useEffect(() => {
    if (users && users.length > 0) {
      dispatch(setUsers(users));
    }
  }, [dispatch, users]);

  // Store ingredients in Redux once they are fetched
  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      dispatch(setIngredients(ingredients));
    }
  }, [dispatch, ingredients]);

  // Show loading spinner while data is being fetched
  if (usersLoading || ingredientsLoading) {
    return <SpinnerIsLoading />;
  }
  return (
    <Grid
      container
      spacing={1}
      overflow="auto"
      sx={{
        pr: 2,
        pl: 2,
        flexGrow: 1,
        maxHeight: "calc(100vh - 170px)",
        overflow: "auto",
      }}
    >
      {/* User registration statistics chart */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ border: "1px solid rgba(175, 89, 203, 0.3)", borderRadius: 1 }}
      >
        <UserRegistrationAreaChart />
      </Grid>

      {/* Body mass index (IMC) trends over time */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ border: "1px solid rgba(175, 89, 203, 0.3)", borderRadius: 1 }}
      >
        <ImcLineChart />
      </Grid>

      {/* Distribution of ingredient usage */}
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{ border: "1px solid rgba(175, 89, 203, 0.3)", borderRadius: 1 }}
      >
        <IngredientPieChart />
      </Grid>

      {/* Age range of registered users */}
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{ border: "1px solid rgba(175, 89, 203, 0.3)", borderRadius: 1 }}
      >
        <UserAgeRangeBarChart />
      </Grid>

      {/* Gender distribution among users */}
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{
          border: "1px solid rgba(175, 89, 203, 0.3)",
          borderRadius: 1,
          padding: 2,
        }}
      >
        <SexPieChart />
      </Grid>
    </Grid>
  );
};

export default HomePage;
