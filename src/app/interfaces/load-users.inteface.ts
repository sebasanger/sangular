import { GetUsers } from './get-users';

export interface LoadUsers {
  total: number;
  users: GetUsers[];
  show: number;
}
