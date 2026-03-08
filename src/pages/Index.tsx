import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import { fetchProducts } from "@/lib/api";


const Index = () => {
    const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="container py-10">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl tracking-tight text-foreground md:text-5xl">Our Products</h1>
        <p className="max-w-lg text-muted-foreground">Browse our curated collection of quality items.</p>
        <SearchBar products={products} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
