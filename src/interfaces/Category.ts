export interface ICategory {
  id: number;
  name: string;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
}
export interface ICategoryTree {
  id: number;
  name: string;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  subcategories: ICategory[]; // Add this line
}
