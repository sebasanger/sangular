export class User {
  constructor(
    public email: string,
    public fullName: string,
    public roles: string[],
    public id?: number,
    public img?: string
  ) {}
}
