export interface Book {
  _id:string;
  name: string;
  author: string;
  category: string;
  rating: number;
  description?: string;
  status: 'Want to read' | 'Read' | 'Currently Reading';
  image?: string;
  reviews?: string[];
  clicks: number;
}

export default Book;
