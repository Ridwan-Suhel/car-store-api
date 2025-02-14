// creating type/interface for car 
export interface ICar {
    name?: string;
    image?: string;
    isOnSale?: boolean;
    featured?: boolean;
    brand: string;
    model: string;
    year: number;
    price: number;
    category: "Sedan" | "SUV" | "Hatchback" | "Electric SUV" | "Truck" | "Coupe" | "Convertible";
    description: string;
    inStock: boolean;
    quantity: number;
  }