import { userModel } from "../models/users.model.js";
import cartModel from "../models/carts.model.js";

class User {
    async getUsers() {
        try {
            const users = await userModel.find().populate('cart');
            return users.map(user => user.toObject())
        } catch (error) {
            console.error('Error getting users:', error)
        }
    }

    async getUserById(id) {
        try {
            const user = await userModel.findById(id).populate('cart');
            return user
        } catch (error) {
            console.error('Error getting user by id:', error)
        }
    }

    async createUser(user) {
        if (!user.cart) {
            const newCart = new cartModel({ products: [] });
            const savedCart = await newCart.save();
            user.cart = savedCart._id;
        }
        let result = await userModel.create(user);
        return result;
    }

    async getBy(params) {
        let result = await userModel.findOne(params).populate({
            path: 'cart',
            populate: { path: 'products.product' } // Pobla los productos dentro del carrito
        }).lean();
        return result;
    }

    async update (id, user) {
        delete user._id;
        let result = await userModel.updateOne({ _id: id}, {$set:user})
        return result;
    }
}

export default User