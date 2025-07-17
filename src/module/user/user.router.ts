import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';


const UserRoutes = Router();

UserRoutes.get('/user', auth(['admin']), userController.getAllUsers);
UserRoutes.get('/user/:id', auth(['admin', 'agent', 'customer']), userController.getSingleUser);
UserRoutes.patch('/user/:id', auth(['admin']), validateRequest(userValidation.updateUserSchema), userController.updateUser);
UserRoutes.delete('/user/:id', auth(['admin']), userController.deleteUser);
UserRoutes.patch('/update-location', auth(['agent']), userController.updateLocation);

export default UserRoutes;
