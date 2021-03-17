export class User {
  public email: string;
  public fullName: string;
  public id: number;
  public role: 'ADMIN_ROLE' | 'USER_ROLE';
  public img: string;

  constructor(user: UserObj) {
    this.id = (user && user.id) || null;
    this.email = (user && user.email) || null;
    this.fullName = (user && user.fullName) || null;
    this.role = (user && user.role) || null;
    this.img = (user && user.img) || null;
  }
}

interface UserObj {
  id: number;
  email: string;
  fullName: string;
  role: 'ADMIN_ROLE' | 'USER_ROLE';
  img: string;
}
