import { Request, Response } from 'express';
import { CarServices } from './car.service';
import CarValidationSchema from './car.validation';

// create car controller start from here
const createCar = async (req: Request, res: Response) => {
  try {
    // extracting request from body 
    const car = req.body;

    //validating schema by using zod
    const parseValidateData = CarValidationSchema.parse(car);
    // calling service function
    const result = await CarServices.createCarIntoDB(parseValidateData);
    // sending success response to client with car data
    res.status(200).json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {

    const { price } = req.body;

    // destructuring and storing the errors
    const { code, path, message, minimum } = error.issues[0];
    // formating error if the error for pricing issues. specially price when negative
    if (code === 'too_small' && path[0] === 'price') {
      const errorFormat = {
        message: 'Validation failed',
        success: false,
        error: {
          name: 'ValidationError',
          errors: {
            price: {
              message: message,
              name: 'ValidatorError',
              properties: {
                message: message,
                type: 'min',
                min: minimum,
              },
              kind: 'min',
              path: path[0],
              value: price,
            },
          },
        },
        // stack: "Error: Something went wrong\n    at app.js:23:13\n    at..."
        stack: `Error: Something went wrong \n ${(error as Error).stack}`,
      };

      //sending error response to client 
      res.status(400).json(errorFormat);
    } else {

    // sending default error response from here
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error,
      });
    }
  }
};

// get all cars and search term controller start from here
const getAllCars = async (req: Request, res: Response) => {
  try {
    // geting search term from query (expected: category/model/brand)
    const { searchTerm, category, availability, minPrice, maxPrice, model, brand} = req.query;
    // console.log("searchTerm:", searchTerm);

    // console.log(availability)
    const result = await CarServices.getAllCarsFromDB({
      searchTerm: searchTerm || "",
      category,
      availability,
      minPrice,
      maxPrice,
      model,
      brand
    });

    // sending success response to the client 
    res.status(200).json({
      status: true,
      message: 'Cars retrieved successfully',
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

// get single car controller start from here
const getSingleCar = async (req: Request, res: Response) => {
  try {
    // taking params from req  
    const { carId } = req.params;
    // calling service function for singlecar 
    const result = await CarServices.getSingleCarFromDB(carId);

    // sending success response to client 
    res.status(200).json({
      status: true,
      message: 'Car retrieved successfully',
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

// update single car controller start from here 
const updateSingleCar = async (req: Request, res: Response) => {
  try {
    // taking car id from req paramas 
    const { carId } = req.params;
    // storing payload data from body request 
    const payload = req.body;
    // calling service function update single car 
    const result = await CarServices.updateSingleCarIntoDB(carId, payload);

    //sending success response to the client 
    res.status(200).json({
      status: true,
      message: 'Car updated successfully',
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

// deleing car controller start from here 
const deleteSingleCar = async (req: Request, res: Response) => {
  try {
    // taking car id from req paramas
    const { carId } = req.params;
    // calling service function for delete single car
    await CarServices.deleteSingleCarFromDB(carId);

    // sending success response to the client 
    res.status(200).json({
      status: true,
      message: 'Car deleted successfully',
      data: {},
    });
  } catch (err) {
    // sending default err 
    res.status(200).json({
      status: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// exporting all car controllers  
export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  updateSingleCar,
  deleteSingleCar,
};
