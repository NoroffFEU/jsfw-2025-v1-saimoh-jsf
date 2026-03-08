import { useState } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import type { SearchBarProps } from "@/types/search";


const SearchBar = ({ products }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = query.length > 0
    ? products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search products..."
          className="w-full rounded-lg border bg-card py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {focused && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border bg-popover shadow-lg">
          {filtered.slice(0, 6).map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-muted"
              onClick={() => setQuery("")}
            >
              <img src={p.image.url} alt={p.image.alt} className="h-8 w-8 rounded object-cover" />
              <span className="text-sm font-medium text-foreground">{p.title}</span>
              <span className="ml-auto text-xs text-muted-foreground">$ {p.discountedPrice.toFixed(2)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
