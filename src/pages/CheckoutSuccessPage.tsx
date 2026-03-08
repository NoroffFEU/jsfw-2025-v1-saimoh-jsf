import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import { Button } from "@/components/ui/button";

const CheckoutSuccessPage = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container flex flex-col items-center gap-6 py-20 text-center">
      <CheckCircle className="h-20 w-20 text-success" />
      <h1 className="text-4xl text-foreground">Order Successful!</h1>
      <p className="max-w-md text-muted-foreground">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link to="/">
        <Button size="lg">Back to Store</Button>
      </Link>
    </div>
  );
};

export default CheckoutSuccessPage;
