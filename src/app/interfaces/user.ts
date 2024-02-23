export interface User {
  _id: String;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  admin: boolean;
  confirmed: boolean;
}
