import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { fetchProduct } from "@/lib/api";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCartStore();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="h-96 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-10 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/" className="mt-4 inline-block text-primary underline">Go back</Link>
      </div>
    );
  }

  const hasDiscount = product.price !== product.discountedPrice;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) : 0;
  const savings = hasDiscount ? (product.price - product.discountedPrice).toFixed(2) : null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      image: product.image,
    });
    toast(`${product.title} added to cart!`);
  };

  return (
    <div className="container py-10">
      <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          <img src={product.image.url} alt={product.image.alt} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl tracking-tight text-foreground">{product.title}</h1>
          <div className="flex items-center gap-1 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-primary" : "fill-muted stroke-muted-foreground"}`} />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">$ {product.discountedPrice.toFixed(2)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">$ {product.price.toFixed(2)}</span>
                <span className="rounded bg-discount px-2 py-0.5 text-sm font-bold text-primary-foreground">
                  -{discountPercent}% (Save $ {savings})
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <Button size="lg" onClick={handleAddToCart} className="mt-2 w-full md:w-auto">
            Add to Cart
          </Button>

          {product.reviews.length > 0 && (
            <div className="mt-6 space-y-4 border-t pt-6">
              <h2 className="text-xl text-foreground">Reviews</h2>
              {product.reviews.map((r) => (
                <div key={r.id} className="rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{r.username}</span>
                    <span className="text-xs text-muted-foreground">
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
