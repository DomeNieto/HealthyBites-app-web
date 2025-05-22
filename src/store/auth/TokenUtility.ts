import { TokenPayload } from "../../interfaces/Auth";

// Save the token in either localStorage or sessionStorage based on session preference
export const saveToken = (token: string, keepSession: boolean) => {
  if (keepSession) {
    localStorage.setItem("authToken", token);
  } else {
    sessionStorage.setItem("authToken", token);
  }
};

// Save the user's role (rol) based on session preference
export const saveRol = (rol: string, keepSession: boolean) => {
  if (keepSession) {
    localStorage.setItem("authRol", rol);
  } else {
    sessionStorage.setItem("authRol", rol);
  }
};

// Load token from either localStorage or sessionStorage
export const loadToken = () => {
  return (
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  );
};

// Load user role from either localStorage or sessionStorage
export const loadRolId = () => {
  return localStorage.getItem("authRol") || sessionStorage.getItem("authRol");
};

// Save the user's email based on session preference
export const saveEmail = (email: string, keepSession: boolean) => {
  if (keepSession) {
    localStorage.setItem("authEmail", email);
  } else {
    sessionStorage.setItem("authEmail", email);
  }
};

// Load user email from either localStorage or sessionStorage
export const loadEmail = () => {
  return (
    localStorage.getItem("authEmail") || sessionStorage.getItem("authEmail")
  );
};

// Clear token, role, and email from both localStorage and sessionStorage
export const clearTokenAndRol = () => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  localStorage.removeItem("authRol");
  sessionStorage.removeItem("authRol");
  localStorage.removeItem("authEmail");
  sessionStorage.removeItem("authEmail");
};

// Decode a JWT token and return its payload
export const decodeJwt = (token: string) => {
  const payloadBase64 = token.split(".")[1];
  const decodedPayload = atob(payloadBase64);
  const payload: TokenPayload = JSON.parse(decodedPayload);
  return payload;
};
