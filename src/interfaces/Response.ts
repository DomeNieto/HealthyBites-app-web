import { User } from "./User";

export interface BaseResponse<T> {
  timestamp: string;
  message: string;
  code: number;
  data: T;
}
export interface AuthResponse {
  accessToken: string;
  tokenType: string;
}

export interface DataUsersResponse extends BaseResponse<{ users: User[] }> {}

export interface DataUserResponse extends BaseResponse<{ user: User }> {}
