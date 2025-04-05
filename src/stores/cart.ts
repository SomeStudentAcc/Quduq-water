/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface ICartStore {
  cart: { id: string; amount: number }[];
  setCart: (cart: { id: string; amount: number }[]) => void;
  allProds: any[];
  setAllProds: (prods: any[]) => void;
  addToCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  deleteFromCart: (id: number) => void;
}

export const useCart = create<ICartStore>((set) => ({
  cart: [],
  allProds: [],
  setCart: (cart: { id: string; amount: number }[]) =>
    set({ cart: cart }),
  setAllProds: (prods: any[]) => set({ allProds: prods }),

  addToCart: (id: number) => {
    set((state) => {
      const product = state.allProds.find(
        (prod: any) => prod.id.toString() == id.toString()
      );

      if (!product) return state;

      const productInCart = state.cart.find(
        (item) => item.id.toString() == id.toString()
      );
      console.log(productInCart);

      if (productInCart) {
        const newCart = state.cart.map((item) =>
          item.id.toString() === id.toString()
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        localStorage.setItem("q_cart", JSON.stringify(newCart));

        return {
          cart: state.cart.map((item) =>
            item.id.toString() === id.toString()
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      } else {
        const newCart = [...state.cart, { id, amount: 1 }];
        localStorage.setItem("q_cart", JSON.stringify(newCart));

        return {
          cart: [...state.cart, { id, amount: 1 }],
        };
      }
    });
  },

  increaseQuantity: (id: number) => {
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.id.toString() === id.toString()
          ? { ...item, amount: item.amount + 1 }
          : item
      );
      localStorage.setItem("q_cart", JSON.stringify(newCart));

      return {
        cart: newCart,
      };
    });
  },

  decreaseQuantity: (id: number) => {
    set((state) => {
      const newCart = state.cart
        .map((item) =>
          item.id.toString() === id.toString() 
            ? { ...item, amount: item.amount > 0 ? item.amount - 1 : 0 }
            : item
        )
        .filter((item) => item.amount > 0); 

      localStorage.setItem("q_cart", JSON.stringify(newCart));

      return {
        cart: newCart,
      };
    });
  },
  deleteFromCart: (id: number) => {
    set((state) => {
      const newCart = state.cart.filter((item) => item.id.toString() !== id.toString());
      localStorage.setItem("q_cart", JSON.stringify(newCart));

      return {
        cart: newCart,
      };
    });
  },
}));
