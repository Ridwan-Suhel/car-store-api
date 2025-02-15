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

const BlockUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body;
    const userId = req.params?.userId;

    await UserServices.blockSingleUserIntoDb(userId, payload);

    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
    });
  } catch (error: unknown | any) {
    let errorResponse = {
      success: false,
      message: 'Something went wrong',
      statusCode: 500,
      error: {},
    };

    if (error.issues) {
      const { message } = error.issues[0];
      errorResponse = {
        success: false,
        message: message || 'Validation error',
        statusCode: 400,
        error: { details: error.issues[0] },
      };
    } else if (error instanceof AppError) {
      errorResponse = {
        success: false,
        message: error.message,
        statusCode: error.statusCode,
        error: { statusCode: error.statusCode },
      };
    }

    res.status(errorResponse.statusCode).json(errorResponse);
  }
};

// get single user controller start from here
const getSingleUser = async (req: Request, res: Response) => {
  try {
    // taking params from req  
    const { userId } = req.params;
    // calling service function for singlecar 
    const result = await UserServices.getSingleUserFromDB(userId);

    // sending success response to client 
    res.status(200).json({
      status: true,
      message: 'User retrieved successfully',
      data: result,
    });
  } catch (err) {
    // sending default error 
    res.status(200).json({
      status: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    // taking car id from req paramas 
    const { userId } = req.params;
    // storing payload data from body request 
    const payload = req.body;
    // calling service function update single car 
    const result = await UserServices.updateSingleUserIntoDb(userId, payload);

    //sending success response to the client 
    res.status(200).json({
      status: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err) {
    // sending error response to the client 
    res.status(200).json({
      status: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// update single user by password 
const updateSingleUserByPassword = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Call service function to update password
    const result = await UserServices.updateSingleUserByPasswordIntoDb(userId, oldPassword, newPassword);

    // Send success response
    res.status(200).json({
      status: true,
      message: result.message,
    });
  } catch (err: any) {
    res.status(400).json({
      status: false,
      message: err.message || 'Something went wrong',
    });
  }
};


export const UserController = {
    createUser,
    getAllUsers,
    BlockUser,
    getSingleUser,
    updateSingleUser,
    updateSingleUserByPassword
} 