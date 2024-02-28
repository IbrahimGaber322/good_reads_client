export interface User {
  _id: String;
  id: Number;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  admin: boolean;
  confirmed: boolean;
}
