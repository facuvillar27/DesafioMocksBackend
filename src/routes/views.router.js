// import Users from '../dao/dbManagers/users.js';
// import Carts from '../dao/dbManagers/carts.js';
// import Product from '../dao/dbManagers/products.js';
import {Router} from 'express';
import { passportCall } from '../utils.js';
import { getUsersAndRender, getProductsAndRender, getProfile, getCart, getMockingProducts} from '../controller/views.controller.js';


// const usersManager = new Users();
// const cartsManager = new Carts();
// const productsManager = new Product();

const router = Router();

router.get('/', async (req,res)=>{
    res.render('login');
})

router.get('/signup', async (req,res)=>{
    res.render('signup');
})

router.get('/users', getUsersAndRender);

router.get('/products', getProductsAndRender);

router.get('/perfil', passportCall("jwt"), getProfile);

router.get('/cart', passportCall("jwt"), getCart)

router.get('/mockingproduct', getMockingProducts);
  

export default router;