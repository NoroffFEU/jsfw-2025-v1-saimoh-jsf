interface Review {
  id: string;
  username: string;
  rating: number;
  description: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: { url: string; alt: string };
  rating: number;
  tags: string[];
  reviews: Review[];
}

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  image: { url: string; alt: string };
  rating: number;
}

export type { Product, Review, ProductCardProps };