import { User } from 'src/app/models/user.model';

export interface LoginResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  user: User;
}
