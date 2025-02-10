import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router()

router.post('/auth/login', AuthController.LoginUser)

export const AuthRoutes = router;