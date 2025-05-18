export interface InfoUser {
  id: number;
  height: number;
  weight: number;
  sex: string;
  age: number;
  activityLevel: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  infoUser: InfoUser;
}
