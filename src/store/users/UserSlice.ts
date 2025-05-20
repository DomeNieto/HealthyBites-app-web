import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InfoUser, User } from "../../interfaces/User";
import { RootState } from "../store";
import { selectUtilityFilter } from "../utilities/UtitlitySlice";
import { calculateImc, getAgeRange, getImcCategory } from "./UtitilitySelector";
import { AccInterface, SexCount } from "../../interfaces/Selector";

export interface UserState {
  users: User[];
  currentUser: User;
}

const initialCurrentInfoUserState: InfoUser = {
  id: 0,
  height: 0,
  weight: 0,
  sex: "",
  age: 0,
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

// Selectors
export const selectFilteredUsers = createSelector(
  [selectUsersData, selectUtilityFilter],
  (users, filter) => {
    const text = filter?.searchText?.toLowerCase() || "";
    const date = filter?.searchDate?.toLowerCase() || "";
    const number = filter?.searchNumber || "";

    return users.filter((user: User) => {
      const nameMatch = text
        ? user.name?.toLowerCase().includes(text) ||
          user.infoUser.sex?.toLowerCase().includes(text)
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

export const selectUserCountByAgeRange = createSelector(
  [selectUsersData],
  (users) => {
    const ranges: AccInterface = {
      "0-18": 0,
      "19-30": 0,
      "31-45": 0,
      "46-60": 0,
      "60+": 0,
    };

    users.forEach((user) => {
      const age = user.infoUser?.age;

      if (age) {
        const range = getAgeRange(age);
        ranges[range]++;
      }
    });

    return ranges;
  }
);

export const selectUserCountBySex = createSelector(
  [selectUsersData],
  (users) => {
    return users.reduce((acc: SexCount, user) => {
      const sex = user.infoUser?.sex;

      if (sex) {
        acc[sex as keyof SexCount] = (acc[sex as keyof SexCount] || 0) + 1;
      }
      return acc;
    }, {});
  }
);

export const selectUserCountByImcCategory = createSelector(
  [selectUsersData],
  (users) => {
    return users.reduce((acc: AccInterface, user) => {
      const height = user.infoUser?.height;
      const weight = user.infoUser?.weight;

      if (
        typeof height === "number" &&
        typeof weight === "number" &&
        height > 0
      ) {
        const imc = calculateImc(user);
        const category = getImcCategory(Number(imc));
        acc[category] = (acc[category] || 0) + 1;
      }

      return acc;
    }, {});
  }
);

export const selectUserRegistrationByMonth = createSelector(
  [selectUsersData],
  (users) => {
    const currentYear = new Date().getFullYear();
    const initialData: AccInterface = {};

    for (let i = 1; i <= 12; i++) {
      const month = String(i).padStart(2, "0");
      const key = `${currentYear}-${month}`;
      initialData[key] = 0;
    }

    users.forEach((user) => {
      if (user.registrationDate) {
        const date = new Date(user.registrationDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const key = `${year}-${month}`;

        if (year === currentYear) {
          initialData[key] = (initialData[key] || 0) + 1;
        }
      }
    });

    return initialData;
  }
);
