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

const UserPage = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(selectFilteredUsers);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter((user) => user.id !== 1);
      dispatch(setUsers(filteredData));
    }
  }, [data, dispatch]);

  const handleViewDetails = (row: User) => {
    navigate(`/users/${row.id}`);
  };

  const actions = (row: User) => (
    <ActionButtons handleShowDetails={() => handleViewDetails(row)} />
  );

  if (isLoading) {
    return <SpinnerIsLoading />;
  }

  return (
    <Container>
      <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
        <FilterSearch field="Nombre o Sexo" />
        <FilterDate field="Fecha de alta" />
        <FilterNumber field="IMC" />
      </Stack>

      <GenericStickyTable<User>
        columns={dataHeaderUsers()}
        data={users}
        rowKey="id"
        actions={actions}
        maxHeight={400}
      />
    </Container>
  );
};

export default UserPage;
