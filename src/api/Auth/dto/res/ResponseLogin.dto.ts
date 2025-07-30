interface Token {
  accessToken: string;
  refreshToken: string;
}
export interface User {
  id: string; // Từ BaseEntity
  createdAt: Date; // Từ BaseEntity
  updatedAt: Date; // Từ BaseEntity
  firstName: string | null;
  lastName: string | null;
  userName: string;
  email: string | null;
  avatar: string | null;
  phoneNumber: string;
  passWord: string;
  oldPassword: string | null;
  isBanned: boolean;
}
interface Info {
  user: User;
}
export interface ResponseLoginDTO {
  info: Info;
  token: Token;
}
