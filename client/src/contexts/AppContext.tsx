import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import type { User, Booking, Order, CartItem, Pooja, Kit } from "@shared/schema";

interface AppState {
  user: User | null;
  bookings: Booking[];
  orders: Order[];
  cart: CartItem[];
  selectedPooja: Pooja | null;
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "ADD_BOOKING"; payload: Booking }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_SELECTED_POOJA"; payload: Pooja }
  | { type: "LOAD_PERSISTED_DATA"; payload: Partial<AppState> };

const initialState: AppState = {
  user: null,
  bookings: [],
  orders: [],
  cart: [],
  selectedPooja: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "ADD_BOOKING":
      return { ...state, bookings: [...state.bookings, action.payload] };
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(item => item.kitId === action.payload.kitId);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.kitId === action.payload.kitId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "SET_SELECTED_POOJA":
      return { ...state, selectedPooja: action.payload };
    case "LOAD_PERSISTED_DATA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("poojaPathUser");
    const savedBookings = localStorage.getItem("poojaPathBookings");
    const savedOrders = localStorage.getItem("poojaPathOrders");
    const savedCart = localStorage.getItem("poojaPathCart");

    const persistedData: Partial<AppState> = {};

    if (savedUser) {
      try {
        persistedData.user = JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse saved user:", e);
      }
    }

    if (savedBookings) {
      try {
        persistedData.bookings = JSON.parse(savedBookings);
      } catch (e) {
        console.error("Failed to parse saved bookings:", e);
      }
    }

    if (savedOrders) {
      try {
        persistedData.orders = JSON.parse(savedOrders);
      } catch (e) {
        console.error("Failed to parse saved orders:", e);
      }
    }

    if (savedCart) {
      try {
        persistedData.cart = JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to parse saved cart:", e);
      }
    }

    if (Object.keys(persistedData).length > 0) {
      dispatch({ type: "LOAD_PERSISTED_DATA", payload: persistedData });
    }
  }, []);

  // Persist data changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("poojaPathUser", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("poojaPathUser");
    }
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem("poojaPathBookings", JSON.stringify(state.bookings));
  }, [state.bookings]);

  useEffect(() => {
    localStorage.setItem("poojaPathOrders", JSON.stringify(state.orders));
  }, [state.orders]);

  useEffect(() => {
    localStorage.setItem("poojaPathCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
