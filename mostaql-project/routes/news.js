const express = require('express')
const router = express.Router();
const upload = require('../middelware/upload')
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const { News } = require("../Database-admin/News")

router.post('/add-news', upload.single('avatar'), [
    body('title')
        .trim().isLength({ min: 2, max: 44 }).isString()
        .withMessage('Please enter a valid title.'),
    body('content')
        .trim().isLength({ min: 2, max: 2000 }).isString()
        .withMessage('Please enter a valid content.'),

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
            const news = new News({
                title: req.body.title,
                content: req.body.content,
                avatar: req.file.path.split('\\')[1],



            })

            await news.save();
            res.status(201).json({ message: "add new just news", newsId: news._id })
        }
        catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    })

router.get('/get-news', async (req, res, next) => {
    const news = await News.find();
    if (!news) {
        const err = new Error('not found news');
        next(err);
        return;
    }
    res.status(200).json({ news })
})

router.post('/delete-news/:newsId', async (req, res, next) => {

    const newsId = req.params.newsId;
    const news = await News.findOne({ _id: newsId });
    if (!news) {
        const error = new Error('Could not find News.');
        error.statusCode = 404;
        throw error;
    }
    await news.deleteOne({ _id: newsId })
    res.status(200).json({ message: 'delete fetched news.', news });
})

router.post('/update-news/:newsId', async (req, res, next) => {

    const newsId = req.params.newsId;
    const title = req.body.title;
    const content = req.body.content;

    try {
        const news = await News.findById(newsId);
        if (!news) {
            const error = new Error('Could not find News.');
            error.statusCode = 404;
            throw error;
        }
        news.title = title;
        news.content = content;

        await news.save();


        res.status(201).json({ message: 'News updated!' });
    } catch (e) {
        res.status(201).json({ message: e.message, code: e.statusCode });
    }

})


module.exports = router;
