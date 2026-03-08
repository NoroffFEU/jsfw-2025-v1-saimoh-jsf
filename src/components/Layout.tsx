import { Link, Outlet } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/cartStore";

const Layout = () => {
  const { totalItems } = useCartStore();
  
  return (
    
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="font-serif text-2xl tracking-tight text-foreground">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Home
            </Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </Link>
            <Link to="/cart" className="relative flex items-center text-muted-foreground transition-colors hover:text-foreground">
              <ShoppingCart className="h-5 w-5" />
              {totalItems() > 0 && (
                <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {totalItems()}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} eCom Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
