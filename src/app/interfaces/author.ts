export interface Author {
  _id: string;
  id: Number;
  firstName: string;
  lastName: string;
  dob?: Date;
  bio?: string;
  image?: File;
}

export default Author;
