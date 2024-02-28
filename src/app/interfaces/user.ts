import { Book } from "./book";

export interface User {
  _id: string; 
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  books: Book[]; 
  admin: boolean;
  image?:string
  confirmed: boolean;
}
