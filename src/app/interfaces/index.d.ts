import { IUser } from "../modules/user/user.interface";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload
  }
    interface Request {
      user: IUser;
    }
    
  }
}
