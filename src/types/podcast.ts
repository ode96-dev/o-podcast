export interface Episode {
  id: string;
  slug: string;
  number: number;
  season: number;
  title: string;
  subtitle: string;
  description: string;
  publishedAt: string;
  duration: string;
  durationSeconds: number;
  category:
    | "Culture & Identity"
    | "Tech & Innovation"
    | "Music & Sonic Arts"
    | "Deep Dive";
  audioUrl: string;
  artwork: string;
  featured?: boolean;
  guests: {
    name: string;
    role: string;
    bio: string;
    twitter?: string;
  }[];
  showNotes: {
    intro: string;
    timestamps: { time: string; title: string; seconds: number }[];
    takeaways: string[];
    resources: { title: string; url: string }[];
  };
  quote?: {
    text: string;
    author: string;
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: "Apparel" | "Audio Edition" | "Objects";
  featured?: boolean;
  availabilityNote?: string;
  images: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  details: string[];
  inventory: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Host {
  name: string;
  role: string;
  bio: string;
  twitter: string;
  city: string;
}

export interface TourDate {
  id: string;
  city: string;
  country: string;
  venue: string;
  date: string;
  time: string;
  status: "On Sale" | "Limited" | "Sold Out";
  ticketPrice: number;
}
