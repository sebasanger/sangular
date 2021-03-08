export interface LoginResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  email: string;
  fullName: string;
  roles: string;
}
