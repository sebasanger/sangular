export interface UserCreateUpdatePayload {
  fullName: string;
  email: string;
  roles: string[];
  urlRedirect: string;
  id?: number;
}
