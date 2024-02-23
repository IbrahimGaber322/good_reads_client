export interface Book {
  _id: string;
  name: string;
  author: string;
  category: string;
  rating: Rating[];
  description: string;
  status: 'Want to read' | 'Read' | 'Currently Reading';
  image?: string;
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