import { UserRole } from "../enums/UserRole";


export class User {
  
  public readonly id?: string;
  public readonly name: string;
  public readonly email: string;
  private readonly passwordHash: string;
  public readonly role: UserRole;
  public readonly createdAt: Date;

  constructor(params: {
    name: string;
    email: string;
    passwordHash: string;
    role:UserRole
    id?: string;
    createdAt?: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.passwordHash = params.passwordHash;
    this.role = params.role;
    this.createdAt = params.createdAt ?? new Date();
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  getRol(): UserRole {
    return this.role
  }
}
