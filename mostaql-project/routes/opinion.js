const express = require('express')
const router = express.Router();
const { OpinionUser } = require('../Database-admin/Opinion')
const upload = require('../middelware/upload')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

router.post('/add-opinion', [
    body('username')
        .trim().isLength({ min: 3, max: 44 }).isString()
        .withMessage('Please enter a valid name.'),
    body('city')
        .trim().isLength({ min: 3, max: 44 }).isString()
        .withMessage('Please enter a valid city.'),
    body('text')
        .trim().isLength({ min: 3, max: 3000 }).isString()
        .withMessage('Please enter a valid text.'),
        body('evaluate')
        .trim().isLength({ min: 1, max: 8 }).isNumeric()
        .withMessage('Please enter a valid evaluate.'),
], async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const opinion = new OpinionUser({
            username: req.body.username,
            city: req.body.city,
            text: req.body.text,
            evaluate : req.body.evaluate
        })

        await opinion.save();
        res.status(201).json({ message: "add new just opinion", opinionId: opinion._id })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
})

router.get('/get-opinion', async (req, res, next) => {
    const opinion = await OpinionUser.find();
    if (!opinion) {
        const err = new Error('not found opinion');
        next(err);
        return;
    }
    res.status(200).json({ opinion })
})

router.post('/delete-opinion/:opinionId', async (req, res, next) => {

    const opinionId = req.params.opinionId;
    const opinion = await OpinionUser.findOne({ _id: opinionId });
    if (!opinion) {
        const error = new Error('Could not find opinion.');
        error.statusCode = 404;
        throw error;
    }
    await opinion.deleteOne({ _id: opinionId })
    res.status(200).json({ message: 'delete fetched opinion.', opinion });
})


module.exports = router;
