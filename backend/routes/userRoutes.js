import express from 'express';
const router = express.Router();
import { changeUserPassword, userForgotPassword, userLogin, userPasswordReset, userProfile, userRegistration } from '../controllers/userController.js';
import { checkUserAuth } from '../middlewares/auth-middleware.js';

//Router level middleWare
router.use('/change-password',checkUserAuth)
router.use('/profile',checkUserAuth)


//public routes
router.post('/register',userRegistration);
router.post('/login',userLogin);
router.post('/forgot-password',userForgotPassword);
router.post('/reset-password/:id/:token',userPasswordReset)

//protected routes
router.post('/change-password',changeUserPassword);
router.get('/profile',userProfile)

export default router;