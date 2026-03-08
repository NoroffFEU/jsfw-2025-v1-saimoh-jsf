import { create } from "zustand";
import type { CartStore, CartItem, CartProduct } from "@/types/cart";

const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product: CartProduct) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        const updatedItems = state.items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );

        return { items: updatedItems };
      }

      const newItem: CartItem = { ...product, quantity: 1 };
      return { items: [...state.items, newItem] };
    }),

  removeItem: (id: string) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  updateQuantity: (id: string, quantity: number) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((i) => i.id !== id),
        };
      }

      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        ),
      };
    }),

  clearCart: () => set({ items: [] }),

  totalItems: () => {
    return get().items.reduce((sum, i) => sum + i.quantity, 0);
  },

  totalPrice: () => {
    return get().items.reduce(
      (sum, i) => sum + i.discountedPrice * i.quantity,
      0
    );
  },
}));

export default useCartStore;