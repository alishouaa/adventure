const express = require('express')
const router = express.Router();
const { Product } = require('../Database-admin/Product')
const { OrderPost } = require('../Database-admin/Order-Post')
const upload = require('../middelware/upload')
const uploadArray = require('../middelware/uploadArray')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const auth = require('../middelware/auth')
const mongoose = require('mongoose')
const path = require('path')

router.post('/add-product',
    //auth
    uploadArray.array('avatar', 4),

    [
        body('name')
            .trim().isLength({ min: 3, max: 80 }).isString()
            .withMessage('Please enter a valid name.'),
        body('description')
            .trim().isLength({ min: 3, max: 1024 }).isString()
            .withMessage('Please enter a valid description.'),
        body('price')
            .trim().isLength({ min: 1, max: 8 }).isNumeric()
            .withMessage('Please enter a valid price.'),
        body('parCode')
            .trim().isLength({ min: 2, max: 10 }).isString()
            .withMessage('Please enter a valid parCode.'),
    ], async (req, res, next) => {

        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                const error = new Error('Validation failed.');
                error.statusCode = 422;
                error.data = errors.array();
                throw error;
            }

            let imagesPaths = [];
            for (avatar of req.files) {
                imagesPaths.push(avatar.path.split('\\')[1]);
            }

            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                categorie: req.body.categorie,
                color: req.body.color,
                typeVehicle: req.body.typeVehicle,
                typeVehicleTwo: req.body.typeVehicleTwo,
                parCode: req.body.parCode,
                twoColor: req.body.twoColor,
                avatar: imagesPaths
            })

            await product.save();
            res.status(201).json({ message: "add new just product", productId: product._id })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    })

router.get('/get-product', async (req, res, next) => {
    const product = await Product.find();
    if (!product) {
        const err = new Error('not found product');
        next(err);
        return;
    }
    res.status(200).json({ product })
})


router.get('/get-one-product/:id', async (req, res, next) => {
    const productuser = await Product.findById(req.params.id)
    if (!productuser) {
        const err = new Error('not found product-one');
        next(err);
        return;
    }
    res.status(200).json({ productuser })
})
router.post('/get-categorie-product',
    [
        body('categorie')
            .trim()
    ]
    , async (req, res, next) => {
        const productuser = await Product.find(categorie = req.body)
        if (!productuser) {
            const err = new Error('not found product-one');
            next(err);
            return;
        }
        res.status(200).json({ productuser })
    })
router.post('/delete-product/:productId', async (req, res, next) => {

    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
        const error = new Error('Could not find Post.');
        error.statusCode = 404;
        throw error;
    }
    await product.deleteOne({ _id: productId })
    res.status(200).json({ message: 'delete fetched product.', product });
})

router.post('/post-order',
    // [
    //     body('name')
    //         .trim().isLength({ min: 3, max: 44 }).isString()
    //         .withMessage('Please enter a valid name.'),
    //     body('categorie')
    //         .trim().isLength({ min: 3, max: 44 }).isString()
    //         .withMessage('Please enter a valid categorie.'),

    // ],
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                const error = new Error('Validation failed.');
                error.statusCode = 422;
                error.data = errors.array();
                throw error;
            }
            const order = new OrderPost({
                productId: mongoose.Types.ObjectId(req.body.productId),
                product: req.body.product,
                metadata: req.body.metadata
            })

            await order.save();
            res.status(201).json({ message: "add new just order", orderId: order._id })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    })

router.get('/get-product-order', async (req, res, next) => {
    const order = await OrderPost.find().populate({
        path: "productId", select: {
            name: 1,
            _id: 0,
            categorie :1
        }
    });
    if (!order) {
        const err = new Error('not found order');
        next(err);
        return;
    }
    res.status(200).json({ order })
})

module.exports = router;
