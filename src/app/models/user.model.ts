export class User {
  constructor(
    public email: string,
    public fullName?: string,
    public id?: number,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public img?: string
  ) {}
}
