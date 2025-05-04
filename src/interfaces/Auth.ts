export interface Auth {
  token: string | null;
  role: string | null;
  email: string | null;
}

export interface AuthBody {
  email: string;
  password: string;
}

export interface TokenPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}
