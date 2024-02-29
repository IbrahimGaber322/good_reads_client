import Author from './author';
import { Category } from './category';

export interface Book {
  _id: string;
  id: Number;
  name: string;
  author: Author;
  category: Category;
  rating: Rating[];
  description: string;
  status: 'Want to read' | 'Read' | 'Currently Reading';
  image?: File;
  reviews: Review[];
  clicks?: number;
  shelve?: 'Want to read' | 'Read' | 'Currently Reading';
}
export interface Rating {
  rating: number;
  userId: string;
}

interface Review {
  username: string;
  comment: string;
}
