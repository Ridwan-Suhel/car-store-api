/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import UserValidationSchema from "./user.validation";
import { UserServices } from "./user.services";
import { AppError } from "../../shared/appError";


const createUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        //validating schema by using zod
        const parseValidateData = UserValidationSchema.parse(payload);
        const result = await UserServices.createUserIntoDb(parseValidateData);
        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            statusCode: 201,
            data: result,
          });
    }
    
    catch(error: unknown | any){
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
        else if (error.code === 11000) {
            const errorFormat = {
                success: false,
                message: `Duplicate ${Object.keys(error.keyValue)[0]}: ${Object.values(error.keyValue)[0]} found`,
                statusCode: 400,
                error: { 
                    details: error.errorResponse
                 },
                stack: `Error: Something went wrong \n ${(error as Error).stack}`,
              };
            res.status(400).json(errorFormat); 
        }
        else{
            res.status(400).json(error);
        }
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getUserFromDb();
        res.status(200).json({
            status: true,
            message: 'Users retrieved successfully',
            data: result,
          });

    }
   
    catch(error: unknown | any){
        res.status(200).json({
            status: false,
            message: 'Something went wrong',
            error: error,
          });
    }

}

const BlockUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const userId = req.params?.userId;

    await UserServices.blockSingleUserIntoDb(userId, payload);
    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
    //   data: result,
    });
  } catch (error: unknown | any) {
    if (error.issues) {
      const { message } = error.issues[0];
      const errorFormat = {
        success: false,
        message: message ? message : 'Validation error',
        statusCode: 400,
        error: {
          details: error.issues[0],
        },
        stack: `Error: Something went wrong \n ${(error as Error).stack}`,
      };
      res.status(400).json(errorFormat);
    }
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
          success: false,
          message: error.message,
          error: {
              statusCode: error.statusCode,
          },
      });
  } else {
      res.status(400).json(error);
    }
  }
};

export const UserController = {
    createUser,
    getAllUsers,
    BlockUser
} 