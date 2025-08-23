import { z } from "zod";

// User schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
});

// Pooja schema
export const poojaSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  duration: z.string().optional(),
});

// Pandit schema
export const panditSchema = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.number(),
  reviews: z.number(),
  experience: z.string(),
  specialties: z.array(z.string()),
  availability: z.string(),
  image: z.string(),
});

// Kit schema
export const kitSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  inStock: z.boolean(),
  category: z.string(),
});

// Booking schema
export const bookingSchema = z.object({
  id: z.string(),
  poojaId: z.string(),
  poojaName: z.string(),
  customerName: z.string(),
  phoneNumber: z.string(),
  date: z.string(),
  time: z.string(),
  address: z.string(),
  specialRequirements: z.string().optional(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
  amount: z.number(),
  createdAt: z.string(),
});

// Order schema
export const orderSchema = z.object({
  id: z.string(),
  items: z.array(z.object({
    kitId: z.string(),
    kitName: z.string(),
    quantity: z.number(),
    price: z.number(),
  })),
  totalAmount: z.number(),
  status: z.enum(["pending", "confirmed", "shipped", "delivered"]),
  createdAt: z.string(),
  deliveryAddress: z.string().optional(),
});

// Cart item schema
export const cartItemSchema = z.object({
  id: z.string(),
  kitId: z.string(),
  kitName: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string(),
});

// Insert schemas
export const insertBookingSchema = bookingSchema.omit({ id: true, createdAt: true });
export const insertOrderSchema = orderSchema.omit({ id: true, createdAt: true });

// Types
export type User = z.infer<typeof userSchema>;
export type Pooja = z.infer<typeof poojaSchema>;
export type Pandit = z.infer<typeof panditSchema>;
export type Kit = z.infer<typeof kitSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type Order = z.infer<typeof orderSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
