import type { ProductCardProps } from "@/types/product";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, title, price, discountedPrice, image, rating }: ProductCardProps) => {
  const hasDiscount = price !== discountedPrice;
  const discountPercent = hasDiscount ? Math.round(((price - discountedPrice) / price) * 100) : 0;

  return (
    <Link
      to={`/product/${id}`}
      className="group animate-fade-in rounded-lg border bg-card p-3 transition-shadow hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden rounded-md bg-muted">
        <img
          src={image.url}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-sans text-sm font-semibold leading-tight text-foreground">{title}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-primary text-primary" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < rating ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-foreground">
            $ {discountedPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xs text-muted-foreground line-through">$ {price.toFixed(2)}</span>
              <span className="rounded bg-discount px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
