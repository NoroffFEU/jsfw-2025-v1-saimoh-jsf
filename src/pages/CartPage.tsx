import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, CirclePlus, CircleMinus } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CartPage = () => {
  const { items, removeItem, totalPrice, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const handleIncrease = (id: string, quantity: number) => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = (id: string, quantity: number) => {
    
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
      return;
    }else {
      toast("Minimum quantity is 1. To remove the item, click the trash icon.");
    }
  };


  if (items.length === 0) {
    return (
      <div className="container flex flex-col items-center gap-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-3xl text-foreground">Your cart is empty</h1>
        <p className="text-muted-foreground">Add some products to get started.</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="mb-8 text-3xl text-foreground">Shopping Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg border bg-card p-4">
            <img src={item.image.url} alt={item.image.alt} className="h-20 w-20 rounded-md object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <div className="flex items-center gap-3 mt-1">
                <button className="text-muted-foreground transition-colors hover:text-discount" onClick={() => handleDecrease(item.id, item.quantity)}>
                  <CircleMinus className="cursor-pointer h-5 w-5" />
                </button>

                <p className="text-sm text-muted-foreground">
                  Qty: {item.quantity}
                </p>

                <button className="text-muted-foreground transition-colors hover:text-discount" onClick={() => handleIncrease(item.id, item.quantity)}>
                  <CirclePlus className="cursor-pointer h-5 w-5" />
                </button>
              </div>
              <p className="text-sm font-medium text-foreground mt-4">$ {(item.discountedPrice * item.quantity).toFixed(2)}</p>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-muted-foreground transition-colors hover:text-discount">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <span className="text-lg font-semibold text-foreground">Total: $ {totalPrice().toFixed(2)}</span>
        <Button size="lg" onClick={() => navigate("/checkout-success")}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
