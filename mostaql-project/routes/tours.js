const express = require('express')
const router = express.Router();
const { Tour } = require('../Database-admin/Tours');
const { TourPost } = require('../Database-admin/Tour-Post')
const upload = require('../middelware/upload')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const auth = require('../middelware/auth')
const mongoose = require('mongoose');
const { DateOff } = require('../Database-admin/Date-off');
const { Add } = require('../Database-admin/Adds');
const nodemailer = require('nodemailer');
const videoUpload = require('../middelware/uploadVideo')

router.post('/add-tour',
    // auth 
    // upload.single('avatar'),
    videoUpload.single('video'),
    [
        body('title')
            .trim().isLength({ min: 5, max: 100 }).isString()
            .withMessage('Please enter a valid title.'),
        body('type')
            .trim().isLength({ min: 3, max: 100 }).isString()
            .withMessage('Please enter a valid type.'),
        body('time')
            .trim().isLength({ min: 3, max: 100 }).isString()
            .withMessage('Please enter a valid time.'),
        body('ifReserve')
            .trim().isLength({ min: 15, max: 2000 }).isString()
            .withMessage('Please enter a valid ifReserve.'),
        body('instruction')
            .trim().isLength({ min: 5, max: 2000 }).isString()
            .withMessage('Please enter a valid instruction.'),
        body('map')
            .trim().isLength({ min: 5, max: 1000 }).isString()
            .withMessage('Please enter a valid map.'),
        body('people')
            .trim().isLength({ min: 1, max: 3 }).isNumeric()
            .withMessage('Please enter a valid people.'),
        body('priceAtv')
            .trim().isLength({ min: 1, max: 5 }).isNumeric()
            .withMessage('Please enter a valid priceAtv.'),
        body('priceUtv')
            .trim().isLength({ min: 1, max: 5 }).isNumeric()
            .withMessage('Please enter a valid priceAtv.'),



    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                const error = new Error('Validation failed.');
                error.statusCode = 422;
                error.data = errors.array();
                throw error;
            }

            const tour = new Tour({
                title: req.body.title,
                // avatar: req.file.path.split('\\')[1],
                video: req.file.path.split('\\')[1],
                time: req.body.time,
                map: req.body.map,
                ifReserve: req.body.ifReserve,
                instruction: req.body.instruction,
                info: req.body.info,
                type: req.body.type,
                people: req.body.people,
                city: req.body.city,
                priceAtv: req.body.priceAtv,
                priceUtv: req.body.priceUtv,

            })

            await tour.save();
            res.status(201).json({ message: "add new just tour", tourId: tour._id })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    })

router.get('/get-tour', async (req, res, next) => {
    const tour = await Tour.find();
    if (!tour) {
        const err = new Error('not found tour');
        next(err);
        return;
    }
    res.status(200).json({ tour })
})

router.get('/get-one-tour/:id', async (req, res, next) => {
    const touruser = await Tour.findById(req.params.id)
    if (!touruser) {
        const err = new Error('not found touruser');
        next(err);
        return;
    }
    res.status(200).json({ touruser })
})

router.post('/get-type-tour', async (req, res, next) => {
    const touruser = await Tour.find(type = req.body)
    if (!touruser) {
        const err = new Error('not found touruser');
        next(err);
        return;
    }
    res.status(200).json({ touruser })
})
router.post('/get-time-tour', async (req, res, next) => {
    const touruser = await Tour.find(time = req.body)
    if (!touruser) {
        const err = new Error('not found touruser');
        next(err);
        return;
    }
    res.status(200).json({ touruser })
})

router.post('/post-tour',
    // auth 
    [
        body('price')
            .trim().isLength({ min: 1, max: 44 }).isString()
            .withMessage('Please enter a valid price.'),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                const error = new Error('Validation failed.');
                error.statusCode = 422;
                error.data = errors.array();
                throw error;
            }
            const tourPost = new TourPost({
                tourId: mongoose.Types.ObjectId(req.body.tourId),
                tour: req.body.tour,
                price: req.body.price,
                metadata : req.body.metadata,
                add: req.body.add

            })

            await tourPost.save();
            res.status(201).json({ message: "add new tourPost tour", tourPostId: tourPost._id })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    })
