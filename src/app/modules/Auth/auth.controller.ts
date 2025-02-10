/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express"
import { AuthService } from "./auth.service"
import { AppError } from "../../shared/appError";

const LoginUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.LoginUser(req.body);
        res.status(200).json({
            success: true,
            message: "Login successful",
            statusCode: 200,
            data: result,
        })

    }
    catch(error: unknown | AppError | any){
        if(error.issues){
            const { message } = error.issues[0];
            const errorFormat = {
                success: false,
                message: message ? message : "Validation error",
                statusCode: 400,
                error: { 
                    details: error.issues[0]
                 },
                stack: `Error: Something went wrong \n ${(error as Error).stack}`,
              };
            res.status(400).json(errorFormat);
        }
        if (error instanceof AppError) {
            // Format the response for AppError
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: {
                    statusCode: error.statusCode,
                },
            });
        } else {
            res.status(500).json({
                success: false,
                message: "An unexpected error occurred",
                error: {
                    details: error,
                },
            });
        }
    }

        // else{
        //     console.log(error.message)
        //     res.status(400).json(
        //         error
        //     );
        // }
}
export const AuthController = {
    LoginUser
}