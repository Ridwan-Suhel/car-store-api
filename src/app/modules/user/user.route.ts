import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// calling controller function here with route
router.post('/auth/register', UserController.createUser);
router.get('/auth/users', UserController.getAllUsers);

export const UserRoutes = router;