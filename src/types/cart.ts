export interface ProductImage {
  url: string;
  alt: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  image: ProductImage;
  quantity: number;
}

export type CartProduct = Omit<CartItem, "quantity">;

export interface CartStore {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}