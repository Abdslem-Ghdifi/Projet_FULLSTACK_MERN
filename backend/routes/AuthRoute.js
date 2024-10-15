import express from 'express';
import { 
    registerController ,
    loginController ,
} from '../controllers/AuthController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import {createProduit ,getProduits} from '../controllers/ProduitController.js'
import {updateUser} from '../controllers/UpdateUser.js'
// Router object
const router = express.Router();

// Routes
router.post('/RegisterUser', registerController);

//test routes 
router.get('/test',requireSignIn );

//login
router.post('/loginUser',loginController);
//ajouter un produit
router.post('/createProduit',createProduit);
//afficher tous les produit 
router.get('/getProduits', getProduits);
//modifer user
router.put('/updateUser',updateUser)



export default router;

