const Product = require('../models/product');
const User = require('../models/user');
const Shop = require('../models/shop');

const findProduct = async(productId)=>{
    try{
       const product = await Product.findById(productId);
       return{
           ...product._doc
       }
    }catch(error){
        throw error;
    }
};
const shopProducts = async(products) => {
    try {
        console.log(products);
        return products.map(product=> {
            return{
                _id: product._id,
                productId: product.productId,
                price: product.productId,
                product: findProduct.bind(this, product.productId)
            }
        });

    } catch (error) {
        throw error;
    }
}
const user = async(userId) =>{
    try {
        const user = await User.findById(userId);
        return{
            ...user._doc,
            password: null
        }
    } catch (error) {
        throw error;
    }
};

const shop = async(shopId) => {
    const shop = await Shop.findById(shopId);
    return{
        ...shop._doc
    }
}

exports.product = findProduct;
exports.user = user;
exports.shop = shop;
exports.products = shopProducts;