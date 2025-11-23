export interface Product {
  id: string;
  title: string;
  price: number;
  imageurl: string;
}

export interface ProductResponse {
  products: Product[];
}
