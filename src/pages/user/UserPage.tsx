import { Container, Stack } from "@mui/material";
import GenericStickyTable from "../../components/table/Table";
import { useGetAllUsersQuery } from "../../store/users/UserApi";
import { dataHeaderUsers } from "./HeaderColumns";
import { User } from "../../interfaces/User";
import ActionButtons from "../../components/acctionButtons/ActionsButtons";
import { useNavigate } from "react-router";
import SpinnerIsLoading from "../../components/loading/SpinnerLoading";
import FilterSearch from "../../components/filter/filterSearch/FilterSearch";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredUsers, setUsers } from "../../store/users/UserSlice";
import { useEffect } from "react";
import FilterDate from "../../components/filter/filterDate/FilterDate";
import FilterNumber from "../../components/filter/filterNumber/FilterNumber";
import { resetUtilityState } from "../../store/utilities/UtitlitySlice";

// User page
const UserPage = () => {
  // Fetch all users data and loading state from the API
  const { data, isLoading } = useGetAllUsersQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select filtered users from the Redux store
  const users = useSelector(selectFilteredUsers);

  // Filter out the user with id=1 and update Redux store
  useEffect(() => {
    if (data) {
      const filteredData = data.filter((user) => user.id !== 1);
      dispatch(setUsers(filteredData));
    }
    dispatch(resetUtilityState());
  }, [data, dispatch]);

  // Navigate to user details page when "View Details" is clicked
  const handleViewDetails = (row: User) => {
    navigate(`/users/${row.id}`);
  };

  // Define action buttons for each user row, here only "View Details"
  const actions = (row: User) => (
    <ActionButtons handleShowDetails={() => handleViewDetails(row)} />
  );

  // Show loading spinner while fetching users
  if (isLoading) {
    return <SpinnerIsLoading />;
  }

  return (
    <Container>
      {/* Filters for searching users by name/sex, registration date, and BMI */}
      <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
        <FilterSearch field="Nombre o Sexo" />
        <FilterDate field="Fecha de alta" />
        <FilterNumber field="IMC" />
      </Stack>

      {/* Table displaying filtered users with action buttons */}
      <GenericStickyTable<User>
        columns={dataHeaderUsers()}
        data={users}
        rowKey="id"
        actions={actions}
      />
    </Container>
  );
};

export default UserPage;
