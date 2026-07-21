export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  description: string;
  highlights: string[];
  inStock: boolean;
  colors?: string[];
  deliveryDays?: number;
  freeDelivery?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: CartItem[];
  total: number;
}

export interface Address {
  fullName: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  address: string;
}

export interface NavCategory {
  name: string;
  slug: string;
  icon: string;
  subcategories: { label: string; href: string }[];
}
