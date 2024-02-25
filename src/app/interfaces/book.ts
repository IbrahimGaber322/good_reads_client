import Author from "./author";
import { Category } from "./category";

export interface Book {
  _id: string;
  name: string;
  author: Author;
  category: Category;
  rating: Rating[];
  description: string;
  status: 'Want to read' | 'Read' | 'Currently Reading';
  image?: File;
  reviews: Review[];
  clicks?: number;
}
export interface Rating {
  rating: number;
  userId: string; 
}

interface Review {
  username: string;
  comment: string;
}