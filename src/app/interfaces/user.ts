import { Book } from "./book";

export interface User {
  _id: String;
  id: Number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  books: Array<{
    bookId: Book;
    shelve: "Want to read" | "Read" | "Currently Reading";
  }>; 
  admin: boolean;
  image?:string
  confirmed: boolean;
}
