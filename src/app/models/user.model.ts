export class User {
  public email: string;
  public fullName: string;
  public id: number;
  public roles: string[];
  public img: string;

  constructor(user: UserObj) {
    this.id = (user && user.id) || null;
    this.email = (user && user.email) || null;
    this.fullName = (user && user.fullName) || null;
    this.roles = (user && user.roles) || null;
    this.img = (user && user.img) || null;
  }
}

interface UserObj {
  id: number;
  email: string;
  fullName: string;
  roles: string[];
  img: string;
}
