import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateRequest(AuthValidation.registerValidationSchema),
  authController.register
);

authRouter.post(
  '/auth/login',
  validateRequest(AuthValidation.loginValidationSchema),
  authController.login
);

export default authRouter;
