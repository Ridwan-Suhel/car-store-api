import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../shared/appError";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";


const auth = (...requiredRole: TUserRole[]) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            // Extract the token from the Authorization header
            const token = req.headers.authorization;
            if (!token) {
                throw new AppError(401, "You are not logged in.");
            }

            // Verify the token
            const secretKey = config.jwt_access_secret;
            jwt.verify(token, secretKey as string, function(err, decoded) {
                if(err){
                    throw new AppError(401, "You are not authorized");
                }

                const role = (decoded as JwtPayload)?.role
                if(requiredRole && !requiredRole.includes(role)){
                    throw new AppError(401, "You are not authorized to access.");
                }

                req.user = decoded as JwtPayload;
                next();
              });
            // Proceed to the next 
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return next(new AppError(401, "Invalid or expired token"));
            }
            return next(error);
        }
    };
};

export default auth;
