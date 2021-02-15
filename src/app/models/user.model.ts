import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
export class User {
  constructor(
    public email: string,
    public password?: string,
    public name?: string,
    public id?: number,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public img?: string
  ) {}

  get getImagen() {
    if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }
}
