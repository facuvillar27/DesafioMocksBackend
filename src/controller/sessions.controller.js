import jwt from 'jsonwebtoken';
import UserDTO from '../dao/DTO/userDTO.js';
import DAO from '../dao/index.js';

const userService = new DAO.User();
const productService = new DAO.Product();

const createTokenAndUserDTO = (req) => {
    const userDTO = new UserDTO(
        req.user._id,
        `${req.user.first_name} ${req.user.last_name}`,
        req.user.role,
        req.user.email
    );
    const serializedUser = {
        id: userDTO.id,
        name: userDTO.name,
        role: userDTO.role,
        email: userDTO.email
    }
    const token = jwt.sign(serializedUser, 'CoderKeyQueNadieDebeSaber', { expiresIn: "1h" });
    return { token, serializedUser };
}

const getProfile = async (req, res) => {
    let user = await userService.getBy({ "email": req.user.email });
    let product = await productService.getProducts();
    let cartProducts = user.cart.products;
    res.render("current", {
        user,
        product,
        cartProducts,
    })
}

export { createTokenAndUserDTO, getProfile };