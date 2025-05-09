import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateImc } from "../../pages/user/HeaderColumns";
import { InfoUser, User } from "../../interfaces/User";
import { RootState } from "../store";
import { selectUtilityFilter } from "../utilities/UtitlitySlice";

export interface UserState {
  users: User[];
  currentUser: User;
}

const initialCurrentInfoUserState: InfoUser = {
  id: 0,
  height: 0,
  weight: 0,
  activityLevel: "",
};

const initialCurrentUserState: User = {
  id: 0,
  name: "",
  email: "",
  registrationDate: "",
  infoUser: initialCurrentInfoUserState,
};

const initialState: UserState = {
  users: [],
  currentUser: initialCurrentUserState,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload.map((user) => ({ ...user, isNew: false }));
    },
    resetUsers(state) {
      state.users = [];
    },
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = { ...action.payload };
    },
    resetCurrentUser(state) {
      state.currentUser = initialCurrentUserState;
    },
  },
});

export const { setUsers, resetUsers, setCurrentUser, resetCurrentUser } =
  usersSlice.actions;

export default usersSlice.reducer;

export const selectUsersData = (state: RootState) => state.users.users;
export const selectCurrentUserData = (state: RootState) =>
  state.users.currentUser;

export const selectFilteredUsers = createSelector(
  [selectUsersData, selectUtilityFilter],
  (users, filter) => {
    const text = filter?.searchText?.toLowerCase() || "";
    const date = filter?.searchDate?.toLowerCase() || "";
    const number = filter?.searchNumber || "";

    return users.filter((user: User) => {
      const nameMatch = text
        ? (user.name?.toLowerCase() || "").includes(text)
        : true;

      const dateMatch = date
        ? new Date(user.registrationDate) > new Date(date)
        : true;

      const imc = calculateImc(user);
      const imcMatch = number
        ? imc !== null && imc.toString().includes(number)
        : true;

      return nameMatch && dateMatch && imcMatch;
    });
  }
);
