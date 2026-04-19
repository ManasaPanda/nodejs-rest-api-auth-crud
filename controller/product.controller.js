const Product = require('../models/product.model');
const Op = require('sequelize').Op;
const { STATUS, MESSAGE, sendresponse } = require('../utils/response');
const { createError } = require('../utils/error');

const getAllProducts = async (req, res, next) => {
    try {
        const { isadmin } = req.body;
        const search = req.query.search?.toLowerCase();
        const userid = req.user.id;

        let condition = {};

        if (!isadmin) {
            condition.userId = userid
        }

        if (search) {
            condition.name =
            {
                [Op.like]: `%${search}%`
            };
        }
        const products = await Product.findAll({
            where: condition
        });

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.PRODUCT_FETCH_SUCCESSFULLY, products);

    } catch (error) {
        next(error);
    }
};

const createProducts = async (req, res, next) => {
    try {
        const { productId, name, description, price } = req.body;
        const userid = req.user.id;
        if (!productId || !name || !price) {
            return sendresponse(res, STATUS.NOT_FOUND, MESSAGE.REQUIRED_FIELDS);
        }

        const lowername = name.toLowerCase();

        const isproductexist = await Product.findOne({
            where: {
                [Op.or]: [
                    { productId: productId },
                    { name: lowername }
                ]
            }
        });

        if (isproductexist) {
            return sendresponse(res, STATUS.CONFLICT, MESSAGE.PRODUCT_EXISTS)
        }

        const product = await Product.create({
            productId: productId,
            name: lowername,
            description,
            price,
            userId: userid
        });

        return sendresponse(res, STATUS.CREATED, MESSAGE.PRODUCT_CREATED, product);
    } catch (error) {
        next(error)
    }
};


const updateProducts = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const userid = req.user.id;
        if (!id) {
            return sendresponse(res, STATUS.NOT_FOUND, MESSAGE.NO_ID);
        }
        const product = await Product.findOne({
            where: { productId: id }
        });

        if (!product) {
            return sendresponse(res, STATUS.NOT_FOUND, MESSAGE.PRODUCT_NOT_FOUND);
        };

        if (userid !== product.userId) {
            return sendresponse(res, STATUS.FORBIDDEN, MESSAGE.NOT_AUTHORIZED);
        };

        await product.update({ name, description, price });

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.PRODUCT_UPDATED, product);
    } catch (error) {
        next(error);
    }
};

const deleteProducts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userid = req.user.id;
        if (!id) {
            return sendresponse(res, STATUS.NOT_FOUND, MESSAGE.NO_ID);
        }
        const product = await Product.findOne({
            where: { productId: id }
        });

        if (!product) {
            return sendresponse(res, STATUS.NOT_FOUND, MESSAGE.PRODUCT_NOT_FOUND);
        };

        if (userid !== product.userId) {
            return sendresponse(res, STATUS.FORBIDDEN, MESSAGE.NOT_AUTHORIZED);
        };

        await product.destroy();

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.PRODUCT_DELETED);

    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllProducts,
    createProducts,
    updateProducts,
    deleteProducts
};
