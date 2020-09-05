export type Products = {
  products: {
    list: Product[];
  };
};

export type ProductList = {
  list: Product[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  images: Image[];
  sizes: Size[];
};

type TypeAction = 'ADD_PRODUCT' | 'FETCH_PRODUCT' | 'DELETE_PRODUCT';
export type Action = {
  type: TypeAction;
  payload: Data[];
};

export type Data = {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  gender?: string;
  price?: number;
  images?: Image[];
  sizes?: Size[];
  created_at?: firebase.firestore.Timestamp;
  updated_at?: firebase.firestore.Timestamp;
};

export type Image = {
  id: string;
  path: firebase.storage.UploadTaskSnapshot;
};

export type Size = {
  size: string;
  quantity: string;
};
