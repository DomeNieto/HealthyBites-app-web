import { TokenPayload } from "../../interfaces/Auth";

export const saveToken = (token: string, keepSession: boolean) => {
  if (keepSession) {
    localStorage.setItem("authToken", token);
  } else {
    sessionStorage.setItem("authToken", token);
  }
};
export const saveRol = (rol: string, keepSession: boolean) => {
  if (keepSession) {
    localStorage.setItem("authRol", rol);
  } else {
    sessionStorage.setItem("authRol", rol);
  }
};

export const loadToken = () => {
  return (
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  );
};

export const loadRolId = () => {
  return localStorage.getItem("authRol") || sessionStorage.getItem("authRol");
};

export const clearTokenAndRol = () => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  localStorage.removeItem("authRol");
  sessionStorage.removeItem("authRol");
};

export const decodeJwt = (token: string) => {
  const payloadBase64 = token.split(".")[1];
  const decodedPayload = atob(payloadBase64);
  const payload: TokenPayload = JSON.parse(decodedPayload);
  return payload;
};
