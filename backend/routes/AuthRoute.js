import express from 'express';
import { 
    registerController ,
    loginController ,testController,
} from '../controllers/AuthController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import {createProduit ,getProduits} from '../controllers/ProduitController.js'
// Router object
const router = express.Router();

// Routes
router.post('/RegisterUser', registerController);

//test routes 
router.get('/test',requireSignIn ,testController);

//login
router.post('/loginUser',loginController);
//ajouter un produit
router.post('/createProduit',createProduit);
//afficher tous les produit 
router.get('/getProduits', getProduits);



export default router;

