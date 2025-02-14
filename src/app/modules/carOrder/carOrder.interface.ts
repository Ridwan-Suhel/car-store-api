import { Types } from "mongoose";

export interface ICarOrder {
    email: string;
    car: Types.ObjectId; 
    user: Types.ObjectId;
    quantity: number;
    totalPrice: number;
    status?: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
    transaction?: {
        id?: string;
        transactionStatus?: string;
        bank_status?: string;
        sp_code?: string;
        sp_message?: string;
        method?: string;
        date_time?: string;
  }
}
