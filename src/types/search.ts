interface Product {
  id: string;
  title: string;
  image: { url: string; alt: string };
  discountedPrice: number;
}

interface SearchBarProps {
  products: Product[];
}

export type { Product, SearchBarProps };