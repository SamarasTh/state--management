export interface Product {
  id: string;
  title: string;
  price: number;
  images: Image[];
}

export interface ProductResponse {
  products: Product[];
}

export interface Image{
  image:string;
}