router.get('/get-tour-post', async (req, res, next) => {
    const tourPost = await TourPost.find().populate({
        path: "tourId", select: {
            title: 1,
            time: 1,
            type: 1,
            _id: 0

        }
    });
    if (!tourPost) {
        const err = new Error('not found tourPost');
        next(err);
        return;
    }
    res.status(200).json({ tourPost })
})

router.post('/delete-tour/:tourId', async (req, res, next) => {

    const tourId = req.params.tourId;
    const tour = await Tour.findOne({ _id: tourId });
    if (!tour) {
        const error = new Error('Could not find Post.');
        error.statusCode = 404;
        throw error;
    }
    await tour.deleteOne({ _id: tourId })
    res.status(200).json({ message: 'delete fetched product.', tour });
})
router.post('/delete-post-tour/:tourId', async (req, res, next) => {

    const tourId = req.params.tourId;
    const tourEmail = req.body.tourEmail
    const tour = await TourPost.findOne({ _id: tourId });
    if (!tour) {
        const error = new Error('Could not find Post.');
        error.statusCode = 404;
        throw error;
    }
    await tour.deleteOne({ _id: tourId })
    res.status(200).json({ message: 'delete fetched product.', tour });


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abou36839@gmail.com',
            pass: 'nuttertools32'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'abou36839@gmail.com',
        to: tourEmail,
        subject: 'رسالة تعطيل الحجز',
        text: 'عذراً أيها الزبون لقد تم تعطيل حجز هذه الرحلة من قبل المشرف إمّا من أجل الصيانة أو من أجل أسباب أُخرى. نرجو منك التواصل معنا لنذكر لك الاسباب و شكرا'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


})
router.post('/delete-one-post-tour/:tourId', async (req, res, next) => {

    const tourId = req.params.tourId;
    const tour = await TourPost.findOne({ _id: tourId });
    if (!tour) {
        const error = new Error('Could not find Post.');
        error.statusCode = 404;
        throw error;
    }
    await tour.deleteOne({ _id: tourId })
    res.status(200).json({ message: 'delete fetched product.', tour });

})

router.post('/date-off', async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const dateOff = new DateOff({
            dateFirst: req.body.dateFirst,
            dateLast: req.body.dateLast

        })

        await dateOff.save();
        res.status(201).json({ message: "add new dateOff", dateOffId: dateOff._id })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
})
router.get('/get-date-off', async (req, res, next) => {
    const dateOff = await DateOff.find()
    if (!dateOff) {
        const err = new Error('not found dateOff');
        next(err);
        return;
    }
    res.status(200).json({ dateOff })
})

router.post('/post-add', async (req, res, next) => {
    const adds = new Add({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,

    })

    await adds.save();
    res.status(201).json({ message: "add new adds", addsId: adds._id })
})

router.post('/delete-add/:addId', async (req, res, next) => {

    const addId = req.params.addId;
    const add = await Add.findOne({ _id: addId });
    if (!add) {
        const error = new Error('Could not find Post.');
        error.statusCode = 404;
        throw error;
    }
    await add.deleteOne({ _id: addId })
    res.status(200).json({ message: 'delete fetched product.', add });
})

router.get('/get-add-tour', async (req, res, next) => {
    const add = await Add.find()
    if (!add) {
        const err = new Error('not found add');
        next(err);
        return;
    }
    res.status(200).json({ add })
})
router.post('/get-type-add',
    [
        body('type')
            .trim()
    ]
    , async (req, res, next) => {
        const add = await Add.find(type = req.body)
        if (!add) {
            const err = new Error('not found add-one');
            next(err);
            return;
        }
        res.status(200).json({ add })
    })



module.exports = router;
