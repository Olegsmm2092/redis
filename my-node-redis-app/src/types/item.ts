export interface Item {
  id: string;
  model: string;
  color: string;
  year: string;
  likes: string;  // Redis stores as strings
}
