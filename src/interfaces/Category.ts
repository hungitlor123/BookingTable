export interface ICategory {
  id: number;
  name: string;
  description: string;
  image_url: string;
  date: string;
  price: number;
  categoryId: number | null;
  createdAt: string;
  updatedAt: string;
}
