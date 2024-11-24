// creating type/interface for car 
export interface ICar {
    brand: string;
    model: string;
    year: number;
    price: number;
    category: "Sedan" | "SUV" | "Truck" | "Coupe" | "Convertible";
    description: string;
    inStock: boolean;
    quantity: number;
  }