export interface CreateUserRequest {
  firstname: string;
  lastname: string;
  email: string;
  username?: string;
  avatar: string;
  password: string;
  isAdmin: boolean;
}
